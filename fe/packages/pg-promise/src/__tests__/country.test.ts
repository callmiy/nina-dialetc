import { listCountries } from "../api/country";
import { Connection } from "../db/types";
import { resetDbForTest, cleanUpDbAfterTest } from "../api/utils";
import {
  testDbConnection,
  createCountriesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
} from "@ta/cm/src/__tests__/utils";

let conn: Connection;

beforeEach(async () => {
  const db = await testDbConnection();
  conn = db.conn;
  await resetDbForTest(conn);
});

afterEach(async () => {
  await cleanUpDbAfterTest(conn);
});

describe("", () => {
  it("lists countries", async () => {
    const countries = await listCountries(conn);
    expect(countries).toEqual([]);

    const sql = ` ${createCountriesInsertSql}
    ${insertGermanyValueSql}
    ,${insertFranceValueSql};`;

    await conn.none(sql);
    const expected = await listCountries(conn);

    expect(expected).toEqual([
      {
        id: "01ERQBPBTXASJR2KJWP8QVNPKB",
        country_name: "France",
        country_code: "FR",
      },
      {
        id: "01ERQBPCE3XM3SXQ9E11JTV9HS",
        country_name: "Germany",
        country_code: "DE",
      },
    ]);
  });
});
