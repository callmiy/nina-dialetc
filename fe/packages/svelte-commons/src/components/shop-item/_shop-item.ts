import {
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  shopItemAddBrandId,
  shopItemBranchInputId,
  shopItemBranchNameOptionSelector,
  shopItemAddBranchId,
} from "@ta/cm/src/selectors";

import { Props as BrandProps, BrandValues } from "../brand/_brand";
import { BranchValues } from "../branch/branch-utils";
import { getBranchDisplayName } from "./shop-item-utils";

// BRAND ///////////////////////////////////////////////////////////////////////

let brandId = "";
let brandOptions: BrandValues[] = [];
let brandIsActive = false;

function activateBrandCb() {
  branchIsActive = false;
  brandIsActive = true;
}

const onSubmitBrand: BrandProps["onSubmit"] = (values) => {
  brandIsActive = false;

  const { id: maybeNewId } = values;
  brandId = maybeNewId;

  const options: BrandValues[] = [values];

  brandOptions.forEach((b) => {
    if (b.id !== maybeNewId) {
      options.push(b);
    }
  });

  brandOptions = options;
};

// BRANCH ///////////////////////////////////////////////////////////////////////

let branchIsActive = false;
let branchOptions: BranchValuesWithDisplayName[] = [];
let branchId = "";

function activateBranchCb() {
  brandIsActive = false;
  branchIsActive = true;
}

function onSubmitBranch(data: BranchValues) {
  branchIsActive = false;

  const { id: maybeNewId } = data;
  branchId = maybeNewId;
  (data as BranchValuesWithDisplayName).displayName = getBranchDisplayName(
    data
  );

  const options: BranchValuesWithDisplayName[] = [
    data as BranchValuesWithDisplayName,
  ];

  branchOptions.forEach((b) => {
    if (b.id !== maybeNewId) {
      options.push(b);
    }
  });

  branchOptions = options;
}

// CALLBACKS /////////////////////////////////////////////////////////////////

type BranchValuesWithDisplayName = BranchValues & {
  displayName: string;
};
