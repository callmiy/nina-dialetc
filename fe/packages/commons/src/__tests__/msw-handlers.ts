import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  ListBrands,
  ListBrandsVariables,
  ListCountriesAndCurrencies,
  ListCountriesAndCurrenciesVariables,
} from "../gql/ops-types";

export function getMswListBranchesGql(data: ListBranches) {
  return graphql.query<ListBranches, ListBranchesVariables>(
    "ListBranches",
    (req, res, ctx) => {
      return res(ctx.data(data));
    }
  );
}

export function getMswListBrandsGql(data: ListBrands) {
  return graphql.query<ListBrands, ListBrandsVariables>(
    "ListBrands",
    (req, res, ctx) => {
      return res(ctx.data(data));
    }
  );
}

export function getMswListCountriesAndCurrencies(
  data: ListCountriesAndCurrencies
) {
  return graphql.query<
    ListCountriesAndCurrencies,
    ListCountriesAndCurrenciesVariables
  >("ListCountriesAndCurrencies", (req, res, ctx) => {
    return res(ctx.data(data));
  });
}
