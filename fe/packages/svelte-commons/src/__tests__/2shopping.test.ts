/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import {
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
} from "@ta/cm/src/components/shopping-utils";
import { ListBranches_listBranches } from "@ta/cm/src/gql/ops-types";
import {
  shoppingAddBranchId,
  shoppingAddBranchLabelHelpId,
  shoppingBranchInputId,
} from "@ta/cm/src/selectors";
import { mockBranchValue1 } from "@ta/cm/src/__tests__/mock-data";
import { makeListBranchesHandler } from "@ta/cm/src/__tests__/msw-handlers";
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
import { mockBranchCityInput, mockBranchSubmitId } from "./mocks/selectors";

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

  it("edits branch", async () => {
    const { id: mockId, city: mockCity } = mockBranchValue1;

    // mswServer.use(
    //   makeListBranchesHandler({
    //     edges: [
    //       {
    //         node: mockBranchValue1,
    //       },
    //     ],
    //   } as ListBranches_listBranches)
    // );

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
