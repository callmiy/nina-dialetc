import { render } from "@testing-library/svelte";
import ShopItem from "../components/shop-item.svelte";
import { shopItemBrandNameInputId } from "@ta/cm/src/selectors";

declare let React: any;

jest.mock("../components/brand.svelte", () => {
  return {
    default: <div id="john">aa</div>,
  };
});

test("it renders `ShopItem` component", () => {
  render(ShopItem, {
    props: {},
  });

  const elm = document.getElementById(shopItemBrandNameInputId) as HTMLElement;
  expect(elm).not.toBeNull();
});
