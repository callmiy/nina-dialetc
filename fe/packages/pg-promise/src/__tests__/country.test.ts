import { listCountries, listPostCodesForCountries } from "../api/country";
import { db, Connection } from "../db/db";
import { IConnected } from "pg-promise";
import { testUtilsSqls } from "../sql";

let conn: Connection;

beforeEach(async () => {
  conn = await db.connect();
  await conn.query("BEGIN");
  await conn.none(testUtilsSqls.empty);
});

afterEach(async () => {
  if (conn) {
    await conn.query("ROLLBACK");
    conn.done();
  }
});

const germanyId = "01ERQBPCE3XM3SXQ9E11JTV9HS";
const germanUid = "01762EBB31C3ED079EDD2E0865ADA639";
const germanPostCodeUuid = "01762E3FB066E1FF103A9FC11494467A";
const germanPostCodeUlid = "01ERQ3ZC36W7ZH0EMZR4A98HKT";

const franceId = "01ERQBPBTXASJR2KJWP8QVNPKB";
const franceUid = "01762EBB2F5D5665814E5CB22FBADA6B";
const francePostCodeUuid = "01762E3F9189C3FF5AFC0FAB8EB43405";
const francePostCodeUlid = "01ERQ3Z4C9RFZNNZ0FNE7B8D05";

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

  const countriesIds = [germanyId, franceId];

  const actual = await listPostCodesForCountries(conn, countriesIds);

  const expected = [
    {
      id: germanPostCodeUlid,
      country_id: germanyId,
      post_code: "09126",
      city: "Chemnitz",
      state: "Saxony",
    },
    {
      id: francePostCodeUlid,
      country_id: franceId,
      post_code: "1234 abc",
      state: "Paris",
      city: "Paris",
    },
  ];

  expect(actual).toEqual(expected);
});

async function createPostCodes() {
  const sql = `
  INSERT INTO post_codes
    (
      id
      ,post_code
      ,city
      ,state
      ,country_id
    )
  VALUES
    (
      '${francePostCodeUuid}'
      ,'1234 abc'
      ,'Paris'
      ,'Paris'
      ,'${franceUid}'
    )
  ,(
      '${germanPostCodeUuid}'
      ,'09126'
      ,'Chemnitz'
      ,'Saxony'
      ,'${germanUid}'
    )
  `;
  await conn.none(sql);
}

async function createCountries() {
  const sql = `
    INSERT INTO
      countries
      (
        id
        ,country_name
        ,country_code
      )
    VALUES
      (
        '${germanUid}'
        ,'Germany'
        ,'DE'
      )
      ,(
        '${franceUid}'
        ,'France'
        ,'FR'
      )
    `;
  await conn.none(sql);
}
