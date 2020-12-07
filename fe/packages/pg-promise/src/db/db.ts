/* eslint-disable @typescript-eslint/ban-types*/
import promise from "bluebird";
import pgPromise from "pg-promise";
import { IInitOptions, IMain, IDatabase } from "pg-promise";
import { DATABASE_URL } from "@ta/cm/src/envs";
import { Diagnostics } from "./diagnostics";
import { IClient } from "pg-promise/typescript/pg-subset";

const map = new WeakMap<object, Return>();

type Return = {
  pgp: IMain<{}, IClient>;
  db: IDatabase<{}, IClient>;
};

export function makeDb(key: object, diagnostics = false) {
  if (key === undefined) {
    throw new Error("undefined is not a valid key");
  }

  const data = map.get(key);

  if (data !== undefined) {
    return data;
  }

  const initOptions: IInitOptions = {
    promiseLib: promise,
  };

  const pgp = pgPromise(initOptions);
  const db = pgp(DATABASE_URL);

  if (diagnostics) {
    Diagnostics.init(initOptions);
  }

  const values = {
    pgp,
    db,
  };

  map.set(key, values);

  return values;
}
