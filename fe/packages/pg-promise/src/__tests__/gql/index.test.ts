import {
  makeApolloServerAndClient,
  testDbConnection,
  germanyData,
  franceData,
  createCountriesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
} from "@ta/cm/src/__tests__/utils";
import { Connection } from "@ta/cm/src/types/db";
import { cleanUpDbAfterTest, resetDbForTest } from "../../api/utils";
import { listCountriesAndCurrenciesQuery } from "@ta/cm/src/gql/queries";
import { listCountries } from "@ta/cm/src/db";

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
  it("lists countries and their post codes", async () => {
    const sql = `
      ${createCountriesInsertSql}
      ${insertGermanyValueSql}
      ,${insertFranceValueSql}
      ;
    `;

    conn.none(sql);

    const { query, server } = makeApolloServerAndClient({ db: conn });
    const { data } = await query({
      query: listCountriesAndCurrenciesQuery,
    });

    const { uuidCompressed: deUuid, ulid: deUlid, name: deName } = germanyData;

    const { uuidCompressed: frUuid, ulid: frUlid, name: frName } = franceData;

    expect(data).toEqual({
      listCountries: [
        {
          id: deUlid,
          country_name: deName,
        },
        {
          id: frUlid,
          country_name: frName,
        },
      ],
      listCurrencies: [],
    });
  });
});