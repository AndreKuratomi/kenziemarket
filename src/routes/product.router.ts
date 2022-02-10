import { Router } from "express";

import {
  registerProduct,
  listAllProducts,
  listOneProduct,
} from "../controllers/product.controller";

// import {} from "../middlewares/..."

const route = Router();

export const productRouter = () => {
  route.post("", registerProduct);
  route.get("", listAllProducts);
  route.get("/:id", listOneProduct);
  return route;
};
