const devEnv = {
  type: "postgres",
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5430,
  database:
    process.env.NODE_ENV === "supertest"
      ? "NODE_ENV=test jest"
      : process.env.PG_DB,
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
