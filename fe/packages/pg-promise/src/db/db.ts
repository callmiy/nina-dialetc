import promise from "bluebird";
import pgPromise from "pg-promise";
import { IInitOptions, ITask } from "pg-promise";
import { DATABASE_URL } from "@ta/cm/src/envs";
import { Await } from "@ta/cm/src/types";
import { Diagnostics } from "./diagnostics";

const initOptions: IInitOptions = {
  promiseLib: promise,
};

const pgp = pgPromise(initOptions);
const db = pgp(DATABASE_URL);
Diagnostics.init(initOptions);

export { pgp, db };

export type DatabaseInstance = typeof db;
export type Connection = Await<ReturnType<DatabaseInstance["connect"]>>;
export type DbArg = ITask<unknown> | DatabaseInstance | Connection;
