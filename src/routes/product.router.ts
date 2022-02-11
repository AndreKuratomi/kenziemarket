import { Router } from "express";

import {
  registerProduct,
  listAllProducts,
  listOneProduct,
} from "../controllers/product.controller";

import { isUserAdmn } from "../middlewares/admin.middlewares";
import { isTokenValid } from "../middlewares/tokenCheck.middlewares";

const route = Router();

export const productRouter = () => {
  route.post("", isTokenValid, isUserAdmn, registerProduct);
  route.get("", listAllProducts);
  route.get("/:id", listOneProduct);
  return route;
};
