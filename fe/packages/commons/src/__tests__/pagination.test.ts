import {
  generateRelayConnection,
  LAST_WITHOUT_BEFORE_ERROR,
  offsetToCursor,
} from "../pagination";

describe("pagination tests", () => {
  it(`paginate forward
      empty data`, () => {
    const dataFn = () => {
      return [];
    };

    const result = generateRelayConnection(dataFn, { first: 1 });

    expect(result).toEqual({
      pageInfo: {
        startCursor: null,
        endCursor: null,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      edges: [],
    });
  });

  const data = [1, 2, 3];
  const cursor0 = offsetToCursor(0);
  const cursor1 = offsetToCursor(1);
  const cursor2 = offsetToCursor(2);

  it(`first = 1
      after undefined cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 1,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor0,
        endCursor: cursor0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
      edges: [
        {
          node: 1,
          cursor: cursor0,
        },
      ],
    });
  });

  it(`first = 1
      after 0th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 1,
      after: cursor0,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor1,
        endCursor: cursor1,
        hasPreviousPage: true,
        hasNextPage: true,
      },
      edges: [
        {
          node: 2,
          cursor: cursor1,
        },
      ],
    });
  });

  it(`first = 1
      after 1th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 1,
      after: cursor1,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor2,
        endCursor: cursor2,
        hasPreviousPage: true,
        hasNextPage: false,
      },
      edges: [
        {
          node: 3,
          cursor: cursor2,
        },
      ],
    });
  });

  it(`first = 2
      after undefined cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 2,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor0,
        endCursor: cursor1,
        hasPreviousPage: false,
        hasNextPage: true,
      },
      edges: [
        {
          node: 1,
          cursor: cursor0,
        },
        {
          node: 2,
          cursor: cursor1,
        },
      ],
    });
  });

  it(`first = 2
      after 0th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 2,
      after: cursor0,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor1,
        endCursor: cursor2,
        hasPreviousPage: true,
        hasNextPage: false,
      },
      edges: [
        {
          node: 2,
          cursor: cursor1,
        },
        {
          node: 3,
          cursor: cursor2,
        },
      ],
    });
  });

  it(`first = 3
      after undefined cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 3,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor0,
        endCursor: cursor2,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      edges: [
        {
          node: 1,
          cursor: cursor0,
        },
        {
          node: 2,
          cursor: cursor1,
        },
        {
          node: 3,
          cursor: cursor2,
        },
      ],
    });
  });

  it(`first = 3
      after 0th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 3,
      after: cursor0,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor1,
        endCursor: cursor2,
        hasPreviousPage: true,
        hasNextPage: false,
      },
      edges: [
        {
          node: 2,
          cursor: cursor1,
        },
        {
          node: 3,
          cursor: cursor2,
        },
      ],
    });
  });

  it(`first = 3
      after 1th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      first: 3,
      after: cursor1,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor2,
        endCursor: cursor2,
        hasPreviousPage: true,
        hasNextPage: false,
      },
      edges: [
        {
          node: 3,
          cursor: cursor2,
        },
      ],
    });
  });

  it(`last = n
      before undefined cursor should throw
    `, () => {
    const dataFn = () => {
      return [];
    };

    expect(() => {
      generateRelayConnection(data, { last: 1 });
    }).toThrow(LAST_WITHOUT_BEFORE_ERROR);
  });

  it(`last = 1
      before 2th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      last: 1,
      before: cursor2,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor1,
        endCursor: cursor1,
        hasPreviousPage: true,
        hasNextPage: true,
      },
      edges: [
        {
          node: 2,
          cursor: cursor1,
        },
      ],
    });
  });

  it(`last = 1
      before 1th cursor
    `, () => {
    const result = generateRelayConnection(data, {
      last: 1,
      before: cursor1,
    });

    expect(result).toEqual({
      pageInfo: {
        startCursor: cursor0,
        endCursor: cursor0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
      edges: [
        {
          node: 1,
          cursor: cursor0,
        },
      ],
    });
  });
});
