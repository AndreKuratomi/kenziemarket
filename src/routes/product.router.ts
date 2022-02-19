import { Router } from "express";

import {
  registerProduct,
  listAllProducts,
  listOneProduct,
} from "../controllers/product.controller";

import { isUserAdmn } from "../middlewares/admin.middlewares";
import { validateSchema } from "../middlewares/schemas.middlewares";
import { isTokenValid } from "../middlewares/tokenCheck.middlewares";
import { ProductRegisterSchema } from "../schemas/product.register.schema";

const route = Router();

export const productRouter = () => {
  route.post(
    "",
    // validateSchema(ProductRegisterSchema),
    isTokenValid,
    isUserAdmn,
    registerProduct
  );
  route.get("", listAllProducts);
  route.get("/:id", listOneProduct);
  return route;
};
