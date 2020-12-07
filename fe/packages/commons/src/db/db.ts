import { makeDb } from "@ta/pp/src/db/db";

const key = {};

const { db } = makeDb(key, true);

export { db };
