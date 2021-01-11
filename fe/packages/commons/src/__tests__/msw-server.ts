import { setupServer } from "msw/node";
import { handlers } from "./msw-handlers";

// Setup requests interception using the given handlers.
export const mswServer = setupServer(...handlers);
