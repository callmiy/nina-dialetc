import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
  shopItemBranchInputId,
  shopItemBranchNameOptionSelector,
  shopItemAddBranchId,
} from "@ta/cm/src/selectors";
import { Props as BrandProps } from "./_brand";

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
let branchName = "";

function activateBranchCb() {
  branchName = "";
  brandIsActive = false;
  branchIsActive = true;
}

function onSubmitBranch() {
  branchIsActive = false;
}

// CALLBACKS /////////////////////////////////////////////////////////////////
