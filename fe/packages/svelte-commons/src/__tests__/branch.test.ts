/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { Props } from "@ta/cm/src/components/branch-utils";
import { newUlid } from "@ta/cm/src/db/ulid-uuid";
import {
  branchAliasInputId,
  branchCityErrorId,
  branchCityInputId,
  branchNotificationTextCloseId,
  branchPhoneInputId,
  branchPostCodeErrorId,
  branchPostCodeInputId,
  branchResetId,
  branchStreetErrorId,
  branchStreetInputId,
  branchSubmitId,
  closeBrandComponentId,
  ERROR_NOTIFICATION_CLASS_NAME,
  WARNING_NOTIFICATION_CLASS_NAME,
} from "@ta/cm/src/selectors";
import { mockBranchValue1 } from "@ta/cm/src/__tests__/mock-data";
import { fillFieldInput, getById } from "@ta/cm/src/__tests__/utils-dom";
import { cleanup, render } from "@testing-library/svelte";
import Branch from "../components/branch/branch.svelte";

jest.mock("@ta/cm/src/db/ulid-uuid");
const mockNewUlid = newUlid as jest.Mock;

describe("Shop branch svelte", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("create", () => {
    it("closes component", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: undefined,
        },
      });

      // Component should be active
      const closeEl = getById(closeBrandComponentId);
      expect(closeEl.closest(".test-is-active")).not.toBeNull();

      // When we close component
      await closeEl.click();

      // Component should not be active
      expect(closeEl.closest(".test-is-active")).toBeNull();
    });

    it("warns on submission of empty form", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: undefined,
        },
      });

      // There should be no notification UI
      expect(getById(branchNotificationTextCloseId)).toBeNull();

      // When form is submitted
      await getById(branchSubmitId).click();

      // There should be warning notification
      const notificationEl = getById(branchNotificationTextCloseId);
      expect(
        notificationEl.closest(`.${WARNING_NOTIFICATION_CLASS_NAME}`)
      ).not.toBeNull();

      // There should not be error notification
      expect(
        notificationEl.closest(`.${ERROR_NOTIFICATION_CLASS_NAME}`)
      ).toBeNull();

      // When notification is closed
      await notificationEl.click();

      // Notification should not be visible
      expect(getById(branchNotificationTextCloseId)).toBeNull();
    });

    it("errors on form input errors", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: undefined,
        },
      });

      // When post code field is completed with invalid input
      const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
      await fillFieldInput(postCodeEl, "a");
      expect(postCodeEl.value).toBe("a");

      // When city field is completed with invalid input
      const cityEl = getById<HTMLInputElement>(branchCityInputId);
      await fillFieldInput(cityEl, "a");
      expect(cityEl.value).toBe("a");

      // When street field is completed with invalid input
      const streetEl = getById<HTMLInputElement>(branchStreetInputId);
      await fillFieldInput(streetEl, "a");
      expect(streetEl.value).toBe("a");

      // When alias field is completed
      const aliasEl = getById<HTMLInputElement>(branchAliasInputId);
      await fillFieldInput(aliasEl, "a");
      expect(aliasEl.value).toBe("a");

      // When phone field is completed
      const phoneEl = getById<HTMLInputElement>(branchPhoneInputId);
      await fillFieldInput(phoneEl, "a");
      expect(phoneEl.value).toBe("a");

      // There should not be any form fields errors
      expect(getById(branchPostCodeErrorId)).toBeNull();
      expect(getById(branchCityErrorId)).toBeNull();
      expect(getById(branchStreetErrorId)).toBeNull();

      // There should not be an notification
      expect(getById(branchNotificationTextCloseId)).toBeNull();

      // When form is submitted
      await getById(branchSubmitId).click();

      // There should be error notification
      const notificationEl = getById(branchNotificationTextCloseId);
      expect(
        notificationEl.closest(`.${ERROR_NOTIFICATION_CLASS_NAME}`)
      ).not.toBeNull();

      // There should not be warning notification
      expect(
        notificationEl.closest(`.${WARNING_NOTIFICATION_CLASS_NAME}`)
      ).toBeNull();

      // There should be form field errors
      expect(getById(branchPostCodeErrorId)).not.toBeNull();
      expect(getById(branchCityErrorId)).not.toBeNull();
      expect(getById(branchStreetErrorId)).not.toBeNull();

      // When form is reset
      await getById(branchResetId).click();

      // Form fields should be cleared
      expect(postCodeEl.value).toBe("");
      expect(cityEl.value).toBe("");
      expect(streetEl.value).toBe("");
      expect(aliasEl.value).toBe("");
      expect(phoneEl.value).toBe("");

      // There should not be form field errors
      expect(getById(branchPostCodeErrorId)).toBeNull();
      expect(getById(branchCityErrorId)).toBeNull();
      expect(getById(branchStreetErrorId)).toBeNull();

      // There should not be any notification
      expect(getById(branchNotificationTextCloseId)).toBeNull();
    });

    it("submits valid form", async () => {
      mockNewUlid.mockReturnValue("1");
      const mockOnSubmit = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: mockOnSubmit,
        },
      });

      // When post code field is completed with invalid input
      const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
      await fillFieldInput(postCodeEl, mockBranchValue1.postCode);

      // When city field is completed with invalid input
      const cityEl = getById<HTMLInputElement>(branchCityInputId);
      await fillFieldInput(cityEl, mockBranchValue1.city);

      // When street field is completed with invalid input
      const streetEl = getById<HTMLInputElement>(branchStreetInputId);
      await fillFieldInput(streetEl, mockBranchValue1.street);

      // When alias field is completed
      const aliasEl = getById<HTMLInputElement>(branchAliasInputId);
      await fillFieldInput(aliasEl, (mockBranchValue1 as any).branchAlias);

      // When phone field is completed
      const phoneEl = getById<HTMLInputElement>(branchPhoneInputId);
      await fillFieldInput(phoneEl, (mockBranchValue1 as any).phone);

      expect(mockOnSubmit).not.toBeCalled();

      // When form is submitted
      await getById(branchSubmitId).click();

      const result = {
        ...mockBranchValue1,
        id: "1",
      } as any;

      delete result.__typename;

      // Form data should be passed to parent
      expect(mockOnSubmit).toBeCalledWith(result);
    });

    it("phone and alias may be empty", async () => {
      const mockOnSubmit = jest.fn();
      mockNewUlid.mockReturnValue("a");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: mockOnSubmit,
        },
      });

      // When post code field is completed with invalid input
      const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
      await fillFieldInput(postCodeEl, mockBranchValue1.postCode);

      // When city field is completed with invalid input
      const cityEl = getById<HTMLInputElement>(branchCityInputId);
      await fillFieldInput(cityEl, mockBranchValue1.city);

      // When street field is completed with invalid input
      const streetEl = getById<HTMLInputElement>(branchStreetInputId);
      await fillFieldInput(streetEl, mockBranchValue1.street);

      // When form is submitted
      await getById(branchSubmitId).click();

      const result = {
        ...mockBranchValue1,
        id: "a",
        phone: null,
        branchAlias: null,
      } as any;

      delete result.__typename;

      // Form data should be passed to parent
      expect(mockOnSubmit).toBeCalledWith(result);
    });
  });

  describe("edit", () => {
    it("warns if unedited form submitted", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: undefined,
          branch: {
            ...mockBranchValue1,
          },
        } as Props,
      });

      // There should be no notification UI
      expect(getById(branchNotificationTextCloseId)).toBeNull();

      // When form is submitted
      await getById(branchSubmitId).click();

      // There should be warning notification
      const notificationEl = getById(branchNotificationTextCloseId);
      expect(
        notificationEl.closest(`.${WARNING_NOTIFICATION_CLASS_NAME}`)
      ).not.toBeNull();

      // There should not be error notification
      expect(
        notificationEl.closest(`.${ERROR_NOTIFICATION_CLASS_NAME}`)
      ).toBeNull();

      // When notification is closed
      await notificationEl.click();

      // Notification should not be visible
      expect(getById(branchNotificationTextCloseId)).toBeNull();
    });

    it(`submits correctly edited data \
        returns "null" for nullable fields when empty \
        resets form`, async () => {
      mockNewUlid.mockReturnValue("1");
      const mockOnSubmit = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { debug } = render(Branch, {
        props: {
          onSubmit: mockOnSubmit as any,
          branch: {
            ...mockBranchValue1,
          },
        } as Props,
      });

      const t = "5   ";

      const newPostCode = mockBranchValue1.postCode + t;
      const newCity = mockBranchValue1.city + t;
      const newStreet = mockBranchValue1.street + t;
      const newAlias = (mockBranchValue1 as any).branchAlias + t;
      const newPhone = (mockBranchValue1 as any).phone + t;

      // When post code field is completed with valid input
      const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
      await fillFieldInput(postCodeEl, newPostCode);

      // When city field is completed with valid input
      const cityEl = getById<HTMLInputElement>(branchCityInputId);
      await fillFieldInput(cityEl, newCity);

      // When street field is completed with valid input
      const streetEl = getById<HTMLInputElement>(branchStreetInputId);
      await fillFieldInput(streetEl, newStreet);

      // When alias field is completed
      const aliasEl = getById<HTMLInputElement>(branchAliasInputId);
      await fillFieldInput(aliasEl, newAlias);

      // When phone field is completed
      const phoneEl = getById<HTMLInputElement>(branchPhoneInputId);
      await fillFieldInput(phoneEl, newPhone);

      expect(mockOnSubmit).not.toBeCalled();

      // When form is submitted
      await getById(branchSubmitId).click();

      // Form data should be passed to parent
      const submittedData = {
        ...mockBranchValue1,
        postCode: newPostCode.trim(),
        city: newCity.trim(),
        street: newStreet.trim(),
        branchAlias: newAlias.trim(),
        phone: newPhone.trim(),
      };
      expect(mockOnSubmit).toBeCalledWith(submittedData);

      mockOnSubmit.mockReset();

      // When alias field is cleared
      await fillFieldInput(aliasEl, "");

      // When phone field is cleared
      await fillFieldInput(phoneEl, "");

      // When form is submitted
      const submitEl = getById(branchSubmitId);
      await submitEl.click();

      // Form data should be passed to parent with nullable fields set to null
      expect(mockOnSubmit).toBeCalledWith({
        ...submittedData,
        phone: null,
        branchAlias: null,
      });

      // ====================================================
      // RESET
      // ====================================================

      // form field values should differ from unedited field values
      expect(postCodeEl.value).not.toBe(mockBranchValue1.postCode);
      expect(cityEl.value).not.toBe(mockBranchValue1.city);
      expect(streetEl.value).not.toBe(mockBranchValue1.street);
      expect(aliasEl.value).not.toBe(mockBranchValue1.branchAlias);
      expect(phoneEl.value).not.toBe(mockBranchValue1.phone);

      // When form is reset
      mockOnSubmit.mockReset();
      await getById(branchResetId).click();

      // Notification should not be visible
      expect(getById(branchNotificationTextCloseId)).toBeNull();

      // When form is submitted
      await submitEl.click();

      // Notification should be visible
      expect(getById(branchNotificationTextCloseId)).not.toBeNull();

      expect(mockOnSubmit).not.toBeCalled();

      // Form should be reset
      expect(postCodeEl.value).toBe(mockBranchValue1.postCode);
      expect(cityEl.value).toBe(mockBranchValue1.city);
      expect(streetEl.value).toBe(mockBranchValue1.street);
      expect(aliasEl.value).toBe(mockBranchValue1.branchAlias);
      expect(phoneEl.value).toBe(mockBranchValue1.phone);
    });
  });
});
