export type Await<T> = T extends PromiseLike<infer U> ? U : T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CountryEntity = {
  id: string;
  country_name: string;
  country_code: string;
  updated_at: string;
  inserted_at: string;
};

export type CurrencyEntity = {
  id: string;
  currency_name: string;
  currency_code: string;
  updated_at: string;
  inserted_at: string;
};
