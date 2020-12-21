import { getTotalPrice } from "../utils/get-total-price";

describe("getTotalPrice", () => {
  it("returns empty string when unit price not a number", () => {
    const totalPrice = getTotalPrice("", 45);
    expect(totalPrice).toBe("");
  });

  it("returns empty string when quantity not a number", () => {
    const totalPrice = getTotalPrice(5, "");
    expect(totalPrice).toBe("");
  });

  it("returns empty string when total price is zero", () => {
    const totalPrice1 = getTotalPrice(0, 5);
    expect(totalPrice1).toBe("");

    const totalPrice2 = getTotalPrice(5, 0);
    expect(totalPrice2).toBe("");
  });

  it("is formatted to 2 decimal places", () => {
    const totalPrice1 = getTotalPrice(3, 3);
    expect(totalPrice1).toBe("9.00");

    const totalPrice2 = getTotalPrice(3.1, 3);
    expect(totalPrice2).toBe("9.30");

    const totalPrice3 = getTotalPrice(3.1, 3.1);
    expect(totalPrice3).toBe("9.61");
  });
});
