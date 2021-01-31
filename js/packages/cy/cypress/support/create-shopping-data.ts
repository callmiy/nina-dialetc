import { CYPRESS_NINA_KEY, NinaGlobals } from "@ta/cm/src/types";
import {
  eurCcy1,
  franceCountry1,
  germanyCountry1,
  mockBranchValue1,
  mockBrandValue1,
} from "@ta/cm/src/__tests__/mock-data";
import {
  getMswListBranchesGql,
  getMswListBrandsGql,
  getMswListCountriesAndCurrencies,
} from "@ta/cm/src/__tests__/msw-handlers";

const nina = window.Cypress.env(CYPRESS_NINA_KEY) as NinaGlobals;

export async function getCreateShoppingData() {
  const { mswBrowserWorker } = nina;

  if (mswBrowserWorker) {
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
}
