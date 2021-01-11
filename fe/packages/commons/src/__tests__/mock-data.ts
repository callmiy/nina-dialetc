import { BranchFragment, BrandFragment } from "../gql/ops-types";

export const germanyCountry1 = {
  id: "co1",
  countryName: "germany",
  countryCode: "de",
};

export const eurCcy1 = {
  id: "cur1",
  currencyName: "Euro",
  currencyCode: "EUR",
};

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
  countryId: germanyCountry1.id,
  currencyId: eurCcy1.id,
  phone: "1234",
} as BrandFragment;
