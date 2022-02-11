import { Router } from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  listOneUser,
} from "../controllers/user.controller";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

const route = Router();

export const userRouter = () => {
  route.post("", registerUser);
  route.post("/login", loginUser);
  route.get("", isTokenValid, listUsers);
  route.get("/:id", isTokenValid, listOneUser);
  return route;
};
