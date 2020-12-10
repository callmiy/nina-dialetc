export async function getBrandComponent() {
  const c = await import("../brand/brand.svelte");
  return c.default;
}
