import { Router } from "express";

import {
  addToCart,
  listAllCarts,
  listOneCart,
  // deleteCart,
} from "../controllers/cart.controller";

// import {} from "../middlewares/..."

const route = Router();

export const cartRouter = () => {
  route.post("", addToCart);
  route.get("", listAllCarts);
  route.get("/:id", listOneCart);
  // route.delete("/:id/:product_id", deleteCart);
  return route;
};
