import { Writable, writable } from "svelte/store";
import { LOADING_STATE } from "@ta/cm/src/constants";
import { BRAND_LOADING_MSG } from "@ta/cm/src/components/brand-utils";
import { BrandState, BrandStateData } from "@ta/cm/src/types";
import { getBrands } from "@ta/cm/src/apollo/get-brands";

const initialBrandState = {
  ...LOADING_STATE,
  msg: BRAND_LOADING_MSG,
};

export const brandStore = writable<BrandState>(initialBrandState);
export const brandStoreData = brandStore as Writable<BrandStateData>;

export async function getBrandsStore() {
  const result = await getBrands();
  brandStore.set(result);
}

export function resetBrandsStore() {
  brandStore.set(initialBrandState);
}
