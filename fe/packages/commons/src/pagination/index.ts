import { PaginationInput } from "../gql/schema-types";

const maxFn = Math.max;

export const LAST_WITHOUT_BEFORE_ERROR =
  "You must supply a `numRecords` (total number of records) option if using `last` without `before`";

export const FIRST_LAST_UNDEFINED_ERROR =
  "You must either supply 'first' or 'last'";

/**
 * `dataOrFn`: If function is provided, the limit given as arg to the function
 * will be one more than the limit requested. Thus if data returned is more
 * than the i=limit requested (by 1) we know there is more data to fetch
 */

export async function relayConnectionFromDataGetter<T>(
  dataGetterFn: (args: DataFnArgs) => T[] | Promise<T[]>,
  paginationArgs: PaginationInput,
  opts: PaginationOpts = {}
) {
  const [offset, limit] = getOffsetAndLimit(paginationArgs, opts);

  const limitPlusOne = limit + 1;

  const data = await dataGetterFn({
    offset,
    limit: limitPlusOne,
  });

  const slicedData = data.slice(0, limit);
  const count = data.length;
  const hasNextPage = count > limit;

  const [edges, first, last] = buildCursors(slicedData, offset);

  const pageInfo = {
    startCursor: first,
    endCursor: last,
    hasPreviousPage: offset > 0,
    hasNextPage,
  };

  return {
    pageInfo,
    edges,
  };
}

export function relayConnectionFromList<T>(
  data: T[],
  paginationArgs: PaginationInput,
  opts: PaginationOpts = {}
) {
  const [offset, limit] = getOffsetAndLimit(paginationArgs, opts);

  const slicedData = data.slice(offset, limit + offset);
  const count = opts.numRecords || data.length;
  const hasNextPage = count > offset + limit;

  const [edges, first, last] = buildCursors(slicedData, offset);

  const pageInfo = {
    startCursor: first,
    endCursor: last,
    hasPreviousPage: offset > 0,
    hasNextPage,
  };

  return {
    pageInfo,
    edges,
  };
}

export function getOffsetAndLimit(
  paginationArgs: PaginationInput,
  opts?: PaginationOpts
) {
  const { max, numRecords } =
    opts ||
    // istanbul ignore next:
    {};
  let offset = getOffset(paginationArgs);
  const [limit, direction] = getLimitAndDirection(paginationArgs, max);

  switch (direction) {
    case "f":
      // If we are paginating forward and user does not specify a pagination
      // cursor, we start offset at `0`
      return [offset || 0, limit];

    case "b": {
      if (offset === null && numRecords !== undefined) {
        offset = maxFn(numRecords - limit, 0);
        return [offset, limit];
      }

      if (offset !== null) {
        const startOffset = maxFn(offset - limit, 0);
        const newLimit = startOffset === 0 ? offset : limit;
        return [startOffset, newLimit];
      }

      // If we are paginating backwards user must specify total number of
      // records so we can compute the offset as above.
      throw new Error(LAST_WITHOUT_BEFORE_ERROR);
    }
  }
}

class CursorToOffsetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CursorToOffsetError";
  }
}

/*
 * User does not need to provide a before or after pagination cursors. For
 * instance, if this if the first time user tries to fetch, then there is
 * no cursor for pagination.
 *
 * In this case, we return `null` for the offset
 */
export function getOffset({ before, after }: PaginationInput) {
  try {
    if (before) {
      const offset = cursorToOffset(before);
      return isNaN(offset) ? 0 : maxFn(offset, 0);
    } else if (after) {
      const offset = cursorToOffset(after);
      return isNaN(offset) ? 0 : offset + 1;
    }
  } catch (error) {
    // istanbul ignore next:
    if (!(error instanceof CursorToOffsetError)) {
      throw error;
    }
  }

  return null;
}

export function getLimitAndDirection(
  { first, last }: PaginationInput,
  max?: number
): [number, "f" | "b"] {
  let limit = 0;
  let direction: "f" | "b" = "" as "f" | "b";

  if (first) {
    limit = first;
    direction = "f";
  } else if (last) {
    limit = last;
    direction = "b";
  } else {
    throw new Error(FIRST_LAST_UNDEFINED_ERROR);
  }

  // if limit is more than max, we want to return only the maximum entries
  // specified
  if (max) {
    limit = maxFn(limit, max);
  }

  return [limit, direction];
}

const CURSOR_PREFIX = "@ta/cm-array-connection";

export function offsetToCursor(offset: number | string) {
  const secret = `${CURSOR_PREFIX}:${offset}`;
  return Buffer.from(secret).toString("base64");
}

export function cursorToOffset(cursor: string) {
  try {
    const [, val] = Buffer.from(cursor, "base64").toString("utf8").split(":");
    const offset = +val;
    return offset;
  } catch (error) {
    throw new CursorToOffsetError(
      "Invalid cursor provided as 'before' or 'after' pagination argument"
    );
  }
}

function buildCursors<T, Opts = Any>(
  items: [T, Opts][],
  offset: number
): [EdgeWithOpts<T, Opts>[], string | null, string | null];
function buildCursors<T>(
  items: T[],
  offset: number
): [Edge<T>[], string | null, string | null];
function buildCursors(
  items: any[],
  offset: number
): [any, string | null, string | null] {
  const len = items.length;

  if (!len) {
    return [[], null, null];
  }

  const firstCursor = offsetToCursor(offset);

  const item = items[0];

  const edge = Array.isArray(item)
    ? buildEdge(item[0], firstCursor, item[1])
    : buildEdge(item, firstCursor);

  const edges = [edge];

  let i = 1;
  let nextCursor: string | null = null;

  for (; i < len; i++) {
    nextCursor = offsetToCursor(++offset);
    const item = items[i];

    const edge = Array.isArray(item)
      ? buildEdge(item[0], nextCursor, item[1])
      : buildEdge(item, nextCursor);

    edges.push(edge);
  }

  return [edges, firstCursor, nextCursor || firstCursor];
}

function buildEdge<T, Opts = Any>(
  item: T,
  cursor: string,
  opts?: Opts
): Edge<T> | EdgeWithOpts<T, Opts> {
  let connection = {
    node: item,
    cursor,
  };

  if (opts) {
    connection = {
      ...opts,
      node: item,
      cursor,
    };
  }

  return connection;
}

type PaginationOpts = {
  max?: number;
  numRecords?: number;
};

type DataFnArgs = {
  offset: number;
  limit: number;
};

type Edge<T> = {
  node: T;
  cursor: string;
};

type EdgeWithOpts<T, Opts = Any> = Opts & Edge<T>;

type Any = Record<string, unknown>;
