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
  shoppingBrandInputId,
  shoppingBranchInputId,
  shoppingAddArticleId,
  shoppingAddArticleLabelHelpId,
  shoppingArticleInputId,
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import mockBrand from "./mocks/brand.mock.svelte";
import mockBranch from "./mocks/branch.mock.svelte";
import mockArticle from "./mocks/article.mock.svelte";
import {
  ADD_SHOP_BRAND_LABEL_TEXT,
  ADD_SHOP_BRAND_LABEL_HELP_TEXT,
  EDIT_SHOP_BRAND_LABEL_TEXT,
  EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
  ADD_SHOP_BRANCH_LABEL_TEXT,
  ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
  EDIT_SHOP_BRANCH_LABEL_TEXT,
  EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  ADD_ARTICLE_LABEL_TEXT,
  ADD_ARTICLE_LABEL_HELP_TEXT,
  EDIT_ARTICLE_LABEL_TEXT,
  EDIT_ARTICLE_LABEL_HELP_TEXT,
} from "../components/shopping/shopping-utils";
import {
  brandSubmitValue1,
  branchSubmitVal1,
  articleVal,
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

jest.mock("../components/lazies/article.lazy", () => {
  return {
    getArticleComponent: () => {
      return mockArticle;
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("Component", () => {
  it(`changes brand/branch buttons labels and help texts`, async () => {
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
    expect(inputEl.value).toBe(branchSubmitVal1.id);

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
});
