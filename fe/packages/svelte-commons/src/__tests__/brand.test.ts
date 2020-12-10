/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, waitFor, cleanup } from "@testing-library/svelte";
import ShopBrand from "../components/brand/brand.svelte";
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
  brandNotificationTextCloseId,
} from "@ta/cm/src/selectors";
import {
  fillFieldInput,
  getById,
  fillFieldChange,
} from "@ta/cm/src/__tests__/utils-dom";
import { IS_ACTIVE_CLASS_NAME } from "@ta/cm/src/constants";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/client";
import { ListCountriesAndCurrencies } from "@ta/cm/src/gql/ops-types";

jest.mock("@ta/cm/src/apollo/client");
const mockGetCountriesCurrencies = getCountriesCurrencies as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

describe("brand tests", () => {
  it(`reset form /
    submit empty form`, async () => {
    mockGetCountriesCurrencies.mockResolvedValue({
      listCountries: {
        edges: [
          {
            node: {
              id: "co1",
              countryName: "germany",
              countryCode: "de",
            },
          },

          {
            node: {
              id: "co2",
              countryName: "france",
              countryCode: "fr",
            },
          },
        ],
      },
      listCurrencies: [
        {
          id: "cur1",
          currencyName: "Euro",
          currencyCode: "EUR",
        },
      ],
    } as ListCountriesAndCurrencies);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopBrand, {
      props: {
        isActive: true,
        onSubmit: undefined,
      },
    });

    // Wait for countries and currencies data to resolve
    await waitFor(() => true);

    // When form is completed
    const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
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
    expect(getById(brandNotificationTextCloseId)).not.toBeNull();

    // When reset button is clicked
    await resetEl.click();

    // Warning notification should not visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();
  });

  it(`country-currency fetch fails /
      brand name too short /
      currency and country empty /
      close error notification`, async () => {
    mockGetCountriesCurrencies.mockResolvedValue({});

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopBrand, {
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
    await fillFieldInput(nameInputEl, "a");

    // Brand name field error should not be visible
    expect(getById(brandNameErrorDomId)).toBeNull();

    // Country field error should not be visible
    expect(getById(brandCountryErrorDomId)).toBeNull();

    // Currency field error should not be visible
    expect(getById(brandCurrencyErrorDomId)).toBeNull();

    // General form error should not be visible
    expect(getById(brandNotificationTextCloseId)).toBeNull();

    const submitEl = getById(submitBrandId);
    await submitEl.click();

    // Brand name field error should be visible (too short)
    expect(getById(brandNameErrorDomId)).not.toBeNull();

    // Country field error should be visible (empty)
    expect(getById(brandCountryErrorDomId)).not.toBeNull();

    // Currency field error should be visible (empty)
    expect(getById(brandCurrencyErrorDomId)).not.toBeNull();
  });
});
