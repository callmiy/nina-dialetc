import { db } from "../db/db";
import { countriesSql } from "../sql";

export async function listCountries() {
  return await db.many(countriesSql.list);
}
