import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HomePage } from "@acme/frontend/pages/home";
import { queryClient } from "@acme/frontend/shared/config/query";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The root element not found.");
}

const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // biome-ignore lint/suspicious/noAssignInExpressions: TODO
  const root = (import.meta.hot.data.root ??= createRoot(rootElement));
  root.render(app);
} else {
  createRoot(rootElement).render(app);
}
