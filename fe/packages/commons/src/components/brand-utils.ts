import { CurrencyFragment, CountryFragment } from "@ta/cm/src/gql/ops-types";

export type BrandValues = {
  id: string;
  name: string;
  country: CountryFragment;
  currency: CurrencyFragment;
  phone?: string | null;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BrandValues) => void;
};
