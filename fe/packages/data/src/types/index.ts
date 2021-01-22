import { DbArg as DbArg1 } from "@ta/pp/src/db/types";
export type { Connection } from "@ta/pp/src/db/types";
// import { DataLoaders } from "../data-loaders";

export interface ServerContext {
  db: DbArg;
  // dataLoaders: DataLoaders;
  // currentUser?: User | null;
}

export type DbArg = DbArg1;
