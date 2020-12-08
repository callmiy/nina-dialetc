import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
  shopItemBranchInputId,
  shopItemBranchNameOptionSelector,
  shopItemAddBranchId,
} from "@ta/cm/src/selectors";

import { Props as BrandProps } from "../brand/_brand";
import { BranchValues } from "../branch/branch-utils";
import { getBranchDisplayName } from "./shop-item-utils";

// BRAND ///////////////////////////////////////////////////////////////////////

let brandName = "";
let brandIsActive = false;

function activateBrandCb() {
  branchIsActive = false;
  brandIsActive = true;
}

const onSubmitBrand: BrandProps["onSubmit"] = (values) => {
  brandName = values.name;
  console.log(values);
  brandIsActive = false;
};

// BRANCH ///////////////////////////////////////////////////////////////////////

let branchIsActive = false;
let brandDisplayValue = "";

function activateBranchCb() {
  brandIsActive = false;
  branchIsActive = true;
}

function onSubmitBranch(data: BranchValues) {
  brandDisplayValue = getBranchDisplayName(data);
  branchIsActive = false;
}

// CALLBACKS /////////////////////////////////////////////////////////////////
