import { BranchValues } from "../branch/branch-utils";
import { Omit } from "@ta/cm/src/types";

export function getBranchDisplayName({
  postCode,
  city,
  street,
}: Omit<BranchValues, "id">) {
  return `${street}, ${postCode}, ${city}`;
}

export const ADD_SHOP_BRAND_LABEL_TEXT = "Add";

export const ADD_SHOP_BRAND_LABEL_HELP_TEXT = `Select from the dropdown list or click '${ADD_SHOP_BRAND_LABEL_TEXT}' to create new shop brand`;

export const EDIT_SHOP_BRAND_LABEL_TEXT = "Edit";

export const EDIT_SHOP_BRAND_LABEL_HELP_TEXT = `Click on '${EDIT_SHOP_BRAND_LABEL_TEXT}' button to modify currently selected brand`;

export const ADD_SHOP_BRANCH_LABEL_TEXT = "Add";

export const ADD_SHOP_BRANCH_LABEL_HELP_TEXT = `Select from the dropdown list or click '${ADD_SHOP_BRANCH_LABEL_TEXT}' to create new branch`;

export const EDIT_SHOP_BRANCH_LABEL_TEXT = "Edit";

export const EDIT_SHOP_BRANCH_LABEL_HELP_TEXT = `Click on '${EDIT_SHOP_BRANCH_LABEL_TEXT}' button to modify currently selected branch`;





export const ADD_SHOPPING_ITEM_LABEL_TEXT = "Add";

export const ADD_SHOPPING_ITEM_LABEL_HELP_TEXT = `Select from the dropdown list or click '${ADD_SHOPPING_ITEM_LABEL_TEXT}' to create new shopping item`;

export const EDIT_SHOPPING_ITEM_LABEL_TEXT = "Edit";

export const EDIT_SHOPPING_ITEM_LABEL_HELP_TEXT = `Click on '${EDIT_SHOPPING_ITEM_LABEL_TEXT}' button to modify currently selected shopping item`;
