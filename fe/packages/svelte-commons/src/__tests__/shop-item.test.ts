/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render } from "@testing-library/svelte";
import ShopItem from "../components/shop-item/shop-item.svelte";
import {
  shopItemAddBrandLabelHelpId,
  shopItemAddBrandId,
  shopItemAddBranchId,
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import mockBrand from "./brand.mock.svelte";
import mockBranch from "./branch.mock.svelte";
import {
  ADD_SHOP_BRAND_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
} from "../components/shop-item/shop-item-utils";

jest.mock("../components/lazies/brand.lazy", () => {
  return {
    getBrandComponent: () => {
      return mockBrand;
    },
  };
});

jest.mock("../components/lazies/branch.lazy", () => {
  return {
    getBranchComponent: () => {
      return mockBranch;
    },
  };
});

it("changes brand/branch buttons labels and help texts", async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debug } = render(ShopItem);

  // Add brand button label should have text 'Add'
  const addBrandEl = getById(shopItemAddBrandId);
  const addBrandHelpEl = getById(shopItemAddBrandLabelHelpId);
  expect(addBrandEl.textContent).toEqual(ADD_SHOP_BRAND_LABEL_TEXT);
  expect(addBrandHelpEl.textContent).toBe(ADD_SHOP_BRAND_LABEL_HELP_TEXT);

  // When add brand button is clicked
  await addBrandEl.click();

  // And a brand is submitted
  const brandEl = getById("brand-submit-1");
  await brandEl.click();

  // Add brand button's label have text 'edit'
  expect(addBrandEl.textContent).toEqual(EDIT_SHOP_BRAND_LABEL_TEXT);
  expect(addBrandHelpEl.textContent).toBe(EDIT_SHOP_BRAND_LABEL_HELP_TEXT);

  const addBranchEl = getById(shopItemAddBranchId);
  await addBranchEl.click();
});
