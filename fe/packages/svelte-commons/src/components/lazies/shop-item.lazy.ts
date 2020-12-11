export async function getShopItemComponent() {
  const c = await import("../shop-item/shop-item.svelte");
  return c.default;
}
