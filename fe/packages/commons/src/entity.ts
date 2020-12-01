import { DatabaseInstance } from "@ta/pp/src/db/db";

export interface OurContext {
  db: DatabaseInstance;
  secret: string;
  // currentUser?: User | null;
}
