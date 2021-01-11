import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  ListBrands,
  ListBrandsVariables,
} from "../gql/ops-types";
import { mockBranchValue1, mockBrandValue1 } from "./mock-data";

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
];
