import { render, waitFor } from "@testing-library/svelte";
import ShopBrand from "../ShopBrand/ShopBrand.svelte";
import {
  shopBrandNameInputDomId,
  shopBrandNameErrorDomId,
  shopBrandDomId,
  resetFormBtnId,
  shopBrandCountryInputDomId,
  shopBrandCountryErrorDomId,
  shopBrandCurrencyInputDomId,
  shopBrandCurrencyErrorDomId,
  shopBrandPhoneInputDomId,
  simpleTextErrorCloseId,
  submitId,
} from "@ta/cm/src/shop-brand-dom";
import { fillField } from "./test_utils";
import { IS_ACTIVE_CLASS_NAME } from "@ta/cm/src/utils";
import { makeApolloClient } from "@ta/cm/src/apollo/client";

jest.mock("@ta/cm/src/apollo/client");
const mockApolloQueryFn = jest.fn();
const mockMakeApolloClient = makeApolloClient as jest.Mock;

jest.mock("@ta/cm/src/gql/queries");

beforeEach(() => {
  mockMakeApolloClient.mockReturnValue({
    query: mockApolloQueryFn,
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

it(`reset form /
    submit empty form`, async () => {
  mockApolloQueryFn.mockResolvedValue({
    data: {
      listCountries: [
        {
          id: "a",
          country_name: "Germany",
        },
        {
          id: "b",
          country_name: "France",
        },
      ],
      listCurrencies: [
        {
          id: "c",
          currency_name: "Euro",
          currency_code: "EUR",
        },
      ],
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debug } = render(ShopBrand, {
    props: {
      isActive: true,
    },
  });

  // Wait for countries and currencies data to resolve
  await waitFor(() => true);

  // When form is completed
  const nameInputEl = getById<HTMLInputElement>(shopBrandNameInputDomId);
  await fillField(nameInputEl, "a");
  expect(nameInputEl.value).toBe("a");

  const countryInputEl = getById<HTMLInputElement>(shopBrandCountryInputDomId);
  await fillField(countryInputEl, "a");
  expect(countryInputEl.value).toBe("a");

  const currencyInputEl = getById<HTMLInputElement>(
    shopBrandCurrencyInputDomId
  );
  await fillField(currencyInputEl, "c");
  expect(currencyInputEl.value).toBe("c");

  const phoneInputEl = getById<HTMLInputElement>(shopBrandPhoneInputDomId);
  await fillField(phoneInputEl, "a");
  expect(phoneInputEl.value).toBe("a");

  // When reset button is clicked
  const resetEl = getById(resetFormBtnId);
  await resetEl.click();

  // Form should be empty
  expect(nameInputEl.value).toBe("");
  expect(countryInputEl.value).toBe("");
  expect(currencyInputEl.value).toBe("");
  // expect(phoneInputEl.value).toBe("");

  // Warning notification that form empty should not visible
  expect(getById(simpleTextErrorCloseId)).toBeNull();

  // When empty form is submitted
  const submitEl = getById(submitId);
  await submitEl.click();

  // Warning notification is visible
  expect(getById(simpleTextErrorCloseId)).not.toBeNull();

  // When reset button is clicked
  await resetEl.click();

  // Warning notification should not visible
  expect(getById(simpleTextErrorCloseId)).toBeNull();
});

it(`country-currency fetch fails /
      brand name too short /
      currency and country empty /
      close error notification`, async () => {
  mockApolloQueryFn.mockResolvedValue(new Error("a"));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debug } = render(ShopBrand, {
    props: {},
  });

  // Wait for countries and currencies data to resolve
  await waitFor(() => true);

  // Component should always be active
  const componentEl = getById(shopBrandDomId);
  expect(componentEl.classList).toContain(IS_ACTIVE_CLASS_NAME);

  // When we fill shop brand name incorrectly (too short)
  const nameInputEl = getById<HTMLInputElement>(shopBrandNameInputDomId);
  await fillField(nameInputEl, "a");

  // Brand name field error should not be visible
  expect(getById(shopBrandNameErrorDomId)).toBeNull();

  // Country field error should not be visible
  expect(getById(shopBrandCountryErrorDomId)).toBeNull();

  // Currency field error should not be visible
  expect(getById(shopBrandCurrencyErrorDomId)).toBeNull();

  // General form error should not be visible
  expect(getById(simpleTextErrorCloseId)).toBeNull();

  const submitEl = getById(submitId);
  await submitEl.click();

  // Brand name field error should be visible (too short)
  expect(getById(shopBrandNameErrorDomId)).not.toBeNull();

  // Country field error should be visible (empty)
  expect(getById(shopBrandCountryErrorDomId)).not.toBeNull();

  // Currency field error should be visible (empty)
  expect(getById(shopBrandCurrencyErrorDomId)).not.toBeNull();
});

function getById<T extends HTMLElement = HTMLElement>(domId: string) {
  return document.getElementById(domId) as T;
}
