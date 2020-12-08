import { createTestClient } from "apollo-server-testing";
import { makeApolloServer } from "../apollo/server";
import { DbArg } from "../types/db";
import { makeDb } from "@ta/pp/src/db/db";

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
  postCodeUuidCompressed: "01762E3FB066E1FF103A9FC11494467A",
  postCodeUlid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  name: "Germany",
  code: "DE",
};

export const franceData = {
  ulid: "01ERQBPBTXASJR2KJWP8QVNPKB",
  uuidCompressed: "01762EBB2F5D5665814E5CB22FBADA6B",
  postCodeUuidCompressed: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCodeUlid: "01ERQ3Z4C9RFZNNZ0FNE7B8D05",
  name: "France",
  code: "FR",
  frPostCodeState: "Paris",
};

export const createPostCodesInsertSql = `
INSERT INTO post_codes
  (
    id
    ,post_code
    ,city
    ,state
    ,country_id
  )
VALUES
`;

export const insertGermanPostCodeValueSql = `
(
  '${germanyData.postCodeUuidCompressed}'
  ,'09126'
  ,'Chemnitz'
  ,'Saxony'
  ,'${germanyData.uuidCompressed}'
)
`;

const germanPosCode1 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "1234",
  city: "Daa",
  state: "Tii",
};

const germanPosCode2 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "4567",
  city: "Laa",
  state: "Haa",
};

const germanPosCode3 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "7869",
  city: "Kiy",
  state: "Moy",
};

const germanPosCode4 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "4356",
  city: "Mmm",
  state: "Xcv",
};

const francePosCode1 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "1234 abc",
  city: "Paris",
  state: "Essex",
};

const francePosCode2 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "4567",
  city: "Jar",
  state: "Hit",
};

const francePosCode3 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "9801",
  city: "Hil",
  state: "See",
};

const francePosCode4 = {
  ulid: "01ERQ3ZC36W7ZH0EMZR4A98HKT",
  uuid: "01762E3F9189C3FF5AFC0FAB8EB43405",
  postCode: "1112",
  city: "Met",
  state: "Gee",
};

export const insertFrancePostCodeValueSql = `
(
  '${franceData.postCodeUuidCompressed}'
  ,'1234 abc'
  ,'Paris'
  ,'Paris'
  ,'${franceData.uuidCompressed}'
)
`;

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
