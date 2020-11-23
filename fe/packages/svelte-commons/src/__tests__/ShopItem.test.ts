import { render } from "@testing-library/svelte";
import ShopBrand from "../ShopBrand/ShopBrand.svelte";
import { shopBrandDomId } from "@talat/commons/src/shop-brand-dom";

test("it renders `ShopBrand` component", () => {
  render(ShopBrand, {
    props: { name: "me" },
  });

  const elm = document.getElementById(shopBrandDomId) as HTMLElement;
  expect(elm).not.toBeNull();
});
