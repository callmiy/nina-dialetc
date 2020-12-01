/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
} from "@ta/cm/src/shop-item-dom";

export let name: string;
let brandComponentIsActive = false;

function activateBrandComponent() {
  brandComponentIsActive = true;
}
