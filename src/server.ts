import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

const PORT = 3000;

createConnection()
  .then(() => {
    console.log("Database connected!");
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
