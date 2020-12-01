/* istanbul ignore file */
import { fireEvent } from "@testing-library/svelte";

export async function fillField(element: Element, value: string) {
  await fireEvent.change(element, {
    target: { value },
  });
}
