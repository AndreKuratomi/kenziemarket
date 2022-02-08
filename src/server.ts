import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

const PORT = 3000;

createConnection()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server running at port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
