export function getTotalPrice(
  unitPrice: string | number,
  quantity: string | number
) {
  let u = +unitPrice;
  u = isNaN(u) ? 0 : u;

  let q = +quantity;
  q = isNaN(q) ? 0 : q;
  const totalPrice = u * q;

  if (totalPrice) {
    const totalPriceStr = new Intl.NumberFormat(
      // "en-US",
      undefined,
      {
        // style: "currency",
        // currency: "USD",
        maximumFractionDigits: 2,
        // minimumFractionDigits: 2,
      }
    ).format(totalPrice);

    const [whole, decimal] = totalPriceStr.split(".");
    const decimalPart = decimal ? decimal.padEnd(2, "0") : "00";

    return `${whole}.${decimalPart}`;
  }

  return "";
}
