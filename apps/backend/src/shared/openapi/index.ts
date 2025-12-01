import { openapi as createElysiaOpenapi, fromTypes } from "@elysiajs/openapi";
import { name, version } from "package.json";

export const openapi = createElysiaOpenapi({
  path: "/docs",
  references: fromTypes("./src/index.ts"),
  scalar: {
    layout: "modern",
    defaultOpenAllTags: true,
    theme: "default",
    hideClientButton: true,
    showSidebar: true,
    showDeveloperTools: "localhost",
    showToolbar: "localhost",
    operationTitleSource: "summary",
    persistAuth: true,
    telemetry: false,
    isEditable: false,
    isLoading: false,
    hideModels: false,
    documentDownloadType: "both",
    hideTestRequestButton: false,
    hideSearch: false,
    showOperationId: false,
    hideDarkModeToggle: false,
    withDefaultFonts: true,
    expandAllModelSections: false,
    expandAllResponses: false,
    orderSchemaPropertiesBy: "alpha",
    orderRequiredPropertiesFirst: true,
    default: false,
  },
  documentation: {
    info: {
      title: name,
      version: version,
    },
    components: {
      securitySchemes: {
        auth: {
          type: "apiKey",
          in: "cookie",
          name: "auth",
          description: "Authentication via session cookie",
        },
      },
    },
  },
});
