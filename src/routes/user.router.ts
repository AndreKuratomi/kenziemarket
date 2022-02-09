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
  route.post("/user", registerUser);
  route.post("/login", loginUser);
  route.get("/user", listUsers);
  route.get("/user/:id", listOneUser);
  return route;
};
