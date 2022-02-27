import express, { Express } from "express";
import dotenv from "dotenv";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import { allRoutes } from "./routes";
import { handleError } from "./middlewares/errors.middlewares";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);
allRoutes(app);
app.use(handleError);

export default app;
