import { db } from "@ta/pp/src/db/db";
import { emptyAuths as emptyAuths1 } from "@ta/pp/src/api/utils";
import { listCountries as listCountries1 } from "@ta/pp/src/api/country";
import { listCurrencies as listCurrencies1 } from "@ta/pp/src/api/currency";

export function listCountries() {
  return listCountries1(db);
}

export function emptyAuths() {
  return emptyAuths1();
}

export function listCurrencies() {
  return listCurrencies1();
}
