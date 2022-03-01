import { Router } from "express";

import {
  makeSell,
  // listAllSells,
  // listOneSell,
} from "../controllers/sell.controller";
import { isUserAdmn } from "../middlewares/admin.middlewares";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

const route = Router();

export const sellRouter = () => {
  route.post("", isTokenValid, makeSell);
  // route.get("", isTokenValid, isUserAdmn, listAllSells);
  // route.get("/:id", isTokenValid, listOneSell);
  return route;
};
