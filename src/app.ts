import express, { Express } from "express";
import { allRoutes } from "./routes";
import { handleError } from "./middlewares/errors.middlewares";

const app: Express = express();

app.use(express.json());
allRoutes(app);
app.use(handleError);

export default app;
