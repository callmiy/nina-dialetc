import { BranchValues } from "../branch/branch-utils";
import { Omit } from "@ta/cm/src/types";

export function getBranchDisplayName({
  postCode,
  city,
  street,
}: Omit<BranchValues, "id">) {
  return `${street}, ${postCode}, ${city}`;
}
