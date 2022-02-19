import { Router } from "express";

import {
  addToCart,
  listAllCarts,
  listOneCart,
  deleteFromCart,
} from "../controllers/cart.controller";

import { isTokenValid } from "../middlewares/tokenCheck.middlewares";
import { isUserAdmn } from "../middlewares/admin.middlewares";
import { validateSchema } from "../middlewares/schemas.middlewares";
import { AddToCartSchema } from "../schemas/cart.add.schema";

const route = Router();

export const cartRouter = () => {
  route.post(
    "",
    // , validateSchema(AddToCartSchema)
    isTokenValid,
    addToCart
  );
  route.get("", isTokenValid, isUserAdmn, listAllCarts);
  route.get("/:id", isTokenValid, listOneCart);
  route.delete("/:id/:product_id", isTokenValid, deleteFromCart);
  return route;
};
