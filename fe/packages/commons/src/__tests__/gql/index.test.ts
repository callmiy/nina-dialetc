import {
  makeApolloServerAndClient,
  testDbConnection,
  germanyData,
  franceData,
  createCountriesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
  createCurrenciesInsertSql,
  currencyEuroData,
  insertEuroValueSql,
} from "@ta/cm/src/__tests__/utils";
import { Connection } from "@ta/cm/src/types/db";
import { cleanUpDbAfterTest, resetDbForTest } from "..//utils";
import { listCountriesAndCurrenciesQuery } from "@ta/cm/src/gql/queries";
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

    const { ulid: deUlid, name: deName } = germanyData;

    const { ulid: frUlid, name: frName } = franceData;

    const dataF1R1 = result.data?.listCountries;
    const edgeF1R1 = dataF1R1?.edges[0];
    const nodeF1R1 = edgeF1R1?.node;
    const pageInfoF1R1 = dataF1R1?.pageInfo;

    expect(pageInfoF1R1).toMatchObject({
      hasPreviousPage: false,
      hasNextPage: true,
    });

    expect(nodeF1R1).toMatchObject({
      id: frUlid,
      countryName: frName,
    });

    const frCursor = edgeF1R1?.cursor;

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
    const edgeF2R1 = dataF2R1?.edges[0];
    const nodeF2R1 = edgeF2R1?.node;
    const pageInfoF2R1 = dataF2R1?.pageInfo;

    expect(pageInfoF2R1).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: false,
    });

    expect(nodeF2R1).toMatchObject({
      id: deUlid,
      countryName: deName,
    });

    const deCursor = edgeF2R1?.cursor;

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

    expect(resultF3R1.data).toEqual({
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
          before: deCursor,
        },
      },
    });

    const dataB1R1 = resultB1R1.data?.listCountries;
    const edgeB1R1 = dataB1R1?.edges[0];
    const nodeB1R1 = edgeB1R1?.node;
    const pageInfoB1R1 = dataB1R1?.pageInfo;

    expect(pageInfoB1R1).toMatchObject({
      hasPreviousPage: false,
      hasNextPage: true,
    });

    expect(nodeB1R1).toMatchObject({
      id: frUlid,
      countryName: frName,
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
          before: frCursor,
        },
      },
    });

    expect(resultB2R1.data).toEqual({
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

    // forward 1 R1=2 //////////////////////////////////////////////////

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
    const edgeF1R2 = dataF1R2?.edges[0];
    const nodeF1R2 = edgeF1R2?.node;
    const pageInfoF1R2 = dataF1R2?.pageInfo;

    expect(pageInfoF1R2).toMatchObject({
      hasPreviousPage: true,
      hasNextPage: false,
    });

    expect(nodeF1R2).toMatchObject({
      id: deUlid,
      countryName: deName,
    });

    // backwards 1 R1=2 //////////////////////////////////////////////////

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
