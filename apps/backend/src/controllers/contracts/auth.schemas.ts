import { Elysia, t } from "elysia";

export const authCookieSchema = t.Cookie({ auth: t.String() });
export const authCookieOptionalSchema = t.Cookie({
  auth: t.Optional(t.String()),
});

export const authLoginBodySchema = t.Object({
  username: t.String({ examples: ["username"] }),
  password: t.String({ examples: ["password"] }),
});

export const authRegisterBodySchema = t.Object({
  username: t.String({ minLength: 2, maxLength: 32, examples: ["username"] }),
  password: t.String({ minLength: 8, examples: ["password"] }),
});

export const authContracts = new Elysia({ name: "auth-contracts" }).model({
  AuthCookie: authCookieSchema,
  AuthCookieOptional: authCookieOptionalSchema,
  AuthLoginBody: authLoginBodySchema,
  AuthRegisterBody: authRegisterBodySchema,
});
