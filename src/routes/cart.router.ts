import { Router } from "express";

import {
  addToCart,
  listAllCarts,
  listOneCart,
  deleteCart,
} from "../controllers/cart.controller";

// import {} from "../middlewares/..."

const route = Router();

export const cartRouter = () => {
  route.post("/cart", addToCart);
  route.get("/cart", listAllCarts);
  route.get("/cart/:id", listOneCart);
  route.delete("/cart/:product_id", deleteCart);
  return route;
};
