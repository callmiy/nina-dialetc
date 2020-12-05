import { listCountries, listPostCodesFromCountriesIds } from "../api/country";
import { Connection, DatabaseInstance } from "../db/types";
import { IConnected } from "pg-promise";
import { resetDbForTest, cleanUpDbAfterTest } from "../api/utils";
import {
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
    expect(expected).toHaveLength(2);
  });

  it("lists countries and post codes", async () => {
    await createCountries();
    await createPostCodes();

    const countriesIds = [deUlid, frUlid];

    const actual = await listPostCodesFromCountriesIds(conn, countriesIds);

    const expected = [
      [
        {
          id: dePostCodeUlid,
          country_id: deUlid,
          post_code: "09126",
          city: "Chemnitz",
          state: "Saxony",
        },
      ],
      [
        {
          id: frPostCodeUlid,
          country_id: frUlid,
          post_code: "1234 abc",
          state: "Paris",
          city: "Paris",
        },
      ],
    ];

    expect(actual).toEqual(expected);
  });
});

async function createPostCodes() {
  const sql = `${createPostCodesInsertSql}
    ${insertGermanPostCodeValueSql}
    ,${insertFrancePostCodeValueSql};`;

  await conn.none(sql);
}

async function createCountries() {
  const sql = ` ${createCountriesInsertSql}
    ${insertGermanyValueSql}
    ,${insertFranceValueSql};`;

  await conn.none(sql);
}
