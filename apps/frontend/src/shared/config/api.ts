import { treaty } from "@elysiajs/eden";

import type { app } from "@acme/backend";

export const api = treaty<typeof app>("localhost:3000", {
  fetch: { credentials: "include" },
});
