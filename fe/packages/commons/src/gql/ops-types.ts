/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListBranches
// ====================================================

export interface ListBranches_listBranches_edges_node {
  __typename: "Branch";
  id: string;
  postCode: string;
  street: string;
  city: string;
  branchAlias: string | null;
  phone: string | null;
}

export interface ListBranches_listBranches_edges {
  __typename: "BranchEdge";
  node: ListBranches_listBranches_edges_node;
  cursor: string;
}

export interface ListBranches_listBranches_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ListBranches_listBranches {
  __typename: "BranchConnection";
  edges: (ListBranches_listBranches_edges | null)[];
  pageInfo: ListBranches_listBranches_pageInfo;
}

export interface ListBranches {
  listBranches: ListBranches_listBranches;
}

export interface ListBranchesVariables {
  paginationInput: PaginationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListBrands
// ====================================================

export interface ListBrands_listBrands_edges_node {
  __typename: "Brand";
  id: string;
  name: string;
  countryId: string;
  currencyId: string;
  phone: string | null;
}

export interface ListBrands_listBrands_edges {
  __typename: "BrandEdge";
  node: ListBrands_listBrands_edges_node;
  cursor: string;
}

export interface ListBrands_listBrands_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ListBrands_listBrands {
  __typename: "BrandConnection";
  edges: (ListBrands_listBrands_edges | null)[];
  pageInfo: ListBrands_listBrands_pageInfo;
}

export interface ListBrands {
  listBrands: ListBrands_listBrands;
}

export interface ListBrandsVariables {
  paginationInput: PaginationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListCountriesAndCurrencies
// ====================================================

export interface ListCountriesAndCurrencies_listCountries_edges_node {
  __typename: "Country";
  id: string;
  countryName: string;
  countryCode: string;
}

export interface ListCountriesAndCurrencies_listCountries_edges {
  __typename: "CountryEdge";
  node: ListCountriesAndCurrencies_listCountries_edges_node;
  cursor: string;
}

export interface ListCountriesAndCurrencies_listCountries_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ListCountriesAndCurrencies_listCountries {
  __typename: "CountryConnection";
  edges: (ListCountriesAndCurrencies_listCountries_edges | null)[];
  pageInfo: ListCountriesAndCurrencies_listCountries_pageInfo;
}

export interface ListCountriesAndCurrencies_listCurrencies {
  __typename: "Currency";
  id: string;
  currencyName: string;
  currencyCode: string;
}

export interface ListCountriesAndCurrencies {
  listCountries: ListCountriesAndCurrencies_listCountries;
  listCurrencies: (ListCountriesAndCurrencies_listCurrencies | null)[];
}

export interface ListCountriesAndCurrenciesVariables {
  countriesPaginationInput: PaginationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup_SignupSuccess_owner {
  __typename: "Owner";
  ownerId: string;
  email: string;
  jwt: string;
}

export interface Signup_signup_SignupSuccess {
  __typename: "SignupSuccess";
  owner: Signup_signup_SignupSuccess_owner;
}

export interface Signup_signup_SignupErrors {
  __typename: "SignupErrors";
  errors: string[];
}

export type Signup_signup =
  | Signup_signup_SignupSuccess
  | Signup_signup_SignupErrors;

export interface Signup {
  signup: Signup_signup | null;
}

export interface SignupVariables {
  input: SignupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BranchFragment
// ====================================================

export interface BranchFragment {
  __typename: "Branch";
  id: string;
  postCode: string;
  street: string;
  city: string;
  branchAlias: string | null;
  phone: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BrandFragment
// ====================================================

export interface BrandFragment {
  __typename: "Brand";
  id: string;
  name: string;
  countryId: string;
  currencyId: string;
  phone: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CountryFragment
// ====================================================

export interface CountryFragment {
  __typename: "Country";
  id: string;
  countryName: string;
  countryCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CurrencyFragment
// ====================================================

export interface CurrencyFragment {
  __typename: "Currency";
  id: string;
  currencyName: string;
  currencyCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PageInfoFragment
// ====================================================

export interface PageInfoFragment {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OwnerFragment
// ====================================================

export interface OwnerFragment {
  __typename: "Owner";
  ownerId: string;
  email: string;
  jwt: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SignupSuccessFragment
// ====================================================

export interface SignupSuccessFragment_owner {
  __typename: "Owner";
  ownerId: string;
  email: string;
  jwt: string;
}

export interface SignupSuccessFragment {
  __typename: "SignupSuccess";
  owner: SignupSuccessFragment_owner;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SignupErrorsFragment
// ====================================================

export interface SignupErrorsFragment {
  __typename: "SignupErrors";
  errors: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface PaginationInput {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

export interface SignupInput {
  email: string;
  password: string;
  repeatPassword: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
