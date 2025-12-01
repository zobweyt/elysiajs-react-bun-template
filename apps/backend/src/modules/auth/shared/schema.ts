import { t } from "elysia";

export const authCookieSchema = t.Cookie({ auth: t.String() });

export type AuthCookieSchema = typeof authCookieSchema.static;

export const authCookieOptionalSchema = t.Cookie({
  auth: t.Optional(t.String()),
});

export type AuthCookieOptionalSchema = typeof authCookieOptionalSchema.static;
