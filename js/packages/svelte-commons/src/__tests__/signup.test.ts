/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import {
  signupBlankEmailErrorMsg,
  signupBlankPasswordErrorMsg,
  signupBlankRepeatPasswordErrorMsg,
  signupEmailInputId,
  signupErrorMsgSelector,
  signupPasswordInputId,
  signupRepeatPasswordInputId,
  signupSubmitId,
} from "@ta/cm/src/selectors";
import { NinaGlobals } from "@ta/cm/src/types";
import { signupMswMutation } from "@ta/cm/src/__tests__/msw-handlers";
import { mswServer } from "@ta/cm/src/__tests__/msw-server";
import { waitForCount } from "@ta/cm/src/__tests__/pure-utils";
import { getById } from "@ta/cm/src/__tests__/utils-dom";
import { cleanup, render, waitFor } from "@testing-library/svelte";
import Signup from "../components/signup.svelte";

const nina = {
  // logApolloQueries: true,
} as NinaGlobals;

window.____nina = nina;

describe("Signup", () => {
  beforeAll(() => {
    mswServer.listen();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    mswServer.resetHandlers();
    delete nina.cache;
    delete nina.client;
  });

  afterAll(() => {
    mswServer.close();
    delete (window as any).____nina;
  });

  it("display errors if we submit blank form", async () => {
    // Tests that the UI can show server errors
    const errorsList = [
      signupBlankEmailErrorMsg,
      signupBlankPasswordErrorMsg,
      signupBlankRepeatPasswordErrorMsg,
    ];

    mswServer.use(
      signupMswMutation({
        signup: {
          __typename: "SignupErrors",
          errors: errorsList,
        },
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug, container } = render(Signup, {
      props: {},
    });

    // Form input fields should be blank
    const emailInput = getById<HTMLInputElement>(signupEmailInputId);
    expect(emailInput.value).toBe("");

    const passwordInput = getById<HTMLInputElement>(signupPasswordInputId);
    expect(passwordInput.value).toBe("");

    const repeatPasswordInput = getById<HTMLInputElement>(
      signupRepeatPasswordInputId
    );
    expect(repeatPasswordInput.value).toBe("");

    // No error UI should be visible
    expect(document.getElementsByClassName(signupErrorMsgSelector).length).toBe(
      0
    );

    // When we submit empty form
    await getById(signupSubmitId).click();

    // Error UIs should be visible
    const errorEls = await waitForCount(() => {
      return waitFor(() => {
        const els = document.getElementsByClassName(signupErrorMsgSelector);

        return els.length ? els : false;
      });
    });

    const uiErrorsTextsList = [].map
      .call(errorEls, (node: HTMLElement) => {
        return node.textContent?.trim();
      })
      .sort();

    expect(uiErrorsTextsList).toMatchObject(errorsList.sort());
  });
});
