import {
  makeApolloServerAndClient,
  testDbConnection,
  germanyData,
  franceData,
  createCountriesInsertSql,
  createPostCodesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
  insertGermanPostCodeValueSql,
  insertFrancePostCodeValueSql,
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
    const sql = ` ${createCountriesInsertSql}
    ${insertGermanyValueSql}
    ,${insertFranceValueSql};

    ${createPostCodesInsertSql}
    ${insertGermanPostCodeValueSql}
    ,${insertFrancePostCodeValueSql}; `;

    conn.none(sql);

    const { query, server } = makeApolloServerAndClient({ db: conn });
    const { data } = await query({
      query: listCountriesAndCurrenciesQuery,
    });

    const {
      uuidCompressed: deUuid,
      postCodeUlid: dePostCodeUlid,
      ulid: deUlid,
      name: deName,
    } = germanyData;

    const {
      uuidCompressed: frUuid,
      postCodeUlid: frPostCodeUlid,
      ulid: frUlid,
      name: frName,
    } = franceData;

    expect(data).toEqual({
      listCountries: [
        {
          id: deUlid,
          country_name: deName,
          post_codes: [
            {
              id: dePostCodeUlid,
              post_code: "09126",
              city: "Chemnitz",
              state: "Saxony",
              country_id: deUlid,
            },
          ],
        },
        {
          id: frUlid,
          country_name: frName,
          post_codes: [
            {
              id: frPostCodeUlid,
              post_code: "1234 abc",
              city: "Paris",
              state: "Paris",
              country_id: frUlid,
            },
          ],
        },
      ],
      listCurrencies: [],
    });
  });
});
