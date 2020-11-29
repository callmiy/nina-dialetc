/* eslint-disable @typescript-eslint/no-unused-vars */

import ShopBrand from "../ShopBrand/ShopBrand.svelte";
import { shopItemBrandNameInputId } from "@ta/cm/src/shop-item-dom";

export let name: string;
let brandComponentIsActive = false;

function activateBrandComponent() {
  brandComponentIsActive = true;
}
