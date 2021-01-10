import { BranchFragment, BrandFragment } from "../gql/ops-types";

export const mockBranchValue1 = {
  id: "bcId1",
  street: "str1",
  city: "ci1",
  postCode: "pc1",
  branchAlias: "a",
  phone: "p",
} as BranchFragment;

export const mockBrandValue1 = {
  id: "brandId1",
  name: "edeka",
  countryId: "coId1",
  currencyId: "ccyId1",
  phone: "1234",
} as BrandFragment;
