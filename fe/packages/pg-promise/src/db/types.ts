import { IClient } from "pg-promise/typescript/pg-subset";
import { IDatabase, ITask } from "pg-promise";
import { Await } from "@ta/cm/src/types";

export type DatabaseInstance = IDatabase<unknown, IClient>;
export type Connection = Await<ReturnType<DatabaseInstance["connect"]>>;
export type DbArg = ITask<unknown> | DatabaseInstance | Connection;
