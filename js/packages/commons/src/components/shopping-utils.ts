import { BranchFragment } from "../gql/ops-types";

export function getBranchDisplayName({
  postCode,
  city,
  street,
}: Pick<BranchFragment, "postCode" | "city" | "street">) {
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

export const ADD_ARTICLE_LABEL_TEXT = "Add";

export const ADD_ARTICLE_LABEL_HELP_TEXT = `Select from the dropdown list or click '${ADD_ARTICLE_LABEL_TEXT}' to create new article`;

export const EDIT_ARTICLE_LABEL_TEXT = "Edit";

export const EDIT_ARTICLE_LABEL_HELP_TEXT = `Click on '${EDIT_ARTICLE_LABEL_TEXT}' button to modify currently selected article`;
