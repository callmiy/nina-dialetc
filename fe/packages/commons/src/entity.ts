import { DatabaseInstance } from "@ta/pp/src/db/db";

export interface OurContext {
  db: DatabaseInstance;
  secret: string;
  // currentUser?: User | null;
}

export interface Country {
  id: string;
  name: string;
  code: string;
}

export type CountryMapper = Country;
