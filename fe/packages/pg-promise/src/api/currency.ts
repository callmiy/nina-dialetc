import { db } from "../db/db";
import { currenciesSql } from "../sql";

export async function listCurrencies() {
  return await db.many(currenciesSql.list);
}
