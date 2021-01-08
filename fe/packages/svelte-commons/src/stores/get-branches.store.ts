import { getBranches } from "@ta/cm/src/apollo/get-branches";
import { BRANCH_LOADING_MSG } from "@ta/cm/src/components/branch-utils";
import { LOADING_STATE } from "@ta/cm/src/constants";
import { BranchState, BranchStateData } from "@ta/cm/src/types";
import { Writable, writable } from "svelte/store";

const initialBranchState = {
  ...LOADING_STATE,
  msg: BRANCH_LOADING_MSG,
};

export const branchesStore = writable<BranchState>(initialBranchState);
export const branchesStoreData = branchesStore as Writable<BranchStateData>;

export async function getBranchesStore() {
  const result = await getBranches();
  branchesStore.set(result);
}

export function resetBranchesStore() {
  branchesStore.set(initialBranchState);
}
