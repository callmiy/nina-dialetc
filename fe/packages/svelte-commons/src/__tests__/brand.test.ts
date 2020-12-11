/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, waitFor, cleanup } from "@testing-library/svelte";
import Brand from "../components/brand/brand.svelte";
import {
  brandNameInputDomId,
  brandNameErrorDomId,
  brandDomId,
  resetFormBtnId,
  brandCountryInputDomId,
  brandCountryMsgDomId,
  brandCurrencyInputDomId,
  brandCurrencyMsgDomId,
  brandPhoneInputDomId,
  submitBrandId,
  brandNotificationTextCloseId,
  WARNING_NOTIFICATION_CLASS_NAME,
  ERROR_NOTIFICATION_CLASS_NAME,
} from "@ta/cm/src/selectors";
import {
  fillFieldInput,
  getById,
  fillFieldChange,
} from "@ta/cm/src/__tests__/utils-dom";
import {
  IS_ACTIVE_CLASS_NAME,
  StateValue,
  CURRENCIES_LOADING_MSG,
  COUNTRIES_LOADING_MSG,
} from "@ta/cm/src/constants";
import {
  getCountriesCurrencies,
  GetCountriesCurrencies,
} from "@ta/cm/src/apollo/apollo-utils";
import { resetCountriesCurrenciesStore } from "../stores/get-countries-and-currencies.store";

let mockId = 0;
jest.mock("@ta/cm/src/db/ulid-uuid", () => ({
  newUlid: () => ++mockId,
}));

jest.mock("@ta/cm/src/apollo/apollo-utils");
const mockGetCountriesCurrencies = getCountriesCurrencies as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  resetCountriesCurrenciesStore();
});

describe("brand tests", () => {
  const countriesCurrencies = [
    {
      value: StateValue.data,
      data: {
        countries: [
          {
            id: "co1",
            countryName: "germany",
            countryCode: "de",
          },

          {
            id: "co2",
            countryName: "france",
            countryCode: "fr",
          },
        ],
      },
    },
    {
      value: StateValue.data,
      data: {
        currencies: [
          {
            id: "cur1",
            currencyName: "Euro",
            currencyCode: "EUR",
          },
        ],
      },
    },
  ] as GetCountriesCurrencies;

  it(`reset form /
    submit empty form`, async () => {
    mockGetCountriesCurrencies.mockResolvedValue(countriesCurrencies);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug, container } = render(Brand, {
      props: {
        isActive: true,
        onSubmit: undefined,
      },
    });

    // Wait for countries and currencies data to resolve
    await waitFor(() => true); // not enough, see below!!

    // When form is completed
    const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
    await fillFieldInput(nameInputEl, ""); // just to let fetched data resolve
    await fillFieldInput(nameInputEl, "a");
    expect(nameInputEl.value).toBe("a");

    const countryInputEl = getById<HTMLInputElement>(brandCountryInputDomId);
    await fillFieldChange(countryInputEl, "co1");
    expect(countryInputEl.value).toBe("co1");

    const currencyInputEl = getById<HTMLInputElement>(brandCurrencyInputDomId);
    await fillFieldChange(currencyInputEl, "cur1");
    expect(currencyInputEl.value).toBe("cur1");

    const phoneInputEl = getById<HTMLInputElement>(brandPhoneInputDomId);
    await fillFieldInput(phoneInputEl, "a");
    expect(phoneInputEl.value).toBe("a");

    // When reset button is clicked
    const resetEl = getById(resetFormBtnId);
    await resetEl.click();

    // Form should be empty
    expect(nameInputEl.value).toBe("");
    expect(countryInputEl.value).toBe("");
    expect(currencyInputEl.value).toBe("");
    expect(phoneInputEl.value).toBe("");

    // Warning notification that form empty should not visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();

    // When empty form is submitted
    const submitEl = getById(submitBrandId);
    await submitEl.click();

    // Warning notification is visible
    const closeNotificationEl = getById(brandNotificationTextCloseId);
    const closeParentEl = closeNotificationEl.closest(
      `.${WARNING_NOTIFICATION_CLASS_NAME}`
    ) as HTMLElement;

    expect(closeParentEl.classList).not.toContain(
      ERROR_NOTIFICATION_CLASS_NAME
    );

    // When reset button is clicked
    await resetEl.click();

    // Warning notification should not visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();

    // The form should not be disabled
    const fieldsetEl = container.querySelector(
      "fieldset"
    ) as HTMLFieldSetElement;
    expect(fieldsetEl.disabled).toBe(false);
  });

  it(`currencies and countries loading`, async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug, container } = render(Brand, {
      props: {
        onSubmit: undefined,
      },
    });

    // Wait for countries and currencies data to resolve
    await waitFor(() => true);

    // Country field should indicate loading
    const countryLoadingEl = getById(brandCountryMsgDomId);
    expect(countryLoadingEl.textContent).toBe(COUNTRIES_LOADING_MSG);

    // Currency field error should indicate loading
    const currencyLoadingEl = getById(brandCurrencyMsgDomId);
    expect(currencyLoadingEl.textContent).toBe(CURRENCIES_LOADING_MSG);

    // The form should be disabled
    const fieldsetEl = container.querySelector(
      "fieldset"
    ) as HTMLFieldSetElement;
    expect(fieldsetEl.disabled).toBe(true);
  });

  it(`brand name too short /
      currency and country empty /
      close error notification`, async () => {
    mockGetCountriesCurrencies.mockResolvedValue(countriesCurrencies);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Brand, {
      props: {
        onSubmit: undefined,
      },
    });

    // Wait for countries and currencies data to resolve
    await waitFor(() => true);

    // Component should always be active
    const componentEl = getById(brandDomId);
    expect(componentEl.classList).toContain(IS_ACTIVE_CLASS_NAME);

    // When we fill shop brand name incorrectly (too short)
    const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
    await fillFieldInput(nameInputEl, ""); // just to let fetched data resolve
    await fillFieldInput(nameInputEl, "a");

    // Brand name field error should not be visible
    expect(getById(brandNameErrorDomId)).toBeNull();

    // Country field error should not be visible
    expect(getById(brandCountryMsgDomId)).toBeNull();

    // Currency field error should not be visible
    expect(getById(brandCurrencyMsgDomId)).toBeNull();

    // General form error should not be visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();

    // When we submit form
    const submitEl = getById(submitBrandId);
    await submitEl.click();

    // Brand name field error should be visible (too short)
    expect(getById(brandNameErrorDomId)).not.toBeNull();

    // Country field error should be visible (empty)
    expect(getById(brandCountryMsgDomId)).not.toBeNull();

    // Currency field error should be visible (empty)
    expect(getById(brandCurrencyMsgDomId)).not.toBeNull();

    // General form error should be visible
    const closeNotificationEl = getById(brandNotificationTextCloseId);
    const closeParentEl = closeNotificationEl.closest(
      `.${ERROR_NOTIFICATION_CLASS_NAME}`
    ) as HTMLElement;

    expect(closeParentEl.classList).not.toContain(
      WARNING_NOTIFICATION_CLASS_NAME
    );

    // When notification is closed
    await closeNotificationEl.click();

    // General form error should not be visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();
  });
});
