import { render } from "@testing-library/svelte";
import ShopItem from "../ShopItem/ShopItem.svelte";
import { shopItemBrandNameInputId } from "@ta/cm/src/shop-item-dom";

declare let React: any;

jest.mock("../ShopBrand/ShopBrand.svelte", () => {
  return {
    default: <div id="john">aa</div>,
  };
});

test("it renders `ShopItem` component", () => {
  render(ShopItem, {
    props: { name: "me" },
  });

  const elm = document.getElementById(shopItemBrandNameInputId) as HTMLElement;
  expect(elm).not.toBeNull();
});
