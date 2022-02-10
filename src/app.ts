import express, { Express } from "express";
import { allRoutes } from "./routes";

const app: Express = express();

app.use(express.json());
allRoutes(app);

export default app;
