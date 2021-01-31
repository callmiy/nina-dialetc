export async function getBranchComponent() {
  const c = await import("../branch/branch.svelte");
  return c.default;
}
