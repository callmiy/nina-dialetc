/* istanbul ignore file */
import { fireEvent } from "@testing-library/svelte";

export function fillFieldChange(element: Element, value: string) {
  fireEvent.change(element, {
    target: { value },
  });
}

export function fillFieldInput(element: Element, value: string) {
  fireEvent.input(element, {
    target: { value },
  });
}

export function getById<T extends HTMLElement = HTMLElement>(domId: string) {
  return document.getElementById(domId) as T;
}
