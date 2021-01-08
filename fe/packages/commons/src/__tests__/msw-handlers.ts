import { graphql } from "msw";
import {
  ListBranches,
  ListBranchesVariables,
  ListBranches_listBranches,
} from "../gql/ops-types";

export function makeListBranchesHandler(data: ListBranches_listBranches) {
  return graphql.query<ListBranches, ListBranchesVariables>(
    "ListBranches",
    (req, res, ctx) => {
      return res(
        ctx.data({
          listBranches: data,
        })
      );
    }
  );
}
