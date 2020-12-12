/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
import { render, cleanup } from "@testing-library/svelte";
import Article from "../components/article/article.svelte";
import {
  WARNING_NOTIFICATION_CLASS_NAME,
  ERROR_NOTIFICATION_CLASS_NAME,
  closeArticleComponent,
  articleCloseNotificationId,
  articleSubmitId,
  articleSpecificNameInputDomId,
  articleGenericNameInputDomId,
  articleTagsInputDomId,
  articleSpecificNameErrorId,
  articleResetId,
} from "@ta/cm/src/selectors";
import { fillFieldInput, getById } from "@ta/cm/src/__tests__/utils-dom";
import { articleVal } from "./mocks/mock-utils";
import { ArticleTag } from "../components/article/article.utils";

let mockId = 0;
jest.mock("@ta/cm/src/db/ulid-uuid", () => ({
  newUlid: () => ++mockId + "",
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  mockId = 0;
});

describe("Article", () => {
  let tagTexts = "";
  const { tags } = articleVal;
  const len = tags.length - 1;

  const tagsList: ArticleTag[] = articleVal.tags.map((d, i) => {
    const { text } = d;

    tagTexts += text + (i === len ? "" : ",");

    return {
      text,
      id: i + 2 + "",
    };
  });

  it("closes component", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Article, {
      props: {
        onSubmit: undefined,
      },
    });

    // Component should be active
    const closeEl = getById(closeArticleComponent);
    expect(closeEl.closest(".test-is-active")).not.toBeNull();

    // When we close component
    await closeEl.click();

    // Component should not be active
    expect(closeEl.closest(".test-is-active")).toBeNull();
  });

  it("warns on submission of empty form", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Article, {
      props: {
        onSubmit: undefined,
      },
    });

    // There should be no notification UI
    expect(getById(articleCloseNotificationId)).toBeNull();

    // When form is submitted
    await getById(articleSubmitId).click();

    // There should be warning notification
    const notificationEl = getById(articleCloseNotificationId);
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
    expect(getById(articleCloseNotificationId)).toBeNull();
  });

  it("errors on form input errors", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Article, {
      props: {
        onSubmit: undefined,
      },
    });

    // When specific name field is completed with invalid input
    const specificNameEl = getById<HTMLInputElement>(
      articleSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, "a");
    expect(specificNameEl.value).toBe("a");

    // When generic name field is completed
    const genericNameEl = getById<HTMLInputElement>(
      articleGenericNameInputDomId
    );
    await fillFieldInput(genericNameEl, "a");
    expect(genericNameEl.value).toBe("a");

    // When tags field is completed
    const tagsEl = getById<HTMLInputElement>(articleTagsInputDomId);
    await fillFieldInput(tagsEl, "a");
    expect(tagsEl.value).toBe("a");

    // There should not be any form fields errors
    expect(getById(articleSpecificNameErrorId)).toBeNull();

    // There should not be any notification
    expect(getById(articleCloseNotificationId)).toBeNull();

    // When form is submitted
    await getById(articleSubmitId).click();

    // There should be error notification
    const notificationEl = getById(articleCloseNotificationId);
    expect(
      notificationEl.closest(`.${ERROR_NOTIFICATION_CLASS_NAME}`)
    ).not.toBeNull();

    // There should not be warning notification
    expect(
      notificationEl.closest(`.${WARNING_NOTIFICATION_CLASS_NAME}`)
    ).toBeNull();

    // There should be form field errors
    expect(getById(articleSpecificNameErrorId)).not.toBeNull();

    // When form is reset
    await getById(articleResetId).click();

    // Form fields should be cleared
    expect(specificNameEl.value).toBe("");
    expect(genericNameEl.value).toBe("");
    expect(tagsEl.value).toBe("");

    // There should not be form field errors
    expect(getById(articleSpecificNameErrorId)).toBeNull();

    // There should not be any notification
    expect(getById(articleCloseNotificationId)).toBeNull();
  });

  it("submits valid form", async () => {
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Article, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When specific name field is completed with valid input
    const specificNameEl = getById<HTMLInputElement>(
      articleSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, articleVal.specificName);

    // When generic name field is completed
    const genericNameEl = getById<HTMLInputElement>(
      articleGenericNameInputDomId
    );
    await fillFieldInput(genericNameEl, articleVal.genericName as string);

    // When tags field is completed
    const tagsEl = getById<HTMLInputElement>(articleTagsInputDomId);
    await fillFieldInput(tagsEl, tagTexts);

    expect(mockOnSubmit).not.toBeCalled();

    // When form is submitted
    await getById(articleSubmitId).click();

    // Form data should be passed to parent
    expect(mockOnSubmit).toBeCalledWith({
      ...articleVal,
      id: "1",
      tags: tagsList,
    });
  });

  it("generic name and tags are optional", async () => {
    const mockOnSubmit = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { debug } = render(Article, {
      props: {
        onSubmit: mockOnSubmit,
      },
    });

    // When specific name field is completed
    const specificNameEl = getById<HTMLInputElement>(
      articleSpecificNameInputDomId
    );
    await fillFieldInput(specificNameEl, articleVal.specificName);

    // When form is submitted
    await getById(articleSubmitId).click();

    // Form data should be passed to parent, with generic name and tags empty
    expect(mockOnSubmit).toBeCalledWith({
      ...articleVal,
      id: "1",
      genericName: null,
      tags: [],
    });
  });
});
