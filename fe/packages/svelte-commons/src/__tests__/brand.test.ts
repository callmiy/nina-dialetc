import { render, waitFor } from "@testing-library/svelte";
import ShopBrand from "../components/brand.svelte";
import {
  brandNameInputDomId,
  brandNameErrorDomId,
  brandDomId,
  resetFormBtnId,
  brandCountryInputDomId,
  brandCountryErrorDomId,
  brandCurrencyInputDomId,
  brandCurrencyErrorDomId,
  brandPhoneInputDomId,
  submitBrandId,
  notificationTextCloseId,
} from "@ta/cm/src/selectors";
import { fillField } from "./test_utils";
import { IS_ACTIVE_CLASS_NAME } from "@ta/cm/src/utils";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/client";

jest.mock("@ta/cm/src/apollo/client");
const mockGetCountriesCurrencies = getCountriesCurrencies as jest.Mock;

jest.mock("@ta/cm/src/gql/queries");

afterEach(() => {
  jest.resetAllMocks();
});

it(`reset form /
    submit empty form`, async () => {
  mockGetCountriesCurrencies.mockResolvedValue({
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
  const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
  await fillField(nameInputEl, "a");
  expect(nameInputEl.value).toBe("a");

  const countryInputEl = getById<HTMLInputElement>(brandCountryInputDomId);
  await fillField(countryInputEl, "a");
  expect(countryInputEl.value).toBe("a");

  const currencyInputEl = getById<HTMLInputElement>(brandCurrencyInputDomId);
  await fillField(currencyInputEl, "c");
  expect(currencyInputEl.value).toBe("c");

  const phoneInputEl = getById<HTMLInputElement>(brandPhoneInputDomId);
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
  expect(getById(notificationTextCloseId)).toBeNull();

  // When empty form is submitted
  const submitEl = getById(submitBrandId);
  await submitEl.click();

  // Warning notification is visible
  expect(getById(notificationTextCloseId)).not.toBeNull();

  // When reset button is clicked
  await resetEl.click();

  // Warning notification should not visible
  expect(getById(notificationTextCloseId)).toBeNull();
});

it(`country-currency fetch fails /
      brand name too short /
      currency and country empty /
      close error notification`, async () => {
  mockGetCountriesCurrencies.mockResolvedValue(new Error("a"));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debug } = render(ShopBrand, {
    props: {},
  });

  // Wait for countries and currencies data to resolve
  await waitFor(() => true);

  // Component should always be active
  const componentEl = getById(brandDomId);
  expect(componentEl.classList).toContain(IS_ACTIVE_CLASS_NAME);

  // When we fill shop brand name incorrectly (too short)
  const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
  await fillField(nameInputEl, "a");

  // Brand name field error should not be visible
  expect(getById(brandNameErrorDomId)).toBeNull();

  // Country field error should not be visible
  expect(getById(brandCountryErrorDomId)).toBeNull();

  // Currency field error should not be visible
  expect(getById(brandCurrencyErrorDomId)).toBeNull();

  // General form error should not be visible
  expect(getById(notificationTextCloseId)).toBeNull();

  const submitEl = getById(submitBrandId);
  await submitEl.click();

  // Brand name field error should be visible (too short)
  expect(getById(brandNameErrorDomId)).not.toBeNull();

  // Country field error should be visible (empty)
  expect(getById(brandCountryErrorDomId)).not.toBeNull();

  // Currency field error should be visible (empty)
  expect(getById(brandCurrencyErrorDomId)).not.toBeNull();
});

function getById<T extends HTMLElement = HTMLElement>(domId: string) {
  return document.getElementById(domId) as T;
}
