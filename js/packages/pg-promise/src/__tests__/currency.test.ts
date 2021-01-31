import { listCurrencies } from "@ta/da/src/db";
import { Connection } from "../db/types";
import { resetDbForTest, cleanUpDbAfterTest } from "../api/utils";
import {
  testDbConnection,
  createCurrenciesInsertSql,
  currencyEuroData,
  insertEuroValueSql,
} from "@ta/da/src/__tests__/utils";

let conn: Connection;

beforeEach(async () => {
  const result = await testDbConnection();
  conn = result.conn;
  await resetDbForTest(conn);
});

afterEach(async () => {
  await cleanUpDbAfterTest(conn);
});

const { ulid: eurUlid, name: eurName, code: eurCode } = currencyEuroData;

describe("", () => {
  it("lists currencies", async () => {
    const currencies = await listCurrencies(conn);
    expect(currencies).toEqual([]);

    const sql = `${createCurrenciesInsertSql}
    ${insertEuroValueSql};`;

    await conn.none(sql);
    const expected = await listCurrencies(conn);

    expect(expected).toMatchObject([
      {
        id: eurUlid,
        currency_name: eurName,
        currency_code: eurCode,
      },
    ]);
  });
});
