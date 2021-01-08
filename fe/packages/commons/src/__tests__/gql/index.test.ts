import {
  makeApolloServerAndClient,
  testDbConnection,
  germanyData,
  franceData,
  hollandData,
  createCountriesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
  insertHollandValueSql,
  createCurrenciesInsertSql,
  currencyEuroData,
  insertEuroValueSql,
} from "@ta/cm/src/__tests__/utils";
import { Connection } from "@ta/cm/src/types/db";
import { cleanUpDbAfterTest, resetDbForTest } from "../utils";
import { listCountriesAndCurrenciesQuery } from "@ta/cm/src/gql/queries/countries-currencies.query";
import {
  ListCountriesAndCurrenciesVariables,
  ListCountriesAndCurrencies,
} from "@ta/cm/src/gql/ops-types";

let conn: Connection;

beforeEach(async () => {
  const result = await testDbConnection();
  conn = result.conn;
  await resetDbForTest(conn);
});

afterEach(async () => {
  await cleanUpDbAfterTest(conn);
});

describe("", () => {
  it("list countries with pagination", async () => {
    const sql = `
      ${createCountriesInsertSql}
      ${insertGermanyValueSql}
      ,${insertFranceValueSql}
      ,${insertHollandValueSql}
      ;

      ${createCurrenciesInsertSql}
      ${insertEuroValueSql}
      ;
    `;

    conn.none(sql);

    const currencyFromDb = [
      {
        id: currencyEuroData.ulid,
        currencyName: currencyEuroData.name,
        currencyCode: currencyEuroData.code,
      },
    ];

    const { ulid: deUlid, name: deName, code: deCode } = germanyData;

    const { ulid: frUlid, name: frName, code: frCode } = franceData;

    const { ulid: hUlid, name: hName, code: hCode } = hollandData;

    const { query } = makeApolloServerAndClient({ db: conn });

    const result = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 1,
        },
      },
    });

    // R1 = 1 result, R2 = 2 results
    // F1 = forward 1, B1 = backwards 1

    const dataF1R1 = result.data?.listCountries;
    const pageInfoF1R1 = dataF1R1?.pageInfo;
    const frCursor = (dataF1R1?.edges as any)[0].cursor;

    expect(pageInfoF1R1).toMatchObject({
      hasPreviousPage: false,
      hasNextPage: true,
    });

    expect(dataF1R1?.edges).toEqual([
      {
        cursor: frCursor,
        node: {
          id: frUlid,
          countryName: frName,
          countryCode: frCode,
        },
      },
    ]);

    const resultF2R1 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 1,
          after: frCursor,
        },
      },
    });

    const dataF2R1 = resultF2R1.data?.listCountries;
    const pageInfoF2R1 = dataF2R1?.pageInfo;
    const deCursor = (dataF2R1?.edges as any)[0].cursor;

    expect(pageInfoF2R1).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: true,
    });

    expect(dataF2R1?.edges).toEqual([
      {
        cursor: deCursor,
        node: {
          id: deUlid,
          countryName: deName,
          countryCode: deCode,
        },
      },
    ]);

    // forward 3 R1 ///////////////////////////////////////////////////

    const resultF3R1 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 1,
          after: deCursor,
        },
      },
    });

    const dataF3R1 = resultF3R1.data?.listCountries;
    const pageInfoF3R1 = dataF3R1?.pageInfo;
    const hCursor = (dataF3R1?.edges as any)[0].cursor;

    expect(pageInfoF3R1).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: false,
    });

    expect(dataF3R1?.edges).toEqual([
      {
        cursor: hCursor,
        node: {
          id: hUlid,
          countryName: hName,
          countryCode: hCode,
        },
      },
    ]);

    // forward 4 R1 ///////////////////////////////////////////////////

    const resultF4R1 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 1,
          after: hCursor,
        },
      },
    });

    expect(resultF4R1.data).toEqual({
      listCountries: {
        edges: [],
        pageInfo: {
          hasPreviousPage: true,
          hasNextPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
      listCurrencies: currencyFromDb,
    });

    // backwards 1 R1 //////////////////////////////////////////////////

    const resultB1R1 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          last: 1,
          before: frCursor,
        },
      },
    });

    expect(resultB1R1.data).toEqual({
      listCountries: {
        edges: [],
        pageInfo: {
          hasNextPage: true, // germanyData
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
      listCurrencies: currencyFromDb,
    });

    // backwards 2 R1 //////////////////////////////////////////////////

    const resultB2R1 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          last: 1,
          before: deCursor,
        },
      },
    });

    const dataB2R1 = resultB2R1.data?.listCountries;
    const edgesB2R1 = dataB2R1?.edges;
    const pageInfoB2R1 = dataB2R1?.pageInfo;

    expect(pageInfoB2R1).toMatchObject({
      hasPreviousPage: false,
      hasNextPage: true,
    });

    expect(edgesB2R1).toMatchObject([
      {
        cursor: frCursor,
        node: {
          id: frUlid,
          countryName: frName,
        },
      },
    ]);

    // forward 1 R2 //////////////////////////////////////////////////

    const resultF1R2 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 2,
          after: frCursor,
        },
      },
    });

    const dataF1R2 = resultF1R2.data?.listCountries;
    const edgesF1R2 = dataF1R2?.edges;
    const pageInfoF1R2 = dataF1R2?.pageInfo;

    expect(pageInfoF1R2).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: false,
    });

    expect(edgesF1R2).toMatchObject([
      {
        cursor: deCursor,
        node: {
          id: deUlid,
          countryName: deName,
        },
      },
      {
        cursor: hCursor,
        node: {
          id: hUlid,
          countryName: hName,
        },
      },
    ]);

    // forward 2 R2 //////////////////////////////////////////////////

    const resultF2R2 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 2,
          after: deCursor,
        },
      },
    });

    const dataF2R2 = resultF2R2.data?.listCountries;
    const edgesF2R2 = dataF2R2?.edges;
    const pageInfoF2R2 = dataF2R2?.pageInfo;

    expect(pageInfoF2R2).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: false,
    });

    expect(edgesF2R2).toMatchObject([
      {
        cursor: hCursor,
        node: {
          id: hUlid,
          countryName: hName,
        },
      },
    ]);

    // backwards 1 R2 //////////////////////////////////////////////////

    const resultB1R2 = await query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          last: 2,
          before: deCursor,
        },
      },
    });

    const dataB1R2 = resultB1R2.data?.listCountries;
    const edgeB1R2 = dataB1R2?.edges[0];
    const nodeB1R2 = edgeB1R2?.node;
    const pageInfoB1R2 = dataB1R2?.pageInfo;

    expect(pageInfoB1R2).toMatchObject({
      hasPreviousPage: false,
      hasNextPage: true,
    });

    expect(nodeB1R2).toMatchObject({
      id: frUlid,
      countryName: frName,
    });
  });
});
