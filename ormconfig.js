const dotenv = require("dotenv");

dotenv.config();

const devEnv = {
  type: "postgres",
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5430,
  database: process.env.PG_DB,
  // "database": "kenzie_market",
  synchronize: false,
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/**/*.ts"],
  subscribers: ["./src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "./src/entities",
    migrationsDir: "./src/migrations",
    subscribersDir: "./src/subscriber",
  },
};

const testEnv = {
  type: "postgres",
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5431,
  database: process.env.PG_DB_TEST,
  // "database": "tests",
  synchronize: false,
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/**/*.ts"],
  subscribers: ["./src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "./src/entities",
    migrationsDir: "./src/migrations",
    subscribersDir: "./src/subscriber",
  },
};

let exportModule = undefined;
if (process.env.NODE_ENV === "supertest") {
  exportModule = testEnv;
} else {
  exportModule = devEnv;
}

module.exports = exportModule;
