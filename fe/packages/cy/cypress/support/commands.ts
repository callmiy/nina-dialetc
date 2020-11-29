/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { RESET_PATH } from "@ta/cm/src/constants";

const apiUrl = Cypress.env("API_URL") as string;

function checkoutSession() {
  window.localStorage.clear();

  cy.request("GET", apiUrl + RESET_PATH).then((response) => {
    expect(response.body).to.equal("ok");
  });
}

Cypress.Commands.add("checkoutSession", checkoutSession);
