import { Elysia } from "elysia";

import { usersMeController } from "./features/me";

export const usersController = new Elysia({
  name: "users-controller",
  tags: ["Users"],
  prefix: "/users",
}).use([usersMeController]);
