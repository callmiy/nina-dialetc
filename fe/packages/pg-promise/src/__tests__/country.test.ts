import { listCountries, listPostCodesFromCountriesIds } from "../api/country";
import { Connection, DatabaseInstance } from "../db/types";
import { IConnected } from "pg-promise";
import { resetDbForTest, cleanUpDbAfterTest } from "../api/utils";
import {
  testDbConnection,
  germanyData,
  franceData,
  createCountriesInsertSql,
  insertGermanyValueSql,
  insertFranceValueSql,
} from "@ta/cm/src/__tests__/utils";

let conn: Connection;

beforeEach(async () => {
  const result = await testDbConnection();
  conn = result.conn;
  await resetDbForTest(conn);
});

afterEach(async () => {
  await cleanUpDbAfterTest(conn);
});

const {
  uuidCompressed: deUuid,
  postCodeUlid: dePostCodeUlid,
  ulid: deUlid,
} = germanyData;
const {
  uuidCompressed: frUuid,
  postCodeUlid: frPostCodeUlid,
  ulid: frUlid,
} = franceData;

describe("", () => {
  it("lists countries", async () => {
    const countries = await listCountries(conn);
    expect(countries).toEqual([]);

    await createCountries();
    const expected = await listCountries(conn);

    expect(expected).toEqual([
      {
        id: "01ERQBPCE3XM3SXQ9E11JTV9HS",
        country_name: "Germany",
        country_code: "DE",
      },
      {
        id: "01ERQBPBTXASJR2KJWP8QVNPKB",
        country_name: "France",
        country_code: "FR",
      },
    ]);
  });
});

async function createCountries() {
  const sql = ` ${createCountriesInsertSql}
    ${insertGermanyValueSql}
    ,${insertFranceValueSql};`;

  await conn.none(sql);
}
