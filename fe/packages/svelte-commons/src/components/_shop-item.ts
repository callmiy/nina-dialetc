import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
} from "@ta/cm/src/selectors";
import { Props as BrandProps } from "./_brand";

let brandName = "";
let brandComponentIsActive = false;

// CALLBACKS /////////////////////////////////////////////////////////////////

function activateBrandComponent() {
  brandComponentIsActive = true;
}

const onSubmitShopBrand: BrandProps["onSubmit"] = (values) => {
  brandName = values.name;
  console.log(values);
  brandComponentIsActive = false;
};
