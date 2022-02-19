import { Router } from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  listOneUser,
} from "../controllers/user.controller";
import { isUserAdmn } from "../middlewares/admin.middlewares";
import { validateSchema } from "../middlewares/schemas.middlewares";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";
import { LoginSchema } from "../schemas/login.schema";
import { UserRegisterSchema } from "../schemas/user.register.schema";

const route = Router();

export const userRouter = () => {
  route.post(
    "",
    // , validateSchema(UserRegisterSchema)
    registerUser
  );
  route.post(
    "/login",
    // , validateSchema(LoginSchema)
    loginUser
  );
  route.get("", isTokenValid, isUserAdmn, listUsers);
  route.get("/:id", isTokenValid, listOneUser);
  return route;
};
