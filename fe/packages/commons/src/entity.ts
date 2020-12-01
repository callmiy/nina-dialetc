import { DatabaseInstance } from "@ta/pp/src/db/db";

export interface OurContext {
  db: DatabaseInstance;
  secret: string;
  // currentUser?: User | null;
}

// export interface Country extends ModelTimestamps {
//   id: string;
//   country_name: string;
//   country_code: string;
//   currencies: Currency[];
// }

// export interface Currency extends ModelTimestamps {
//   id: string;
//   currency_name: string;
//   currency_code: string;
//   countries: Country[];
// }

// interface ModelTimestamps {
//   inserted_at: string;
//   updated_at: string;
// }

// export type CountryMapper = Country;
// export type CurrencyMapper = Currency;
