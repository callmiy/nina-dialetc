import { render } from "@testing-library/svelte";
import App from "../Item/Item.svelte";

test("it renders component", () => {
  render(App, {
    props: { name: "me" },
  })

  const domMain = document.getElementById("app-main") as HTMLElement;
  expect(domMain.textContent).toBe("Hello me");

  const domCount = document.getElementById("app-count") as HTMLElement;
  expect(domCount.textContent).toBe("1");
});
