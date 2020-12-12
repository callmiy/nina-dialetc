/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, cleanup } from "@testing-library/svelte";
import Shopping from "../components/shopping/shopping.svelte";
import {
  shoppingAddBrandLabelHelpId,
  shoppingAddBrandId,
  shoppingAddBranchId,
  shoppingAddBranchLabelHelpId,
  shoppingBrandNameInputId,
  shoppingBranchInputId,
  shoppingAddItemId,
  shoppingAddItemLabelHelpId,
  shoppingItemInputId,
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import mockBrand from "./mocks/brand.mock.svelte";
import mockBranch from "./mocks/branch.mock.svelte";
import mockShopItem from "./mocks/shop-item.mock.svelte";
import {
  ADD_SHOP_BRAND_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  ADD_SHOPPING_ITEM_LABEL_TEXT,
  ADD_SHOPPING_ITEM_LABEL_HELP_TEXT,
  EDIT_SHOPPING_ITEM_LABEL_TEXT,
  EDIT_SHOPPING_ITEM_LABEL_HELP_TEXT
} from "../components/shopping/shopping-utils";
import {
  brandSubmitValue1,
  branchSubmitVal1,
  shopItemVal,
} from "./mocks/mock-utils";

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

jest.mock("../components/lazies/shop-item.lazy", () => {
  return {
    getShopItemComponent: () => {
      return mockShopItem;
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("Shopping", () => {
  it(`changes brand/branch buttons labels and help texts`, async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // Add brand button label should have text 'Add'
    const addBrandEl = getById(shoppingAddBrandId);
    const addBrandHelpEl = getById(shoppingAddBrandLabelHelpId);
    expect(addBrandEl.textContent).toEqual(ADD_SHOP_BRAND_LABEL_TEXT);
    expect(addBrandHelpEl.textContent).toBe(ADD_SHOP_BRAND_LABEL_HELP_TEXT);

    // When add brand button is clicked
    await addBrandEl.click();

    // No brand should have been selected
    const brandNameInputEl = getById<HTMLSelectElement>(
      shoppingBrandNameInputId
    );
    expect(brandNameInputEl.value).toBe("");

    // When a brand is submitted
    const brandEl = getById("brand-submit-1");
    await brandEl.click();

    // Submitted brand should be selected
    expect(brandNameInputEl.value).toBe(brandSubmitValue1.id);

    // Thee should be two brand name options to select from
    const brandOptionsEls = brandNameInputEl.querySelectorAll("option");
    expect(brandOptionsEls.length).toBe(2);

    // First brand option should be empty
    expect((brandOptionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Brand button's label have text 'edit'
    expect(addBrandEl.textContent).toEqual(EDIT_SHOP_BRAND_LABEL_TEXT);
    expect(addBrandHelpEl.textContent).toBe(EDIT_SHOP_BRAND_LABEL_HELP_TEXT);

    // Add branch button label should have text 'Add'
    const addBranchEl = getById(shoppingAddBranchId);
    const addBranchHelpEl = getById(shoppingAddBranchLabelHelpId);
    expect(addBranchEl.textContent).toEqual(ADD_SHOP_BRANCH_LABEL_TEXT);
    expect(addBranchHelpEl.textContent).toBe(ADD_SHOP_BRANCH_LABEL_HELP_TEXT);

    // When add branch button is clicked
    await addBranchEl.click();

    // No brand should have been selected
    const branchNameInputEl = getById<HTMLSelectElement>(shoppingBranchInputId);
    expect(branchNameInputEl.value).toBe("");

    // When a branch is submitted
    const branchEl = getById("branch-submit-1");
    await branchEl.click();

    // Submitted brand should be selected
    expect(branchNameInputEl.value).toBe(branchSubmitVal1.id);

    // Thee should be two brand name options to select from
    const branchOptionsEls = branchNameInputEl.querySelectorAll("option");
    expect(branchOptionsEls.length).toBe(2);

    // First brand option should be empty
    expect((branchOptionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Add brand button's label have text 'edit'
    expect(addBranchEl.textContent).toEqual(EDIT_SHOP_BRANCH_LABEL_TEXT);
    expect(addBranchHelpEl.textContent).toBe(EDIT_SHOP_BRANCH_LABEL_HELP_TEXT);
  });

  it("changes shopping item buttons labels and help texts", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);
    // Add brand button label should have text 'Add'
    const addEl = getById(shoppingAddItemId);
    const addHelpEl = getById(shoppingAddItemLabelHelpId);
    expect(addEl.textContent).toEqual(ADD_SHOPPING_ITEM_LABEL_TEXT);
    expect(addHelpEl.textContent).toBe(ADD_SHOPPING_ITEM_LABEL_HELP_TEXT);

    // When add brand button is clicked
    await addEl.click();

    // No brand should have been selected
    const itemInputEl = getById<HTMLSelectElement>(shoppingItemInputId);
    expect(itemInputEl.value).toBe("");

    // When an item is submitted
    const itemEl = getById("item-submit-1");
    await itemEl.click();

    // Submitted brand should be selected
    expect(itemInputEl.value).toBe(shopItemVal.id);

    // Thee should be two brand name options to select from
    const optionsEls = itemInputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First brand option should be empty
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Brand button's label have text 'edit'
    expect(addEl.textContent).toEqual(EDIT_SHOPPING_ITEM_LABEL_TEXT);
    expect(addHelpEl.textContent).toBe(EDIT_SHOPPING_ITEM_LABEL_HELP_TEXT);
  });
});
