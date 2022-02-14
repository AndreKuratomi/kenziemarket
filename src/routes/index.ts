import { Express } from "express";

import { userRouter } from "./user.router";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
// import { sellRouter } from "./sell.router";

export const allRoutes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/product", productRouter());
  app.use("/cart", cartRouter());
  // app.use("/buy", sellRouter());
};
