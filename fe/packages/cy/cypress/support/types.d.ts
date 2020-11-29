/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/triple-slash-reference*/

declare global {
  interface Window {
    Cypress: {
      env: <T>(k?: string, v?: T) => void | T;
    };
  }
}

declare namespace Cypress {
  interface Chainable {
    checkoutSession: () => Chainable;
  }
}
