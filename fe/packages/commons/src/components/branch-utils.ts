import { BranchFragment } from "../gql/ops-types";

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BranchFragment) => void;
  branch?: BranchFragment;
};

export type BranchFormValue = BranchFragment & {
  phone: string;
  branchAlias: string;
};

export const EMPTY_BRANCH = {
  postCode: "",
  street: "",
  city: "",
  phone: "",
  branchAlias: "",
} as BranchFormValue;

export const BRANCH_LOADING_MSG = "Loading branch data...";

export const BRANCH_FETCHING_FAILED = `Attempt to fetch branches data failed`;
