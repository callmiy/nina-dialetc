import { BranchFragment } from "../gql/ops-types";

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BranchFragment) => void;
  branch?: BranchFragment;
};

export const BRANCH_LOADING_MSG = "Loading branch data...";

export const BRANCH_FETCHING_FAILED = `Attempt to fetch branches data failed`;
