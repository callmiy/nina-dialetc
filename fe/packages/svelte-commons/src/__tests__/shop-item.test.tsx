/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from "@testing-library/svelte";
import ShopItem from "../components/shop-item/shop-item.svelte";
import {
  shopItemBrandNameInputId,
  shopItemAddBrandId,
  shopItemAddBranchId,
} from "@ta/cm/src/selectors";
import { getById } from "@ta/cm/src/__tests__/utils-dom";

declare let React: any;

jest.mock("../components/lazies/brand.lazy", () => {
  return {
    getBrandComponent: () => {
      return (
        <div id="john" onClick={(e) => e}>
          aa
        </div>
      );
    },
  };
});

jest.mock("../components/lazies/branch.lazy", () => {
  return {
    getBranchComponent: () => <div id="branch">aa</div>,
  };
});

it("it renders `ShopItem` component", async () => {
  const { debug } = render(ShopItem, {
    props: {},
  });

  const elm = document.getElementById(shopItemBrandNameInputId) as HTMLElement;
  expect(elm).not.toBeNull();

  const addBrandEl = getById(shopItemAddBrandId);
  await addBrandEl.click();

  const j = getById("john");
  j.click();

  const addBranchEl = getById(shopItemAddBranchId);
  await addBranchEl.click();
});
