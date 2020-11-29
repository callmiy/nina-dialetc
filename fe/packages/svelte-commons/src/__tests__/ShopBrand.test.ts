import { render } from "@testing-library/svelte";
import ShopBrand from "../ShopBrand/ShopBrand.svelte";
import {
  shopBrandNameInputDomId,
  closeShopBrandComponentId,
  shopBrandDomId,
  resetFormBtnId,
  shopBrandCountryInputDomId,
  shopBrandCurrencyInputDomId,
  shopBrandPhoneInputDomId,
  simpleTextErrorCloseId,
  submitId,
} from "@ta/cm/src/shop-brand-dom";
import { fillField } from "./test_utils";
import { IS_ACTIVE_CLASS_NAME } from "@ta/cm/src/utils";

test(`open close component /
      reset form /
      submit empty form`, async () => {
  render(ShopBrand, {
    props: {
      isActive: true,
    },
  });

  // Component should initially be active
  const componentEl = getById(shopBrandDomId);
  expect(componentEl.classList).toContain(IS_ACTIVE_CLASS_NAME);

  // When component is closed from the top
  await getById(closeShopBrandComponentId).click();

  // Component should not be visible
  expect(componentEl.classList).not.toContain(IS_ACTIVE_CLASS_NAME);

  // When form is completed
  const nameInputEl = getById<HTMLInputElement>(shopBrandNameInputDomId);
  fillField(nameInputEl, "a");
  expect(nameInputEl.value).toBe("a");

  const countryInputEl = getById<HTMLInputElement>(shopBrandCountryInputDomId);
  fillField(countryInputEl, "de");
  expect(countryInputEl.value).toBe("de");

  const currencyInputEl = getById<HTMLInputElement>(
    shopBrandCurrencyInputDomId
  );
  fillField(currencyInputEl, "eur");
  expect(currencyInputEl.value).toBe("eur");

  const phoneInputEl = getById<HTMLInputElement>(shopBrandPhoneInputDomId);
  fillField(phoneInputEl, "aa");
  expect(phoneInputEl.value).toBe("aa");

  // When reset button is clicked
  const resetEl = getById(resetFormBtnId);
  await resetEl.click();

  // Form should be empty
  expect(nameInputEl.value).toBe("");
  expect(countryInputEl.value).toBe("");
  expect(currencyInputEl.value).toBe("");
  // expect(phoneInputEl.value).toBe("");

  // Warning notification that form empty should not visible
  expect(getById(simpleTextErrorCloseId)).toBeNull();

  // When empty form is submitted
  const submitEl = getById(submitId);
  await submitEl.click();

  // Warning notification is visible
  const closeSimpleTextNotification = getById(simpleTextErrorCloseId);

  // When reset button is clicked
  await closeSimpleTextNotification.click();

  // Warning notification should not visible
  expect(getById(simpleTextErrorCloseId)).toBeNull();
});

function getById<T extends HTMLElement = HTMLElement>(domId: string) {
  return document.getElementById(domId) as T;
}
