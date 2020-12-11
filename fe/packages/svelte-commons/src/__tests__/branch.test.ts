/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, cleanup } from "@testing-library/svelte";
import Branch from "../components/branch/branch.svelte";
import {
  closeBrandComponentId,
  branchNotificationTextCloseId,
  branchSubmitId,
  WARNING_NOTIFICATION_CLASS_NAME,
  ERROR_NOTIFICATION_CLASS_NAME,
  branchCityInputId,
  branchStreetInputId,
  branchPostCodeInputId,
  branchAliasInputId,
  branchPostCodeErrorId,
  branchCityErrorId,
  branchStreetErrorId,
  branchPhoneInputId,
  branchResetId,
} from "@ta/cm/src/selectors";
import { fillFieldInput, getById } from "@ta/cm/src/__tests__/utils-dom";
import { branchSubmitVal1 } from "./mocks/mock-utils";

let mockId = 0;
jest.mock("@ta/cm/src/db/ulid-uuid", () => ({
  newUlid: () => ++mockId,
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  mockId = 0;
});

describe("Shop branch", () => {
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
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Branch, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When post code field is completed with invalid input
    const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
    await fillFieldInput(postCodeEl, branchSubmitVal1.postCode);

    // When city field is completed with invalid input
    const cityEl = getById<HTMLInputElement>(branchCityInputId);
    await fillFieldInput(cityEl, branchSubmitVal1.city);

    // When street field is completed with invalid input
    const streetEl = getById<HTMLInputElement>(branchStreetInputId);
    await fillFieldInput(streetEl, branchSubmitVal1.street);

    // When alias field is completed
    const aliasEl = getById<HTMLInputElement>(branchAliasInputId);
    await fillFieldInput(aliasEl, branchSubmitVal1.branchAlias);

    // When phone field is completed
    const phoneEl = getById<HTMLInputElement>(branchPhoneInputId);
    await fillFieldInput(phoneEl, branchSubmitVal1.phone);

    expect(mockOnSubmit).not.toBeCalled();

    // When form is submitted
    await getById(branchSubmitId).click();

    // Form data should be passed to parent
    expect(mockOnSubmit).toBeCalledWith({
      ...branchSubmitVal1,
      id: 1,
    });
  });

  it("phone and alias may be empty", async () => {
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Branch, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When post code field is completed with invalid input
    const postCodeEl = getById<HTMLInputElement>(branchPostCodeInputId);
    await fillFieldInput(postCodeEl, branchSubmitVal1.postCode);

    // When city field is completed with invalid input
    const cityEl = getById<HTMLInputElement>(branchCityInputId);
    await fillFieldInput(cityEl, branchSubmitVal1.city);

    // When street field is completed with invalid input
    const streetEl = getById<HTMLInputElement>(branchStreetInputId);
    await fillFieldInput(streetEl, branchSubmitVal1.street);

    // When form is submitted
    await getById(branchSubmitId).click();

    // Form data should be passed to parent
    expect(mockOnSubmit).toBeCalledWith({
      ...branchSubmitVal1,
      id: 1,
      phone: null,
      branchAlias: null,
    });
  });
});
