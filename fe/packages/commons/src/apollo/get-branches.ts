import { BRANCH_FETCHING_FAILED } from "../components/branch-utils";
import { DATA_FETCHING_FAILED, StateValue } from "../constants";
import {
  ListBranches,
  ListBranchesVariables,
  ListBranches_listBranches_edges,
} from "../gql/ops-types";
import { listBranchesQuery } from "../gql/queries/branch.query";
import { BranchState, StringErrorState } from "../types";
import { makeApolloClient } from "./client";

export async function getBranches(): Promise<BranchState | StringErrorState> {
  const { client } = makeApolloClient();

  const { data } = await client.query<ListBranches, ListBranchesVariables>({
    query: listBranchesQuery,
    variables: {
      paginationInput: {
        first: 10,
      },
    },
  });

  if (data) {
    const { listBranches } = data;

    if (listBranches) {
      const branches = ((listBranches.edges ||
        []) as ListBranches_listBranches_edges[]).map((e) => {
        const node = (e as ListBranches_listBranches_edges).node;
        return node;
      });

      return {
        value: StateValue.data,
        data: {
          branches,
          pageInfo: listBranches.pageInfo,
        },
      };
    }

    return {
      value: StateValue.errors,
      error: BRANCH_FETCHING_FAILED,
    };
  }
  return {
    value: StateValue.errors,
    error: DATA_FETCHING_FAILED,
  };
}
