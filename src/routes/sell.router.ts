import { Router } from "express";

import {
  makeSell,
  listAllSells,
  listOneSell,
} from "../controllers/sell.controller";

// import {} from "../middlewares/..."

const route = Router();

export const sellRouter = () => {
  route.post("/buy", makeSell);
  route.get("/buy", listAllSells);
  route.get("/buy/:id", listOneSell);
  return route;
};
