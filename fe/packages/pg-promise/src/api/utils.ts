import { db } from "../db/db";
import { authsSqls } from "../sql";

export async function emptyAuths() {
  return await db.none(authsSqls.empty);
}
