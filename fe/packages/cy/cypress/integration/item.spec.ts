/* eslint-disable @typescript-eslint/triple-slash-reference*/
/// <reference path="../support/types.d.ts" />

import { shopItemAddBrandId } from "@ta/cm/src/shop-item-dom";
import {
  shopBrandNameInputDomId,
  shopBrandCountryInputDomId,
  shopBrandCountryOptionSelector,
  shopBrandCurrencyOptionSelector,
  shopBrandCurrencyInputDomId,
  shopBrandPhoneInputDomId,
  submitId,
} from "@ta/cm/src/shop-brand-dom";

context("Item", () => {
  beforeEach(() => {
    cy.checkoutSession();
  });

  const brandName1 = "Edeka";

  describe("create item", () => {
    it("success", () => {
      expect(1).to.eq(1);
      // When we visit the home page
      cy.visit("/");

      // When we click the button to create new item

      // When we click on 'Add new shop brand' button
      cy.get("#" + shopItemAddBrandId).click();

      // When we fill the brand name field
      cy.get("#" + shopBrandNameInputDomId).type(brandName1);

      // When we select a country
      cy.get("." + shopBrandCountryOptionSelector)
        .first()
        .then((e) => {
          cy.get("#" + shopBrandCountryInputDomId).select(e.val() as string);
        });

      // When we select a currency
      cy.get("." + shopBrandCurrencyOptionSelector)
        .first()
        .then((el) => {
          cy.get("#" + shopBrandCurrencyInputDomId).select(el.val() as string);
        });

      // We fill telephone field
      cy.get("#" + shopBrandPhoneInputDomId).type("012345677");

      // We click submit button
      cy.get("#" + submitId).click();

      // And click 'Add shop location' button
      // And fill street name and number field
      // And fill postcode field
      // And fill state field
      // And fill city field
      // And fill shop alias field
      // And click 'Finish Add shop location'
      // And click 'Add new item' button
      // And fill item name field
      // And fill item price
      // And fill item tags field
      // And uploaded item image
      // And complete two comments for item
      // And add a second item with different currency
      // And submit the form
    });
  });
});
