import { currenciesSql } from "../sql";
import { DbArg } from "../db/types";

export async function listCurrencies(db: DbArg) {
  return await db.any(currenciesSql.list);
}
