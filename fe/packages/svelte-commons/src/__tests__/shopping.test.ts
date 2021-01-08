/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import {
  ADD_ARTICLE_LABEL_HELP_TEXT,
  ADD_ARTICLE_LABEL_TEXT,
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  ADD_SHOP_BRAND_LABEL_TEXT,
  EDIT_ARTICLE_LABEL_HELP_TEXT,
  EDIT_ARTICLE_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
} from "@ta/cm/src/components/shopping-utils";
import { ListBranches_listBranches } from "@ta/cm/src/gql/ops-types";
import {
  shoppingAddArticleId,
  shoppingAddArticleLabelHelpId,
  shoppingAddBranchId,
  shoppingAddBranchLabelHelpId,
  shoppingAddBrandId,
  shoppingAddBrandLabelHelpId,
  shoppingArticleInputId,
  shoppingBranchInputId,
  shoppingBrandInputId,
} from "@ta/cm/src/selectors";
import { mockBranchValue1 } from "@ta/cm/src/__tests__/mock-data";
import { makeListBranchesHandler } from "@ta/cm/src/__tests__/msw-handlers";
import { mswServer } from "@ta/cm/src/__tests__/msw-server";
import { waitForCount } from "@ta/cm/src/__tests__/pure-utils";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import { cleanup, render, waitFor } from "@testing-library/svelte";
import Shopping from "../components/shopping/shopping.svelte";
import { resetBranchesStore } from "../stores/get-branches.store";
import mockArticle from "./mocks/article.mock.svelte";
import mockBranch from "./mocks/branch.mock.svelte";
import mockBrand from "./mocks/brand.mock.svelte";
import { articleVal, brandSubmitValue1 } from "./mocks/mock-utils";

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

describe("Shopping svelte", () => {
  beforeAll(() => {
    mswServer.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    mswServer.resetHandlers();
    resetBranchesStore();
  });

  afterAll(() => {
    mswServer.close();
  });

  it(`changes brand buttons labels and help texts`, async () => {
    mswServer.use(
      makeListBranchesHandler({
        edges: [] as any,
      } as ListBranches_listBranches)
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // Add brand button label should have text 'Add'
    const addEl = getById(shoppingAddBrandId);
    const helpEl = getById(shoppingAddBrandLabelHelpId);
    expect(addEl.textContent).toEqual(ADD_SHOP_BRAND_LABEL_TEXT);
    expect(helpEl.textContent).toBe(ADD_SHOP_BRAND_LABEL_HELP_TEXT);

    // When add brand button is clicked
    await addEl.click();

    // No brand should have been selected
    const inputEl = getById<HTMLSelectElement>(shoppingBrandInputId);
    expect(inputEl.value).toBe("");

    // When a brand is submitted
    const brandEl = getById("brand-submit-1");
    await brandEl.click();

    // Submitted brand should be selected
    expect(inputEl.value).toBe(brandSubmitValue1.id);

    // Thee should be two brand name options to select from
    const optionsEls = inputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First brand option should be empty
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Brand button's label have text 'edit'
    expect(addEl.textContent).toEqual(EDIT_SHOP_BRAND_LABEL_TEXT);
    expect(helpEl.textContent).toBe(EDIT_SHOP_BRAND_LABEL_HELP_TEXT);
  });

  it("changes branch button label and help text", async () => {
    mswServer.use(
      makeListBranchesHandler({
        edges: [] as any,
      } as ListBranches_listBranches)
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // Add branch button label should have text 'Add'
    const addEl = getById(shoppingAddBranchId);
    const helpEl = getById(shoppingAddBranchLabelHelpId);
    expect(addEl.textContent).toEqual(ADD_SHOP_BRANCH_LABEL_TEXT);
    expect(helpEl.textContent).toBe(ADD_SHOP_BRANCH_LABEL_HELP_TEXT);

    // When add branch button is clicked
    await addEl.click();

    // No brand should have been selected
    const inputEl = getById<HTMLSelectElement>(shoppingBranchInputId);
    expect(inputEl.value).toBe("");

    // When a branch is submitted
    const branchEl = getById("branch-submit-1");
    await branchEl.click();

    // Submitted brand should be selected
    expect(inputEl.value).toBe(mockBranchValue1.id);

    // Thee should be two brand name options to select from
    const optionsEls = inputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First brand option should be empty
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Add brand button's label have text 'edit'
    expect(addEl.textContent).toEqual(EDIT_SHOP_BRANCH_LABEL_TEXT);
    expect(helpEl.textContent).toBe(EDIT_SHOP_BRANCH_LABEL_HELP_TEXT);
  });

  it("changes article label and help texts", async () => {
    mswServer.use(
      makeListBranchesHandler({
        edges: [] as any,
      } as ListBranches_listBranches)
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);
    // Add brand button label should have text 'Add'
    const addEl = getById(shoppingAddArticleId);
    const addHelpEl = getById(shoppingAddArticleLabelHelpId);
    expect(addEl.textContent).toEqual(ADD_ARTICLE_LABEL_TEXT);
    expect(addHelpEl.textContent).toBe(ADD_ARTICLE_LABEL_HELP_TEXT);

    // When add brand button is clicked
    await addEl.click();

    // No brand should have been selected
    const itemInputEl = getById<HTMLSelectElement>(shoppingArticleInputId);
    expect(itemInputEl.value).toBe("");

    // When an article is submitted
    const articleEl = getById("article-submit-1");
    await articleEl.click();

    // Submitted brand should be selected
    expect(itemInputEl.value).toBe(articleVal.id);

    // Thee should be two brand name options to select from
    const optionsEls = itemInputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First brand option should be empty
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Brand button's label have text 'edit'
    expect(addEl.textContent).toEqual(EDIT_ARTICLE_LABEL_TEXT);
    expect(addHelpEl.textContent).toBe(EDIT_ARTICLE_LABEL_HELP_TEXT);
  });

  it("edits branch", async () => {
    mswServer.use(
      makeListBranchesHandler({
        edges: [
          {
            node: mockBranchValue1,
          },
        ],
      } as ListBranches_listBranches)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Shopping);

    // There should be two options for user to select from
    const inputEl = getById<HTMLSelectElement>(shoppingBranchInputId);

    const optionEl2 = await waitForCount(async () => {
      return await waitFor(() => {
        return inputEl.querySelector(
          `option[value="${mockBranchValue1.id}"]`
        ) as HTMLOptionElement;
      });
    }, 10);

    const optionsEls = inputEl.querySelectorAll("option");
    expect(optionsEls.length).toBe(2);

    // First option must be the empty option
    expect((optionsEls.item(0) as HTMLOptionElement).value).toBe("");

    // Second option must be the fetched branch data
    expect(optionsEls.item(1)).toBe(optionEl2);
  });
});
