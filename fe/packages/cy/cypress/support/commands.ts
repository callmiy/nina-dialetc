/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { RESET_PATH } from "@ta/cm/src/constants";
import { shouldUseMsw } from "@ta/cm/src/envs";

const apiUrl = Cypress.env("API_URL") as string;
const useMws = Cypress.env("USE_MSW") as string;

function checkoutSession() {
  window.localStorage.clear();

  // If mocking backend, then no need for a reset
  if (!shouldUseMsw(useMws)) {
    cy.request("GET", apiUrl + RESET_PATH).then((response) => {
      expect(response.body).to.equal("ok");
    });
  }
}

Cypress.Commands.add("checkoutSession", checkoutSession);
