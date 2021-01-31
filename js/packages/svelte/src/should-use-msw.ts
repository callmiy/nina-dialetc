import { MswGraphql, MswSetupWorkerApi, NinaGlobals } from "@ta/cm/src/types";
import { CYPRESS_NINA_KEY } from "@ta/cm/src/types";

let nina: NinaGlobals;
let mswBrowserWorker: MswSetupWorkerApi;
let mswGraphql: MswGraphql;

if (window.Cypress) {
  nina = window.Cypress.env(CYPRESS_NINA_KEY) as NinaGlobals;
  window.____nina = nina;

  mswBrowserWorker = nina.mswBrowserWorker as MswSetupWorkerApi;
  mswGraphql = nina.mswGraphql as MswGraphql;
  // Browser worker would have been started inside cypress
  // mswBrowserWorker.start();
} else {
  const msw = require("@ta/cm/src/__tests__/msw-browser");

  const {
    getMswListBranchesGql,
    getMswListBrandsGql,
    getMswListCountriesAndCurrencies,
  } = require("@ta/cm/src/__tests__/msw-handlers");

  const {
    eurCcy1,
    franceCountry1,
    germanyCountry1,
    mockBranchValue1,
    mockBrandValue1,
  } = require("@ta/cm/src/__tests__/mock-data");

  mswBrowserWorker = msw.mswBrowserWorker as MswSetupWorkerApi;
  mswGraphql = msw.mswGraphql as MswGraphql;

  nina = (window.____nina || {}) as NinaGlobals;
  nina.mswBrowserWorker = mswBrowserWorker;
  nina.mswGraphql = mswGraphql;
  window.____nina = nina;
  mswBrowserWorker.start();

  mswBrowserWorker.use(
    getMswListBranchesGql({
      listBranches: {
        edges: [
          {
            node: mockBranchValue1,
          },
        ],
      } as any,
    }),

    getMswListBrandsGql({
      listBrands: {
        edges: [
          {
            node: mockBrandValue1,
          },
        ],
      } as any,
    }),

    getMswListCountriesAndCurrencies({
      listCountries: {
        edges: [
          {
            node: germanyCountry1,
          },
          {
            node: franceCountry1,
          },
        ],
      } as any,
      listCurrencies: [eurCcy1] as any,
    })
  );
}
