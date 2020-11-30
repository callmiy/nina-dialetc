/* eslint-disable @typescript-eslint/triple-slash-reference*/
/// <reference path="../support/types.d.ts" />

import { shopItemAddBrandId } from "@ta/cm/src/shop-item-dom";
import { shopBrandNameInputDomId } from "@ta/cm/src/shop-brand-dom";

context("Item", () => {
  beforeEach(() => {
    cy.checkoutSession();
  });

  describe("create item", () => {
    it("success", () => {
      expect(1).to.eq(1);
      // When we visit the home page
      cy.visit("/");

      // When we click the button to create new item

      // Click on 'Add new shop brand' button
      cy.get("#" + shopItemAddBrandId).click();

      // And fill the brand name field
      cy.get("#" + shopBrandNameInputDomId).type("Edeka");

      // And fill the country field
      // And fill the currency field
      // And fill telephone field
      // And click 'Finish Add' shop brand
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
