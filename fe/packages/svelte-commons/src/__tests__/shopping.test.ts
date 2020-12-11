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
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import mockBrand from "./mocks/brand.mock.svelte";
import mockBranch from "./mocks/branch.mock.svelte";
import {
  ADD_SHOP_BRAND_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
} from "../components/shopping/shopping-utils";
import { brandSubmitValue1, branchSubmitVal1 } from "./mocks/mock-utils";

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
});
