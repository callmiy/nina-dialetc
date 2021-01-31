import { BrandFragment } from "../gql/ops-types";

export type BrandFormValue = BrandFragment & {
  phone: string;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BrandFragment) => void;
  brand: BrandFragment;
};

export const EMPTY_BRAND_FORM = {
  name: "",
  countryId: "",
  currencyId: "",
  phone: "",
} as BrandFormValue;

export const BRAND_LOADING_MSG = "Loading brands data...";

export const BRAND_FETCHING_FAILED = `Attempt to fetch brands data failed`;
