import { GetCountriesCurrencies } from "../apollo/get-countries-currencies";
import { StateValue } from "../constants";
import {
  BranchFragment,
  BrandFragment,
  CountryFragment,
  CurrencyFragment,
} from "../gql/ops-types";

export const germanyCountry1 = {
  id: "co1",
  countryName: "germany",
  countryCode: "de",
  __typename: "Country",
} as CountryFragment;

export const franceCountry1 = {
  id: "co2",
  countryName: "france",
  countryCode: "fr",
  __typename: "Country",
} as CountryFragment;

export const eurCcy1 = {
  id: "cur1",
  currencyName: "Euro",
  currencyCode: "EUR",
  __typename: "Currency",
} as CurrencyFragment;

export const countriesCurrencies = [
  {
    value: StateValue.data,
    data: {
      countries: [germanyCountry1, franceCountry1],
    },
  },
  {
    value: StateValue.data,
    data: {
      currencies: [eurCcy1],
    },
  },
] as GetCountriesCurrencies;

export const mockBranchValue1 = {
  id: "bcId1",
  street: "str1",
  city: "ci1",
  postCode: "pc1",
  branchAlias: "a",
  phone: "p",
  __typename: "Branch",
} as BranchFragment;

export const mockBrandValue1 = {
  id: "brandId1",
  name: "edeka",
  countryId: germanyCountry1.id,
  currencyId: eurCcy1.id,
  phone: "1234",
  __typename: "Brand",
} as BrandFragment;
