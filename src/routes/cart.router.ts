import { Router } from "express";

import {
  addToCart,
  listAllCarts,
  // listOneCart,
  // deleteCart,
} from "../controllers/cart.controller";
import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

// import {} from "../middlewares/..."

const route = Router();

export const cartRouter = () => {
  route.post("", isTokenValid, addToCart);
  route.get("", isTokenValid, listAllCarts);
  // route.get("/:id", isTokenValid, listOneCart);
  // route.delete("/:id/:product_id", isTokenValid, deleteCart);
  return route;
};
