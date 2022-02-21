import { createConnection, getConnection } from "typeorm";
import request from "supertest";

// import {
//   LoginUserService,
//   ListUsersService,
//   RegisterUserService,
// } from "../../users.service";
// import IUserLogin from "../../types/types";
// import { Request, Response } from "express";
// import { registerUser } from "../user.controller";
import app from "../../app";

describe("Register user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able not to return password from users's data response", async () => {
    const data = {
      name: "André",
      email: "teste@mail.com",
      password: "1234",
      isAdm: true,
    };

    const response = await request(app).post("/user").send(data).expect(201);

    expect(response).not.toHaveProperty("password");
    expect(response).toBe({
      name: "André",
      email: "teste@mail.com",
      isAdm: true,
    });
  });
});

describe("List one user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return the list of the user", async () => {
    const data = {
      name: "André",
      email: "teste@mail.com",
      password: "1234",
      isAdm: true,
    };

    const response = await request(app).get("/user/:id").expect(200);

    expect(response).toBe({
      name: "André",
      email: "teste@mail.com",
      isAdm: true,
    });
  });
});
