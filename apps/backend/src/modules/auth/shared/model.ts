import { Elysia } from "elysia";

import { authCookieOptionalSchema, authCookieSchema } from "./schema";

export const authModel = new Elysia().model({
  AuthCookie: authCookieSchema,
  AuthCookieOptional: authCookieOptionalSchema,
});
