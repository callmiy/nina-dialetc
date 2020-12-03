/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
} from "@ta/cm/src/shop-item-dom";
import { Props as ShopBrandProps } from "../ShopBrand/shop-brand";

let brandName = "";
let brandComponentIsActive = false;

// CALLBACKS /////////////////////////////////////////////////////////////////

function activateBrandComponent() {
  brandComponentIsActive = true;
}

const onSubmitShopBrand: ShopBrandProps["onSubmit"] = (values) => {
  brandName = values.name;
  console.log(values);
  brandComponentIsActive = false;
};
