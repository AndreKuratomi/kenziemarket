import { Router } from "express";

import {
  registerUser,
  loginUser,
  listUsers,
  listOneUser,
} from "../controllers/user.controller";

// import {} from "../middlewares/..."

const route = Router();

export const userRouter = () => {
  route.post("", registerUser);
  route.post("/login", loginUser);
  route.get("", listUsers);
  route.get("/:id", listOneUser);
  return route;
};
