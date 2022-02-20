import express, { Express } from "express";
import dotenv from "dotenv";

import { allRoutes } from "./routes";
import { handleError } from "./middlewares/errors.middlewares";

dotenv.config();

const app: Express = express();

app.use(express.json());
allRoutes(app);
app.use(handleError);

export default app;
