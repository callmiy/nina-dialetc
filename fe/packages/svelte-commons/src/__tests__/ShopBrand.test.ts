import { render, waitFor } from "@testing-library/svelte";
import ShopBrand from "../ShopBrand/ShopBrand.svelte";
import {
  shopBrandNameInputDomId,
  shopBrandDomId,
  resetFormBtnId,
  shopBrandCountryInputDomId,
  shopBrandCurrencyInputDomId,
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

test(`reset form /
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

  // Component should always be active
  const componentEl = getById(shopBrandDomId);
  expect(componentEl.classList).toContain(IS_ACTIVE_CLASS_NAME);

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
  fillField(phoneInputEl, "aa");
  expect(phoneInputEl.value).toBe("aa");

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

function getById<T extends HTMLElement = HTMLElement>(domId: string) {
  return document.getElementById(domId) as T;
}
