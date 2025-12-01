import { Elysia, StatusMap, t } from "elysia";

import { jwt } from "@acme/backend/shared/jwt";

import { AUTH_COOKIE_OPTIONS } from "../../shared/config";
import { authModel } from "../../shared/model";
import { AuthRegisterConflictError } from "./errors";
import { authRegisterModel } from "./model";
import { registerUser } from "./service";

export const authRegisterController = new Elysia({
  name: "auth-register-controller",
  prefix: "/register",
})
  .use([jwt, authModel, authRegisterModel])
  .post(
    "",
    async ({ set, jwt, body, cookie, status }) => {
      try {
        const user = await registerUser(body);
        const token = await jwt.sign({ sub: user.id });

        cookie.auth.set({ ...AUTH_COOKIE_OPTIONS, value: token });

        set.status = "No Content";
      } catch (error) {
        if (error instanceof AuthRegisterConflictError) {
          return status("Conflict", error);
        }
        return status("Bad Request", error);
      }
    },
    {
      body: "AuthRegisterBody",
      cookie: "AuthCookieOptional",
      detail: {
        summary: "Register a new user",
        description:
          "Creates a new user account and sets authentication cookie",
      },
      response: {
        [StatusMap["No Content"]]: t.Void({
          description: "Register success",
        }),
        [StatusMap.Conflict]: t.Unknown({
          description: "User already exists",
        }),
        [StatusMap["Bad Request"]]: t.Unknown({
          description: "Unknown error",
        }),
      },
    },
  );
