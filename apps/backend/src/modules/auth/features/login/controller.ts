import { Elysia, StatusMap, t } from "elysia";

import { jwt } from "@acme/backend/shared/jwt";

import { AUTH_COOKIE_OPTIONS } from "../../shared/config";
import { authModel } from "../../shared/model";
import { AuthLoginInvalidCredentialsError } from "./errors";
import { authLoginModel } from "./model";
import { loginUser } from "./service";

export const authLoginController = new Elysia({
  name: "auth-login-controller",
  prefix: "/login",
})
  .use([jwt, authModel, authLoginModel])
  .post(
    "",
    async ({ set, jwt, body, cookie, status }) => {
      try {
        const user = await loginUser(body);
        const token = await jwt.sign({ sub: user.id });

        cookie.auth.set({ ...AUTH_COOKIE_OPTIONS, value: token });

        set.status = "No Content";
      } catch (error) {
        if (error instanceof AuthLoginInvalidCredentialsError) {
          return status("Unauthorized", error);
        }
        return status("Bad Request", error);
      }
    },
    {
      body: "AuthLoginBody",
      cookie: "AuthCookieOptional",
      detail: {
        summary: "Login user",
        description: "Authenticate user and set authentication cookie",
      },
      response: {
        [StatusMap["No Content"]]: t.Void({
          description: "Login success",
        }),
        [StatusMap.Unauthorized]: t.Unknown({
          description: "Invalid username or password",
        }),
        [StatusMap["Bad Request"]]: t.Unknown({
          description: "Unknown error",
        }),
      },
    },
  );
