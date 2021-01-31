import { DbArg, Connection } from "../db/types";
import { ownersSqls } from "../sql";
import { testUtilsSqls } from "../sql";

export async function emptyOwners(conn: DbArg) {
  return await conn.none(ownersSqls.empty);
}

export async function resetDbForTest(conn: DbArg) {
  await conn.query("BEGIN");
  await conn.none(testUtilsSqls.empty);
}

export async function cleanUpDbAfterTest(conn: DbArg) {
  if (conn) {
    await conn.query("ROLLBACK");
    // await (conn as Connection).done(true);
    await (conn as Connection).done(true);
  }
}
