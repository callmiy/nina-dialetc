/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import {
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  ADD_SHOP_BRAND_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
} from "@ta/cm/src/components/shopping-utils";
import {
  shoppingAddBranchId,
  shoppingAddBranchLabelHelpId,
  shoppingAddBrandId,
  shoppingAddBrandLabelHelpId,
  shoppingBranchInputId,
  shoppingBrandInputId,
} from "@ta/cm/src/selectors";
import {
  mockBranchValue1,
  mockBrandValue1,
} from "@ta/cm/src/__tests__/mock-data";
import { mswServer } from "@ta/cm/src/__tests__/msw-server";
import { waitForCount } from "@ta/cm/src/__tests__/pure-utils";
import {
  fillFieldChange,
  fillFieldInput,
  getById,
} from "@ta/cm/src/__tests__/utils-dom";
import { cleanup, render, waitFor } from "@testing-library/svelte";
import Shopping from "../components/shopping/shopping.svelte";
import { resetBranchesStore } from "../stores/get-branches.store";
import mockArticle from "./mocks/article.mock.svelte";
import mockBranch from "./mocks/branch.mock.svelte";
import mockBrand from "./mocks/brand.mock.svelte";
import {
  mockBranchCityInput,
  mockBranchSubmitId,
  mockBrandNameInput,
  mockBrandSubmitId,
} from "./mocks/selectors";

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
jest.mock("../components/lazies/article.lazy", () => {
  return {
    getArticleComponent: () => {
      return mockArticle;
    },
  };
});

describe("Shopping.svelte edit", () => {
  beforeAll(() => {
    mswServer.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    mswServer.resetHandlers();
    cleanup();
    resetBranchesStore();
  });

  afterAll(() => {
    mswServer.close();
  });

  it(`edit brand
       submit unedited form
       submit valid form
       make nullable fields null`, async () => {
    const { id: mockId, name: mockName } = mockBrandValue1;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // There should be two options for user to select from
    const inputEl = getById<HTMLSelectElement>(shoppingBrandInputId);

    const optionEl2 = await waitForCount(async () => {
      return await waitFor(() => {
        return inputEl.querySelector(
          `option[value="${mockId}"]`
        ) as HTMLOptionElement;
      });
    }, 10);

    const optionsEls = inputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First option must be the empty option
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // add/edit brand element must have empty value
    expect(inputEl.value).toBe("");

    // Second option must be the fetched brand data
    expect(optionsEls.item(1)).toBe(optionEl2);

    // and must be brand name
    expect(optionEl2.textContent).toContain(mockName);

    // Add brand button label should have text 'Add'
    const addOrEditEl = getById(shoppingAddBrandId);
    const helpEl = getById(shoppingAddBrandLabelHelpId);
    expect(addOrEditEl.textContent).toEqual(ADD_SHOP_BRAND_LABEL_TEXT);
    expect(helpEl.textContent).toBe(ADD_SHOP_BRAND_LABEL_HELP_TEXT);

    // When we select data from dropdown
    await fillFieldChange(inputEl, mockId);

    // selected brand input should be fetched data
    expect(inputEl.value).toBe(mockId);

    // and we should not see brand UI
    expect(getById(mockBranchCityInput)).toBeNull();

    // Add brand button's label should have text 'edit'
    expect(addOrEditEl.textContent).toEqual(EDIT_SHOP_BRAND_LABEL_TEXT);
    expect(helpEl.textContent).toBe(EDIT_SHOP_BRAND_LABEL_HELP_TEXT);

    // when we click 'edit' brand button
    await addOrEditEl.click();

    // we should see brand ui
    const nameInput = getById<HTMLInputElement>(mockBrandNameInput);

    // brand UI name value should be fetched data
    expect(nameInput.value).toBe(mockName);

    const updatedName = "new";

    // When we update name
    await fillFieldInput(nameInput, updatedName);

    // brand UI name value should be updated
    expect(nameInput.value).toBe(updatedName);

    // when updated brand data is submitted
    await getById(mockBrandSubmitId).click();

    // Submitted brand should be selected
    expect(inputEl.value).toBe(mockBrandValue1.id);

    // and selected option text must not contain name of fetched data
    expect(optionEl2.textContent).not.toContain(mockName);

    // but must contain updated name
    expect(optionEl2.textContent).toContain(updatedName);
  });

  it("edits branch", async () => {
    const { id: mockId, city: mockCity } = mockBranchValue1;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // There should be two options for user to select from
    const inputEl = getById<HTMLSelectElement>(shoppingBranchInputId);

    const optionEl2 = await waitForCount(async () => {
      return await waitFor(() => {
        return inputEl.querySelector(
          `option[value="${mockId}"]`
        ) as HTMLOptionElement;
      });
    }, 10);

    const optionsEls = inputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First option must be the empty option
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // And shop branch input must have empty value
    expect(inputEl.value).toBe("");

    // add/edit branch element must have empty value
    expect(inputEl.value).toBe("");

    // Second option must be the fetched branch data
    expect(optionsEls.item(1)).toBe(optionEl2);

    // and must have city of fetched data as part of it's text
    expect(optionEl2.textContent).toContain(mockCity);

    // Add branch button label should have text 'Add'
    const addOrEditEl = getById(shoppingAddBranchId);
    const helpEl = getById(shoppingAddBranchLabelHelpId);
    expect(addOrEditEl.textContent).toEqual(ADD_SHOP_BRANCH_LABEL_TEXT);
    expect(helpEl.textContent).toBe(ADD_SHOP_BRANCH_LABEL_HELP_TEXT);

    // When we select data from dropdown
    await fillFieldChange(inputEl, mockId);

    // shop branch input should be fetch data
    expect(inputEl.value).toBe(mockId);

    // and we should not see branch UI
    expect(getById(mockBranchCityInput)).toBeNull();

    // Add branch button's label should have text 'edit'
    expect(addOrEditEl.textContent).toEqual(EDIT_SHOP_BRANCH_LABEL_TEXT);
    expect(helpEl.textContent).toBe(EDIT_SHOP_BRANCH_LABEL_HELP_TEXT);

    // when we click 'edit' branch button
    await addOrEditEl.click();

    // we should see branch ui
    const branchCityInput = getById<HTMLInputElement>(mockBranchCityInput);

    // branch UI city value should be fetched data
    expect(branchCityInput.value).toBe(mockCity);

    const updatedCity = "new";

    // When we update city
    await fillFieldInput(branchCityInput, updatedCity);

    // branch UI city value should be updated
    expect(branchCityInput.value).toBe(updatedCity);

    // when updated branch data is submitted
    await getById(mockBranchSubmitId).click();

    // Submitted branch should be selected
    expect(inputEl.value).toBe(mockBranchValue1.id);

    // and selected option text must not contain city of fetched data
    expect(optionEl2.textContent).not.toContain(mockCity);

    // but must contain updated city
    expect(optionEl2.textContent).toContain(updatedCity);
  });
});
