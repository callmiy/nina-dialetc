import { setupServer } from "msw/node";
import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  // ListBranches_listBranches,
} from "../gql/ops-types";
import { mockBranchValue1 } from "./mock-data";

const handlers = [
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
];

// Setup requests interception using the given handlers.
export const mswServer = setupServer(...handlers);
