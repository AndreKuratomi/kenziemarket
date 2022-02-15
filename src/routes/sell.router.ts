import { Router } from "express";

import {
  makeSell,
  listAllSells,
  listOneSell,
} from "../controllers/sell.controller";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

const route = Router();

export const sellRouter = () => {
  route.post("", isTokenValid, makeSell);
  route.get("", isTokenValid, listAllSells);
  route.get("/:id", isTokenValid, listOneSell);
  return route;
};
