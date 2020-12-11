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
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";

let mockId = 0;
jest.mock("@ta/cm/src/db/ulid-uuid", () => ({
  newUlid: () => ++mockId,
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
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
});
