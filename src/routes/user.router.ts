import { Router } from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  listOneUser,
} from "../controllers/user.controller";
import { isUserAdmn } from "../middlewares/admin.middlewares";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

const route = Router();

export const userRouter = () => {
  route.post("", registerUser);
  route.post("/login", loginUser);
  route.get("", isTokenValid, isUserAdmn, listUsers);
  route.get("/:id", isTokenValid, listOneUser);
  return route;
};
