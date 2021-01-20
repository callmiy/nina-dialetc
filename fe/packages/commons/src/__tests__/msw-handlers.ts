import { ApolloError } from "@apollo/client/core";
import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  ListBrands,
  ListBrandsVariables,
  ListCountriesAndCurrencies,
  ListCountriesAndCurrenciesVariables,
  Signup,
  SignupVariables,
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

export function signupMswMutation(data: ApolloError | Partial<Signup>) {
  return graphql.mutation<Signup, SignupVariables>(
    "Signup",
    (req, res, ctx) => {
      if (data instanceof ApolloError) {
        const { graphQLErrors, networkError } = data;

        if (graphQLErrors) {
          return res(ctx.errors(graphQLErrors as any));
        }

        if (networkError) {
          return res.networkError(networkError.message);
        }
      }

      return res(ctx.data(data));
    }
  );
}
