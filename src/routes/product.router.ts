import { Router } from "express";

import {
  registerProduct,
  listAllProducts,
  listOneProduct,
} from "../controllers/product.controller";

// import {} from "../middlewares/..."

const route = Router();

export const productRouter = () => {
  route.post("/product", registerProduct);
  route.get("/product", listAllProducts);
  route.get("/product/:id", listOneProduct);
  return route;
};
