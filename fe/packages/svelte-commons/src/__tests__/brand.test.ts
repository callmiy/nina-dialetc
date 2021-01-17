/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { InMemoryCache } from "@apollo/client/core";
import { Props } from "@ta/cm/src/components/brand-utils";
import {
  COUNTRIES_LOADING_MSG,
  CURRENCIES_LOADING_MSG,
  IS_ACTIVE_CLASS_NAME,
} from "@ta/cm/src/constants";
import { newUlid } from "@ta/cm/src/db/ulid-uuid";
import { ListCountriesAndCurrencies } from "@ta/cm/src/gql/ops-types";
import {
  brandCountryInputDomId,
  brandCountryMsgDomId,
  brandCountryInputFieldId,
  brandCurrencyInputDomId,
  brandCurrencyMsgDomId,
  brandDomId,
  brandNameErrorDomId,
  brandNameInputDomId,
  brandNotificationTextCloseId,
  brandPhoneInputDomId,
  brandSubmitId,
  ERROR_NOTIFICATION_CLASS_NAME,
  resetFormBtnId,
  WARNING_NOTIFICATION_CLASS_NAME,
} from "@ta/cm/src/selectors";
import { NinaGlobals } from "@ta/cm/src/types";
import {
  eurCcy1,
  franceCountry1,
  germanyCountry1,
  mockBrandValue1,
} from "@ta/cm/src/__tests__/mock-data";
import { getMswListCountriesAndCurrencies } from "@ta/cm/src/__tests__/msw-handlers";
import { mswServer } from "@ta/cm/src/__tests__/msw-server";
import { waitForCount } from "@ta/cm/src/__tests__/pure-utils";
import {
  fillFieldChange,
  fillFieldInput,
  getById,
} from "@ta/cm/src/__tests__/utils-dom";
import { cleanup, render, waitFor } from "@testing-library/svelte";
import Brand from "../components/brand/brand.svelte";
import { resetCountriesCurrenciesStore } from "../stores/get-countries-and-currencies.store";

const nina = {
  // logApolloQueries: true,
} as NinaGlobals;

window.____nina = nina;

jest.mock("@ta/cm/src/db/ulid-uuid");
const mockNewUlid = newUlid as jest.Mock;

