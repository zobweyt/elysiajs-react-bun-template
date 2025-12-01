import { jwt as createElysiaJwt } from "@elysiajs/jwt";

export const jwt = createElysiaJwt({
  name: "jwt",
  secret: process.env.JWT_SECRET ?? Bun.randomUUIDv7("base64"),
});
