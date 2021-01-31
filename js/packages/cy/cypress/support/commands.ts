/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { makeApolloClient } from "@ta/cm/src/apollo/client";
import { RESET_PATH } from "@ta/cm/src/constants";
import { shouldUseMsw } from "@ta/cm/src/envs";
import {
  CYPRESS_NINA_KEY,
  MswGraphql,
  MswSetupWorkerApi,
  NinaGlobals,
} from "@ta/cm/src/types";

const apiUrl = Cypress.env("API_URL") as string;
const useMsw = Cypress.env("USE_MSW") as string;

const nina = {} as NinaGlobals;
Cypress.env(CYPRESS_NINA_KEY, nina);

const { client, cache } = makeApolloClient();
nina.client = client;
nina.cache = cache;

function checkoutSession() {
  window.localStorage.clear();

  if (shouldUseMsw(useMsw)) {
    const msw = require("@ta/cm/src/__tests__/msw-browser");
    nina.mswBrowserWorker = msw.mswBrowserWorker as MswSetupWorkerApi;
    nina.mswGraphql = msw.mswGraphql as MswGraphql;

    // No need to start browser worker when app loaded since it is already
    // started here
    nina.mswBrowserWorker.start();
  } else {
    // If mocking backend, then no need for a reset
    cy.request("GET", apiUrl + RESET_PATH).then((response) => {
      expect(response.body).to.equal("ok");
    });
  }
}

Cypress.Commands.add("checkoutSession", checkoutSession);
