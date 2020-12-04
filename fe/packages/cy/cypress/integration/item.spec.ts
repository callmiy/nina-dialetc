import {
  shopItemAddBrandId,
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,
  brandNameInputDomId,
  brandCountryInputDomId,
  brandCountryOptionSelector,
  brandCurrencyOptionSelector,
  brandCurrencyInputDomId,
  brandPhoneInputDomId,
  submitBrandId,
  resetFormBtnId,
  formCtrlErrorSelector,
  notificationTextCloseId,
} from "@ta/cm/src/selectors";

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
      cy.get("#" + brandNameInputDomId)
        .as("nameEl")
        .type(brandName1);

      // When we select a country
      cy.get("." + brandCountryOptionSelector)
        .first()
        .as("countryOptionEl")
        .then((e) => {
          cy.get("#" + brandCountryInputDomId)
            .as("countryEl")
            .select(e.val() as string);
        });

      // When we select a currency
      cy.get("." + brandCurrencyOptionSelector)
        .first()
        .as("currencyOptionEl")
        .then((el) => {
          cy.get("#" + brandCurrencyInputDomId)
            .as("currencyEl")
            .select(el.val() as string);
        });

      // We fill telephone field
      cy.get("#" + brandPhoneInputDomId)
        .as("phoneEl")
        .type("012345677");

      {
        /////////// :TODO: remove: integration test /////////////
        // We click reset button.
        cy.get("#" + resetFormBtnId)
          .as("resetEl")
          .click();

        // Form elements should clear
        cy.get("@nameEl").should("have.value", "");
        cy.get("@countryEl").should("have.value", "");
        cy.get("@currencyEl").should("have.value", "");
        cy.get("@phoneEl").should("have.value", "");

        // Warning notification should not be visible
        cy.get("#" + notificationTextCloseId).should("not.exist");

        // We click submit button on empty form
        cy.get("#" + submitBrandId)
          .as("submitEl")
          .click();

        // Warning notification should be visible.
        // We dismiss warning notification
        cy.get("#" + notificationTextCloseId)
          // .should("have.class", "is-warning")
          .click();

        // Warning notification should not be visible
        cy.get("#" + notificationTextCloseId).should("not.exist");

        // We fill name field with name that is too short
        cy.get("@nameEl").type("a");

        // Error notification should not be visible
        cy.get("#" + notificationTextCloseId).should("not.exist");

        // Field errors should not be visible
        cy.get("." + formCtrlErrorSelector).should("not.exist");

        // We click submit button on form with invalid data
        cy.get("@submitEl").click();

        // Error notification should be visible.
        cy.get("#" + notificationTextCloseId).should("exist");

        // Field errors should be visible (for name, country and currency)
        cy.get("." + formCtrlErrorSelector).should("have.length", 3);

        // We click reset button.
        cy.get("@resetEl").click();

        // Error notification should not be visible
        cy.get("#" + notificationTextCloseId).should("not.exist");

        // Field errors should not be visible
        cy.get("." + formCtrlErrorSelector).should("not.exist");

        // When we select a country and currency
        cy.get("@countryOptionEl").then((e) => {
          cy.get("@countryEl").select(e.val() as string);
        });

        cy.get("@currencyOptionEl").then((el) => {
          cy.get("@currencyEl").select(el.val() as string);
        });

        // Field errors should not be visible
        cy.get("." + formCtrlErrorSelector).should("not.exist");

        // We click submit button on form with invalid data (name is empty)
        cy.get("@submitEl").click();

        // Field errors should be visible (for name)
        cy.get("." + formCtrlErrorSelector).should("have.length", 1);

        // We fill name field correctly
        cy.get("@nameEl").type(brandName1);

        // We fill telephone field
        cy.get("@phoneEl").type("012345677");

        // ShopItem name field should be empty
        cy.get("#" + shopItemBrandNameInputId)
          .as("itemName")
          .should("have.value", "")
          .within(() => {
            cy.get("." + shopItemBrandNameOptionSelector).should(
              "have.length",
              1
            );
          });
        ////////////////// END :TODO: ///////////////////////////
      }

      // We click submit button on valid form
      cy.get("@submitEl").click();

      // New ShopBrand UI should not be visible
      cy.get("#" + brandNameInputDomId).should("not.exist");

      // ShopItem brandName should be brand name input
      cy.get("@itemName").should("have.value", brandName1);

      // And click 'Save changes' button
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
