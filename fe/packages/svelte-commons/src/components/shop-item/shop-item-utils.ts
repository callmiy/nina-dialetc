import { BranchValues } from "../branch/branch-utils";

export function getBranchDisplayName({ postCode, city, street }: BranchValues) {
  return `${street}, ${postCode}, ${city}`;
}
