import { render } from "@testing-library/svelte";
import App from "../Item/Item.svelte";

test("it renders component", () => {
    render(App, {
        props: { name: "me" },
    });
    const domMain = document.getElementById("app-main");
    expect(domMain.textContent).toBe("Hello me");
    const domCount = document.getElementById("app-count");
    expect(domCount.textContent).toBe("1");
});
