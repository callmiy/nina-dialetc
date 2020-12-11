/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, cleanup } from "@testing-library/svelte";
import ShopItem from "../components/shop-item/shop-item.svelte";
import {
  WARNING_NOTIFICATION_CLASS_NAME,
  ERROR_NOTIFICATION_CLASS_NAME,
  closeShopItemComponent,
  shopItemCloseNotificationId,
  shopItemSubmitId,
  shopItemSpecificNameInputDomId,
  shopItemGenericNameInputDomId,
  shopItemTagsInputDomId,
  shopItemSpecificNameErrorId,
  shopItemResetId,
} from "@ta/cm/src/selectors";
import { fillFieldInput, getById } from "@ta/cm/src/__tests__/utils-dom";
import { shopItemVal } from "./mocks/mock-utils";

let mockId = 0;
jest.mock("@ta/cm/src/db/ulid-uuid", () => ({
  newUlid: () => ++mockId,
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  mockId = 0;
});

describe("Shopping Item", () => {
  const allTags = shopItemVal.tags.map((t) => t.tag);
  const tagTexts =
    allTags.slice(0, 2).join(",") + " " + allTags.slice(2, 4).join(" ");

  const tags = shopItemVal.tags.map((d, i) => {
    return {
      tag: d.tag,
      id: i + 2,
    };
  });

  it("closes component", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopItem, {
      props: {
        onSubmit: undefined,
      },
    });

    // Component should be active
    const closeEl = getById(closeShopItemComponent);
    expect(closeEl.closest(".test-is-active")).not.toBeNull();

    // When we close component
    await closeEl.click();

    // Component should not be active
    expect(closeEl.closest(".test-is-active")).toBeNull();
  });

  it("warns on submission of empty form", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopItem, {
      props: {
        onSubmit: undefined,
      },
    });

    // There should be no notification UI
    expect(getById(shopItemCloseNotificationId)).toBeNull();

    // When form is submitted
    await getById(shopItemSubmitId).click();

    // There should be warning notification
    const notificationEl = getById(shopItemCloseNotificationId);
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
    expect(getById(shopItemCloseNotificationId)).toBeNull();
  });

  it("errors on form input errors", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopItem, {
      props: {
        onSubmit: undefined,
      },
    });

    // When specific name field is completed with invalid input
    const specificNameEl = getById<HTMLInputElement>(
      shopItemSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, "a");
    expect(specificNameEl.value).toBe("a");

    // When generic name field is completed
    const genericNameEl = getById<HTMLInputElement>(
      shopItemGenericNameInputDomId
    );
    await fillFieldInput(genericNameEl, "a");
    expect(genericNameEl.value).toBe("a");

    // When tags field is completed
    const tagsEl = getById<HTMLInputElement>(shopItemTagsInputDomId);
    await fillFieldInput(tagsEl, "a");
    expect(tagsEl.value).toBe("a");

    // There should not be any form fields errors
    expect(getById(shopItemSpecificNameErrorId)).toBeNull();

    // There should not be any notification
    expect(getById(shopItemCloseNotificationId)).toBeNull();

    // When form is submitted
    await getById(shopItemSubmitId).click();

    // There should be error notification
    const notificationEl = getById(shopItemCloseNotificationId);
    expect(
      notificationEl.closest(`.${ERROR_NOTIFICATION_CLASS_NAME}`)
    ).not.toBeNull();

    // There should not be warning notification
    expect(
      notificationEl.closest(`.${WARNING_NOTIFICATION_CLASS_NAME}`)
    ).toBeNull();

    // There should be form field errors
    expect(getById(shopItemSpecificNameErrorId)).not.toBeNull();

    // When form is reset
    await getById(shopItemResetId).click();

    // Form fields should be cleared
    expect(specificNameEl.value).toBe("");
    expect(genericNameEl.value).toBe("");
    expect(tagsEl.value).toBe("");

    // There should not be form field errors
    expect(getById(shopItemSpecificNameErrorId)).toBeNull();

    // There should not be any notification
    expect(getById(shopItemCloseNotificationId)).toBeNull();
  });

  it("submits valid form", async () => {
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopItem, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When specific name field is completed with valid input
    const specificNameEl = getById<HTMLInputElement>(
      shopItemSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, shopItemVal.specificName);

    // When generic name field is completed
    const genericNameEl = getById<HTMLInputElement>(
      shopItemGenericNameInputDomId
    );
    await fillFieldInput(genericNameEl, shopItemVal.genericName);

    // When tags field is completed
    const tagsEl = getById<HTMLInputElement>(shopItemTagsInputDomId);
    await fillFieldInput(tagsEl, tagTexts);

    expect(mockOnSubmit).not.toBeCalled();

    // When form is submitted
    await getById(shopItemSubmitId).click();

    // Form data should be passed to parent
    expect(mockOnSubmit).toBeCalledWith({
      ...shopItemVal,
      id: 1,
      tags,
    });
  });

  it("generic name and tags are optional", async () => {
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(ShopItem, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When specific name field is completed
    const specificNameEl = getById<HTMLInputElement>(
      shopItemSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, shopItemVal.specificName);

    // When form is submitted
    await getById(shopItemSubmitId).click();

    // Form data should be passed to parent, with generic name and tags empty
    expect(mockOnSubmit).toBeCalledWith({
      ...shopItemVal,
      id: 1,
      genericName: null,
      tags: [],
    });
  });
});
