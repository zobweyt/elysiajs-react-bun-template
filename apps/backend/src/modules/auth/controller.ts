import { Elysia } from "elysia";

import { authLoginController } from "./features/login";
import { authLogoutController } from "./features/logout";
import { authRegisterController } from "./features/register";

export const authController = new Elysia({
  name: "auth",
  tags: ["Auth"],
  prefix: "/auth",
}).use([authRegisterController, authLoginController, authLogoutController]);
