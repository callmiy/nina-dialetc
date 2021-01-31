import { createTestClient } from "apollo-server-testing";
import { makeApolloServer } from "../apollo/server";

import { DbArg } from "../types";
// DB THINGS /////////////////////////////////////////////////////

import { makeDb } from "@ta/pp/src/db/db";
export { cleanUpDbAfterTest, resetDbForTest } from "@ta/pp/src/api/utils";

// DB CONNECTION FOR TEST /////////////////////////////////////////////////////

const key = {};
export async function testDbConnection() {
  const { db } = makeDb(key);
  const conn = await db.connect();
  return { conn };
}

export function makeApolloServerAndClient({ db }: { db: DbArg }) {
  const server = makeApolloServer({
    db,
  });

  return {
    server,
    ...createTestClient(server),
  };
}

export const germanyData = {
  ulid: "01ERQBPCE3XM3SXQ9E11JTV9HS",
  uuidCompressed: "01762EBB31C3ED079EDD2E0865ADA639",
  name: "Germany",
  code: "DE",
};

export const franceData = {
  ulid: "01ERQBPBTXASJR2KJWP8QVNPKB",
  uuidCompressed: "01762EBB2F5D5665814E5CB22FBADA6B",
  name: "France",
  code: "FR",
};

export const hollandData = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuidCompressed: "01762E3FB066E1FF103A9FC11494467A",
  name: "Holland",
  code: "HO",
};

export const createCountriesInsertSql = `
INSERT INTO
  countries
  (
    id
    ,country_name
    ,country_code
  )
VALUES
`;

export const insertGermanyValueSql = `
(
  '${germanyData.uuidCompressed}'
  ,'${germanyData.name}'
  ,'${germanyData.code}'
)
`;

export const insertFranceValueSql = `
(
  '${franceData.uuidCompressed}'
  ,'${franceData.name}'
  ,'${franceData.code}'
)
`;

export const insertHollandValueSql = `
(
  '${hollandData.uuidCompressed}'
  ,'${hollandData.name}'
  ,'${hollandData.code}'
)
`;

export const currencyEuroData = {
  ulid: "01ERDX3JZ4FSY8PY4XTHPJH6EX",
  uuidCompressed: "01761BD1CBE47E7C8B789DD46D2899DD",
  name: "Euro",
  code: "EUR",
};

export const insertEuroValueSql = `
(
  '${currencyEuroData.uuidCompressed}'
  ,'${currencyEuroData.name}'
  ,'${currencyEuroData.code}'
)
`;

export const createCurrenciesInsertSql = `
INSERT INTO
  currencies
  (
    id
    ,currency_name
    ,currency_code
  )
VALUES
`;
