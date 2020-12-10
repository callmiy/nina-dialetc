import {
  shopItemBranchNameOptionSelector,
  shopItemBranchInputId,
  shopItemAddBrandId,
  shopItemBrandNameInputId,
  shopItemBrandNameOptionSelector,

  // BRAND FORM ////////////////////////////////////////////////////////////
  brandNameInputDomId,
  brandCountryInputDomId,
  brandCountryOptionSelector,
  brandCurrencyOptionSelector,
  brandCurrencyInputDomId,
  brandPhoneInputDomId,
  submitBrandId,
  resetFormBtnId,
  formCtrlErrorSelector,
  brandNotificationTextCloseId,

  // BRANCH /////////////////////////////////////////////////////////////////
  brandDomId,
  shopItemAddBranchId,
  branchPostCodeInputId,
  branchCityInputId,
  branchStreetInputId,
  branchAliasInputId,
  branchResetId,
  branchSubmitId,
  branchNotificationTextCloseId,
  branchPostCodeErrorId,
  branchCityErrorId,
  branchStreetErrorId,
  branchPhoneInputId,
} from "@ta/cm/src/selectors";
import { getBranchDisplayName } from "@ta/sc/src/components/shop-item/shop-item-utils";

context("Item", () => {
  beforeEach(() => {
    cy.checkoutSession();
  });

  const brandName1 = "Edeka";

  const postCodeInvalid1 = "12";
  const cityInvalid1 = "a";
  const streetInvalid1 = "abc";

  const postCode1 = "1234";
  const city1 = "Par";
  const street1 = "55 Williams straße, König, Bayern";
  const alias1 = "könig";
  const branchPhone1 = "844940";

  describe("create item", () => {
    it("success", () => {
      // When we visit the home page
      cy.visit("/");

      // When we click the button to create new item

      // BRAND ///////////////////////////////////////////////////////////////

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
        cy.get("#" + brandNotificationTextCloseId).should("not.exist");

        // We click submit button on empty form
        cy.get("#" + submitBrandId)
          .as("submitEl")
          .click();

        // Warning notification should be visible.
        // We dismiss warning notification
        cy.get("#" + brandNotificationTextCloseId)
          // .should("have.class", "is-warning")
          .click();

        // Warning notification should not be visible
        cy.get("#" + brandNotificationTextCloseId).should("not.exist");

        // We fill name field with name that is too short
        cy.get("@nameEl").type("a");

        // Error notification should not be visible
        cy.get("#" + brandNotificationTextCloseId).should("not.exist");

        // Field errors should not be visible
        cy.get("." + formCtrlErrorSelector).should("not.exist");

        // We click submit button on form with invalid data
        cy.get("@submitEl").click();

        // Error notification should be visible.
        cy.get("#" + brandNotificationTextCloseId).should("exist");

        // Field errors should be visible (for name, country and currency)
        cy.get("." + formCtrlErrorSelector).should("have.length", 3);

        // We click reset button.
        cy.get("@resetEl").click();

        // Error notification should not be visible
        cy.get("#" + brandNotificationTextCloseId).should("not.exist");

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

      // We click submit button on valid brand form
      cy.get("@submitEl").click();

      // New ShopBrand UI should not be visible
      cy.get("#" + brandNameInputDomId).should("not.exist");

      // ShopItem brandName should be brand name input
      cy.get("@itemName").within(() => {
        cy.get("option:checked")
          .as("brandName1optionEl")
          .then((e) => {
            expect(e.text().trim()).to.eq(brandName1);
          });
      });

      // BRANCH ////////////////////////////////////////////////////////////////

      // When we click on 'Add new branch' button
      cy.get("#" + shopItemAddBranchId).click();

      // ShopItem branch field should be empty
      cy.get("#" + shopItemBranchInputId)
        .as("shopBranchEl")
        .should("have.value", "")
        .within(() => {
          cy.get("." + shopItemBranchNameOptionSelector).should(
            "have.length",
            1
          );
        });

      cy.get("#" + brandDomId).within(() => {
        // When we complete post code field with invalid data
        cy.get("#" + branchPostCodeInputId)
          .as("postCodeEl")
          .type(postCodeInvalid1);

        // post code value should be visible
        cy.get("@postCodeEl").should("have.value", postCodeInvalid1);

        // Post code field error should not be visible
        cy.get("#" + branchPostCodeErrorId).should("not.exist");

        // When we complete city field with invalid data
        cy.get("#" + branchCityInputId)
          .as("cityEl")
          .type(cityInvalid1);

        // City value should be visible
        cy.get("@cityEl").should("have.value", cityInvalid1);

        // City field error should not be visible
        cy.get("#" + branchCityErrorId).should("not.exist");

        // When we fill street name and number field with invalid data
        cy.get("#" + branchStreetInputId)
          .as("streetEl")
          .type(streetInvalid1);

        // Street value should be visible
        cy.get("@streetEl").should("have.value", streetInvalid1);

        // Street field error should be visible
        cy.get("#" + branchStreetErrorId).should("not.exist");

        // Branch notification UI should not be visible
        cy.get("#" + branchNotificationTextCloseId).should("not.exist");

        // When we submit the form
        cy.get("#" + branchSubmitId)
          .as("branchSubmitEl")
          .click();

        // Branch form field errors should be visible
        cy.get("#" + branchPostCodeErrorId).should("exist");
        cy.get("#" + branchCityErrorId).should("exist");
        cy.get("#" + branchStreetErrorId).should("exist");

        // Branch notification UI should be visible
        cy.get("#" + branchNotificationTextCloseId).should("exist");

        // When we fill branch alias
        cy.get("#" + branchAliasInputId)
          .as("aliasEl")
          .type(alias1);

        // When we fill branch phone
        cy.get("#" + branchPhoneInputId)
          .as("branchPhoneEl")
          .type(branchPhone1);

        // When new branch form is reset
        cy.get("#" + branchResetId)
          .as("branchResetEl")
          .click();

        // Form fields should be cleared of their values
        cy.get("@postCodeEl").should("have.value", "");
        cy.get("@cityEl").should("have.value", "");
        cy.get("@streetEl").should("have.value", "");
        cy.get("@aliasEl").should("have.value", "");
        cy.get("@branchPhoneEl").should("have.value", "");

        // Branch form field errors should not be visible
        cy.get("#" + branchStreetErrorId).should("not.exist");
        cy.get("#" + branchCityErrorId).should("not.exist");
        cy.get("#" + branchStreetErrorId).should("not.exist");

        // Branch notification UI should not be visible
        cy.get("#" + branchNotificationTextCloseId).should("not.exist");

        // When empty branch form is submitted
        cy.get("@branchSubmitEl").click();

        // Branch notification UI should be visible
        cy.get("#" + branchNotificationTextCloseId).should("exist");

        // Branch form field errors should not be visible
        cy.get("#" + branchStreetErrorId).should("not.exist");
        cy.get("#" + branchCityErrorId).should("not.exist");
        cy.get("#" + branchStreetErrorId).should("not.exist");

        // When branch alias field has some input
        cy.get("@aliasEl").type("a");

        // When branchForm is submitted
        cy.get("@branchSubmitEl").click();

        // branchForm field errors should be visible
        cy.get("#" + branchStreetErrorId).should("exist");
        cy.get("#" + branchCityErrorId).should("exist");
        cy.get("#" + branchStreetErrorId).should("exist");

        // When form fields are completed with valid data
        cy.get("@postCodeEl").type(postCode1);
        cy.get("@cityEl").type(city1);
        cy.get("@streetEl").type(street1);
        cy.get("@aliasEl").type(alias1);
        cy.get("@branchPhoneEl").type(branchPhone1);

        // When we submit valid branch form
        cy.get("@branchSubmitEl").click();

        // Branch form should no longer be visible
        cy.get("#" + branchPostCodeInputId).should("not.exist");
      });

      // ShopItem branch name should be branch street, city and post code
      const branchName = getBranchDisplayName({
        postCode: postCode1,
        street: street1,
        city: city1,
      });

      cy.get("@shopBranchEl").within(() => {
        cy.get("option:checked")
          .as("branchName1optionEl")
          .then((e) => {
            expect(e.text().trim()).to.eq(branchName);
          });
      });

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

    it("Shop brand select elements should not clear on another selection", () => {
      // When we visit the home page
      cy.visit("/");

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

      // We click submit button on brandForm
      cy.get("#" + submitBrandId)
        .as("submitEl")
        .click();

      // ShopItem brandName should be brand name input
      cy.get("#" + shopItemBrandNameInputId)
        .as("itemName")
        .within(() => {
          cy.get("option:checked")
            .as("brandName1optionEl")
            .then((e) => {
              expect(e.text().trim()).to.eq(brandName1);
            });

          // And brand name select element should contain 2 items
          cy.get("." + shopItemBrandNameOptionSelector)
            .as("brandNameOptions")
            .should("have.length", 2);
        });

      // When we change brandName selection to empty string
      cy.get("@itemName").select("");

      // The value of the select should change to the empty string
      cy.get("@itemName").should("have.value", "");

      // There should still be 2 brandNameOptions to choose from
      cy.get("@brandNameOptions").should("have.length", 2);

      // When a non empty string is selected
      cy.get("@itemName").select(brandName1);

      // The value should no longer be the empty string
      cy.get("@brandName1optionEl").then((e) => {
        cy.get("@itemName").should("have.value", e.val());
      });

      //
    });
  });
});
