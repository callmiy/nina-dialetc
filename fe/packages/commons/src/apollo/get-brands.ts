import { BRAND_FETCHING_FAILED } from "../components/brand-utils";
import { DATA_FETCHING_FAILED, StateValue } from "../constants";
import {
  ListBrands_listBrands_edges,
  ListBrands,
  ListBrandsVariables,
} from "../gql/ops-types";
import { listBrandsQuery } from "../gql/queries/brand.query";
import { BrandState, StringErrorState } from "../types";
import { makeApolloClient } from "./client";

export async function getBrands(): Promise<BrandState | StringErrorState> {
  const { client } = makeApolloClient();

  const { data } = await client.query<ListBrands, ListBrandsVariables>({
    query: listBrandsQuery,
    variables: {
      paginationInput: {
        first: 10,
      },
    },
  });

  if (data) {
    const { listBrands } = data;

    if (listBrands) {
      const brands = ((listBrands.edges ||
        []) as ListBrands_listBrands_edges[]).map((e) => {
        const node = (e as ListBrands_listBrands_edges).node;
        return node;
      });

      return {
        value: StateValue.data,
        data: {
          brands,
          pageInfo: listBrands.pageInfo,
        },
      };
    }

    return {
      value: StateValue.errors,
      error: BRAND_FETCHING_FAILED,
    };
  }
  return {
    value: StateValue.errors,
    error: DATA_FETCHING_FAILED,
  };
}
