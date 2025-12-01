import type { CookieOptions } from "elysia";

export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 30 * 86400,
  path: "/",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};
