/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, cleanup } from "@testing-library/svelte";
import Branch from "../components/branch/branch.svelte";
import { closeBrandComponentId } from "@ta/cm/src/selectors";
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
});
