/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["String"]>;
  listCountries: Array<Country>;
};

export type Country = {
  __typename?: "Country";
  id: Scalars["ID"];
  name: Scalars["String"];
  code: Scalars["String"];
  curr_name: Scalars["String"];
  curr_code: Scalars["String"];
  insertedAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};
