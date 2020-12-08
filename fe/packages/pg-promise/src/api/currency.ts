import { currenciesSql } from "../sql";
import { DbArg } from "../db/types";
import { CurrencyEntity } from "@ta/cm/src/types";
import { fromUuidToUlid } from "@ta/cm/src/db/ulid-uuid";

export async function listCurrencies(db: DbArg) {
  const list = await db.any<CurrencyEntity>(currenciesSql.list);

  const listWithUlid = list.map((l) => {
    const { id } = l;
    l.id = fromUuidToUlid(id);
    return l;
  });

  return listWithUlid;
}
