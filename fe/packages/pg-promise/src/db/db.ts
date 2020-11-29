import promise from "bluebird";
import pgPromise from "pg-promise";
import { IInitOptions } from "pg-promise";
import { DATABASE_URL } from "@talat/commons/src/envs";
import { Diagnostics } from "./diagnostics";

const initOptions: IInitOptions = {
  promiseLib: promise,
};

const pgp = pgPromise(initOptions);
const db = pgp(DATABASE_URL);
Diagnostics.init(initOptions);

export { pgp, db };

export type DatabaseInstance = typeof db;