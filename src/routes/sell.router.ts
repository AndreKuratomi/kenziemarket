import { Router } from "express";

import {
  makeSell,
  listAllSells,
  listOneSell,
} from "../controllers/sell.controller";

// import {} from "../middlewares/..."

const route = Router();

export const sellRouter = () => {
  route.post("", makeSell);
  route.get("", listAllSells);
  route.get("/:id", listOneSell);
  return route;
};