describe("Brand svelte", () => {
  beforeAll(() => {
    mswServer.listen();
  });

  beforeEach(() => {
    nina.cache = new InMemoryCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    resetCountriesCurrenciesStore();
    mswServer.resetHandlers();
    delete nina.cache;
    delete nina.client;
  });

  afterAll(() => {
    mswServer.close();
    delete (window as any).____nina;
  });

  const validName = "Edeka";
  const phoneNum = "123";

  describe("create", () => {
    it(`reset form /
    submit empty form`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [
              {
                node: germanyCountry1,
              },
              {
                node: franceCountry1,
              },
            ],
          },
          listCurrencies: [eurCcy1],
        } as ListCountriesAndCurrencies)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug, container } = render(Brand, {
        props: {
          isActive: true,
          onSubmit: undefined,
        },
      });

      await waitForData();
      const countryInputEl = getById<HTMLSelectElement>(brandCountryInputDomId);

      // When form is completed
      const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
      await fillFieldInput(nameInputEl, ""); // just to let fetched data resolve
      await fillFieldInput(nameInputEl, "a");
      expect(nameInputEl.value).toBe("a");

      await fillFieldChange(countryInputEl, "co1");
      expect(countryInputEl.value).toBe("co1");

      const currencyInputEl = getById<HTMLInputElement>(
        brandCurrencyInputDomId
      );
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
      const submitEl = getById(brandSubmitId);
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
      container.querySelectorAll("fieldset").forEach((f) => {
        expect((f as HTMLFieldSetElement).disabled).toBe(false);
      });
    });

    it(`currencies and countries loading`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [] as any,
          },
          listCurrencies: [] as any,
        } as ListCountriesAndCurrencies)
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug, container } = render(Brand, {
        props: {
          onSubmit: undefined,
        },
      });

      // Country field should indicate loading
      const countryLoadingEl = getById(brandCountryMsgDomId);
      expect(countryLoadingEl.textContent).toBe(COUNTRIES_LOADING_MSG);

      // Currency field error should indicate loading
      const currencyLoadingEl = getById(brandCurrencyMsgDomId);
      expect(currencyLoadingEl.textContent).toBe(CURRENCIES_LOADING_MSG);

      // The form should be disabled
      container.querySelectorAll("fieldset").forEach((f) => {
        expect((f as HTMLFieldSetElement).disabled).toBe(true);
      });
    });

    it(`brand name too short /
      currency and country empty /
      close error notification`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [
              // {
              //   node: germanyCountry1,
              // },
              // {
              //   node: franceCountry1,
              // },
            ] as any,
          },
          listCurrencies: [eurCcy1],
        } as ListCountriesAndCurrencies)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Brand, {
        props: {
          onSubmit: undefined,
        },
      });

      await waitForData();

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
      const submitEl = getById(brandSubmitId);
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

    it(`submits correct form data /
      nullable fields returned as null when cleared`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [
              {
                node: germanyCountry1,
              },
              {
                node: franceCountry1,
              },
            ],
          },
          listCurrencies: [eurCcy1],
        } as ListCountriesAndCurrencies)
      );
      mockNewUlid.mockReturnValue(1);
      const mockOnSubmit = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Brand, {
        props: {
          onSubmit: mockOnSubmit as any,
        },
      });

      await waitForData();

      // When form is completed with valid data
      const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
      const untrimmedName = validName + "   ";
      await fillFieldInput(nameInputEl, untrimmedName);

      const countryInputEl = getById<HTMLSelectElement>(brandCountryInputDomId);
      await fillFieldChange(countryInputEl, germanyCountry1.id);

      const currencyInputEl = getById<HTMLInputElement>(
        brandCurrencyInputDomId
      );
      await fillFieldChange(currencyInputEl, eurCcy1.id);

      const phoneInputEl = getById<HTMLInputElement>(brandPhoneInputDomId);
      const untrimmedPhone = phoneNum + "    ";
      await fillFieldInput(phoneInputEl, untrimmedPhone);

      // submit should not have been called
      expect(mockOnSubmit).not.toBeCalled();

      // When we submit form
      const submitEl = getById(brandSubmitId);
      await submitEl.click();

      // Brand name field error should not be visible
      expect(getById(brandNameErrorDomId)).toBeNull();

      // Country field error should not be visible
      expect(getById(brandCountryMsgDomId)).toBeNull();

      // Currency field error should not be visible
      expect(getById(brandCurrencyMsgDomId)).toBeNull();

      // General form error should not be visible
      expect(getById(brandNotificationTextCloseId)).toBeNull();

      // form data should be passed to parent
      const submittedData = {
        id: 1,
        name: validName,
        countryId: germanyCountry1.id,
        currencyId: eurCcy1.id,
        phone: phoneNum,
      };

      expect(mockOnSubmit).toBeCalledWith(submittedData);

      // when phone number field is cleared
      await fillFieldInput(phoneInputEl, "");

      // when form is submitted
      mockOnSubmit.mockReset();
      await submitEl.click();

      // form data should be passed to parent with nullable fields set to null
      expect(mockOnSubmit).toBeCalledWith({
        ...submittedData,
        phone: null,
      });
    });
  });

  describe("edit", () => {
    it(`warns if unedited form is submitted /
        ensures form is pre-populated with data to edit`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [
              {
                node: germanyCountry1,
              },
              {
                node: franceCountry1,
              },
            ],
          },
          listCurrencies: [eurCcy1],
        } as ListCountriesAndCurrencies)
      );

      const mockOnSubmit = jest.fn();

      const name = mockBrandValue1.name + "   ";
      const phone = mockBrandValue1.phone + "  ";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug, container } = render(Brand, {
        props: {
          isActive: true,
          onSubmit: mockOnSubmit as any,
          brand: {
            ...mockBrandValue1,
          },
        } as Props,
      });

      await waitForData();

      // There should be no notification UI
      expect(getById(brandNotificationTextCloseId)).toBeNull();

      // name input's value should equal data we are editing
      const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
      expect(nameInputEl.value).toBe(mockBrandValue1.name);
      await fillFieldInput(nameInputEl, name);

      // country input's value should equal data we are editing
      const countryInputEl = getById<HTMLSelectElement>(brandCountryInputDomId);
      expect(countryInputEl.value).toBe(mockBrandValue1.countryId);

      // currency input's value should equal data we are editing
      const currencyInputEl = getById<HTMLSelectElement>(
        brandCurrencyInputDomId
      );
      expect(currencyInputEl.value).toBe(eurCcy1.id);

      // phone input's value should equal data we are editing
      const phoneInputEl = getById<HTMLInputElement>(brandPhoneInputDomId);
      expect(phoneInputEl.value).toBe(mockBrandValue1.phone);
      fillFieldInput(phoneInputEl, phone);

      // when form submitted
      const submitEl = getById(brandSubmitId);
      expect(mockOnSubmit).not.toBeCalled();
      await submitEl.click();

      // There should be notification UI
      expect(getById(brandNotificationTextCloseId)).not.toBeNull();
    });

    it(`submits valid form /
        returns null for nullable fields when cleared /
        resets form`, async () => {
      mswServer.use(
        getMswListCountriesAndCurrencies({
          listCountries: {
            edges: [
              {
                node: germanyCountry1,
              },
              {
                node: franceCountry1,
              },
            ],
          },
          listCurrencies: [eurCcy1],
        } as ListCountriesAndCurrencies)
      );

      const mockOnSubmit = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug, container } = render(Brand, {
        props: {
          isActive: true,
          onSubmit: mockOnSubmit as any,
          brand: {
            ...mockBrandValue1,
          },
        } as Props,
      });

      await waitForData();
      const countryInputEl = getById<HTMLSelectElement>(brandCountryInputDomId);

      // when form is updated
      await fillFieldChange(countryInputEl, franceCountry1.id);

      const nameInputEl = getById<HTMLInputElement>(brandNameInputDomId);
      await fillFieldInput(nameInputEl, validName);

      const phoneInputEl = getById<HTMLInputElement>(brandPhoneInputDomId);
      fillFieldInput(phoneInputEl, phoneNum);

      // when form submitted
      const submitEl = getById(brandSubmitId);
      expect(mockOnSubmit).not.toBeCalled();
      await submitEl.click();

      // form data should be passed to parent
      const submittedData = {
        ...mockBrandValue1,
        name: validName,
        countryId: franceCountry1.id,
        currencyId: eurCcy1.id,
        phone: phoneNum,
      };

      expect(mockOnSubmit).toBeCalledWith(submittedData);

      // when phone number field is cleared
      await fillFieldInput(phoneInputEl, "");

      // when form is submitted
      mockOnSubmit.mockReset();
      await submitEl.click();

      // form data should be passed to parent with nullable fields set to null
      expect(mockOnSubmit).toBeCalledWith({
        ...submittedData,
        phone: null,
      });

      // ====================================================
      // RESET
      // ====================================================

      expect(nameInputEl.value).not.toBe(mockBrandValue1.name);
      expect(phoneInputEl.value).not.toBe(mockBrandValue1.phone);
      expect(countryInputEl.value).not.toBe(mockBrandValue1.countryId);

      // When reset button is clicked
      mockOnSubmit.mockReset();
      await getById(resetFormBtnId).click();

      // There should be no notification UI
      expect(getById(brandNotificationTextCloseId)).toBeNull();

      // When form submitted
      await submitEl.click();

      // There should be notification UI
      expect(getById(brandNotificationTextCloseId)).not.toBeNull();

      // Form should not be submitted because of errors
      expect(mockOnSubmit).not.toBeCalled();

      // Form should be reset
      expect(nameInputEl.value).toBe(mockBrandValue1.name);
      expect(phoneInputEl.value).toBe(mockBrandValue1.phone);
      expect(countryInputEl.value).toBe(mockBrandValue1.countryId);
    });
  });
});

async function waitForData(elm?: HTMLElement) {
  const el = elm || getById(brandCountryMsgDomId);
  const parent = getById(brandCountryInputFieldId);

  await waitForCount(async () => {
    const x = await waitFor(() => {
      return !parent.contains(el);
    });

    return x;
  });
}
