export async function getArticleComponent() {
  const c = await import("../article/article.svelte");
  return c.default;
}
