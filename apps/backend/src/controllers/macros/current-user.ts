import { Elysia } from "elysia";

import { jwt } from "@acme/backend/http/plugins/jwt";

import type { UserRepository } from "../../domain/users/user.repository";
import { authContracts } from "../contracts/auth.schemas";

export const createCurrentUserMacro = (users: UserRepository) =>
  new Elysia({ name: "current-user-macro" })
    .use([jwt, authContracts])
    .macro("currentUser", {
      cookie: "AuthCookie",
      resolve: async ({ jwt, cookie, status }) => {
        const payload = await jwt.verify(cookie.auth.value);

        if (!payload || !payload.sub) {
          return status("Unauthorized");
        }

        const currentUser = await users.findById(payload.sub);

        if (!currentUser) {
          return status("Unauthorized");
        }

        return { currentUser };
      },
    });
