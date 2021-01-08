import { setupServer } from "msw/node";

// Setup requests interception using the given handlers, but we will set up
// handler per test
export const mswServer = setupServer();
