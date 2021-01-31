import {
  relayConnectionFromList,
  relayConnectionFromDataGetter,
  offsetToCursor,
  LAST_WITHOUT_BEFORE_ERROR,
  FIRST_LAST_UNDEFINED_ERROR,
} from "../pagination";

describe("pagination tests", () => {
  const cursor0 = offsetToCursor(0);
  const cursor1 = offsetToCursor(1);
  const cursor2 = offsetToCursor(2);

  describe("list data", () => {
    const data = [1, 2, 3];

    it(`throws when no cursor`, () => {
      expect(() => {
        relayConnectionFromList(data, {});
      }).toThrow(FIRST_LAST_UNDEFINED_ERROR);
    });

    it(`paginate forward
      empty data`, () => {
      const result = relayConnectionFromList([], {
        first: 1,
      });

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

    it(`invalid cursor throws error
          negative numRecords`, () => {
      const result = relayConnectionFromList(
        data,
        {
          last: 1,
          before: 5 as any,
        },
        {
          numRecords: -5,
        }
      );

      expect(result).toEqual({
        pageInfo: {
          startCursor: cursor0,
          endCursor: cursor0,
          hasPreviousPage: false,
          hasNextPage: false,
        },
        edges: [
          {
            node: 1,
            cursor: cursor0,
          },
        ],
      });
    });

    it(`invalid cursor makes offset NAN does not fetch`, () => {
      const result = relayConnectionFromList(data, {
        last: 1,
        before: "a",
      });

      expect(result).toEqual({
        pageInfo: {
          startCursor: null,
          endCursor: null,
          hasPreviousPage: false,
          hasNextPage: true,
        },
        edges: [],
      });
    });

    it(`invalid cursor makes offset NAN but fetches`, () => {
      const result = relayConnectionFromList(data, {
        first: 1,
        after: "a",
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
      after undefined cursor
    `, () => {
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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
      expect(() => {
        relayConnectionFromList(data, { last: 1 });
      }).toThrow(LAST_WITHOUT_BEFORE_ERROR);
    });

    it(`last = 1
      before 2th cursor
    `, () => {
      const result = relayConnectionFromList(data, {
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
      const result = relayConnectionFromList(data, {
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

    it(`last = 1
      before 0th cursor
    `, () => {
      const result = relayConnectionFromList(data, {
        last: 1,
        before: cursor0,
      });

      expect(result).toEqual({
        pageInfo: {
          startCursor: null,
          endCursor: null,
          hasPreviousPage: false,
          hasNextPage: true,
        },
        edges: [],
      });
    });

    it(`last = 2
      before 2th cursor
    `, () => {
      const result = relayConnectionFromList(data, {
        last: 2,
        before: cursor2,
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

    it(`last = 2
      before 1th cursor
    `, () => {
      const result = relayConnectionFromList(data, {
        last: 2,
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

    it(`last = 2
      before 0th cursor
    `, () => {
      const result = relayConnectionFromList(data, {
        last: 2,
        before: cursor0,
      });

      expect(result).toEqual({
        pageInfo: {
          startCursor: null,
          endCursor: null,
          hasPreviousPage: false,
          hasNextPage: true,
        },
        edges: [],
      });
    });
  });

  describe("data function with extra pageInfo options", () => {
    const data = [
      [
        2,
        {
          node: "2a",
          a: 2,
        },
      ],
      [
        3,
        {
          a: 3,
          cursor: "3",
        },
      ],
      [4, {}],
    ];

    it(`hasNextPage and no maximum`, async () => {
      const result = await relayConnectionFromDataGetter(() => data, {
        first: 2,
        after: cursor0,
      });

      expect(result).toEqual({
        pageInfo: {
          startCursor: cursor1,
          endCursor: cursor2,
          hasPreviousPage: true,
          hasNextPage: true,
        },
        edges: [
          {
            node: 2,
            cursor: cursor1,
            a: 2,
          },
          {
            node: 3,
            cursor: cursor2,
            a: 3,
          },
        ],
      });
    });

    it(`has no next page because maximum specified`, async () => {
      const result = await relayConnectionFromDataGetter(
        () => data,
        {
          first: 2,
          after: cursor0,
        },
        {
          max: 15,
        }
      );

      const cursor3 = offsetToCursor(3);

      expect(result).toEqual({
        pageInfo: {
          startCursor: cursor1,
          endCursor: cursor3,
          hasPreviousPage: true,
          hasNextPage: false,
        },
        edges: [
          {
            node: 2,
            cursor: cursor1,
            a: 2,
          },
          {
            node: 3,
            cursor: cursor2,
            a: 3,
          },
          {
            node: 4,
            cursor: cursor3,
          },
        ],
      });
    });
  });
});
