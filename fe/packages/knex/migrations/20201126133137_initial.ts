/* eslint-disable @typescript-eslint/no-explicit-any */
import Knex from "knex";
import { Ulid } from "id128";
import {
  makeTimestampsColumns,
  MAKE_TIMESTAMPS_COLUMNS,
} from "../src/db_utils";

export const up = async function (knex: Knex) {
  const tableName = "countries";

  let timestampsStmt: MAKE_TIMESTAMPS_COLUMNS = [];

  await knex.schema.createTable(tableName, function (table) {
    table.uuid("id").notNullable().primary();
    table.string("name", 25).notNullable();
    table.string("code", 2).unique("countries_code_index").notNullable();
    table.string("curr_name", 100).notNullable();
    table.string("curr_code", 3).notNullable();

    timestampsStmt = makeTimestampsColumns(knex, table, tableName);
  });

  await knex.schema.alterTable(tableName, function (t) {
    t.unique(["code", "curr_name"], "countries_code_curr_code_index");
  });

  await Promise.all(timestampsStmt);

  const data = [
    {
      name: "Germany",
      code: "DE",
      curr_name: "Euro",
      curr_code: "EUR",
    },
    {
      name: "France",
      code: "FR",
      curr_name: "Euro",
      curr_code: "EUR",
    },
  ];

  data.forEach((d) => {
    const id = Ulid.generate().toRaw();
    (d as any).id = id;
  });

  try {
    await knex("countries").insert(data);
  } catch (error) {
    console.error(error);
  }
};

export const down = async function (knex: Knex) {
  await knex.schema.dropTable("countries");
};
