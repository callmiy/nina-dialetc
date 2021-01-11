import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  ListBrands,
  ListBrandsVariables,
  ListCountriesAndCurrencies,
  ListCountriesAndCurrenciesVariables,
} from "../gql/ops-types";
import {
  eurCcy1,
  franceCountry1,
  germanyCountry1,
  mockBranchValue1,
  mockBrandValue1,
} from "./mock-data";

export const handlers = [
  graphql.query<ListBranches, ListBranchesVariables>(
    "ListBranches",
    (req, res, ctx) => {
      return res(
        ctx.data({
          listBranches: {
            edges: [
              {
                node: mockBranchValue1,
              },
            ],
          },
        })
      );
    }
  ),

  graphql.query<ListBrands, ListBrandsVariables>(
    "ListBrands",
    (req, res, ctx) => {
      return res(
        ctx.data({
          listBrands: {
            edges: [
              {
                node: mockBrandValue1,
              },
            ],
          },
        })
      );
    }
  ),

  graphql.query<
    ListCountriesAndCurrencies,
    ListCountriesAndCurrenciesVariables
  >("ListCountriesAndCurrencies", (req, res, ctx) => {
    return res(
      ctx.data({
        listCountries: {
          edges: [
            {
              node: germanyCountry1,
            },
            {
              node: franceCountry1,
            },
          ],
        },
        listCurrencies: [eurCcy1],
      })
    );
  }),
];
