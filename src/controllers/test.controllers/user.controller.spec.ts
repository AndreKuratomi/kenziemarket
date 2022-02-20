import { createConnection, getConnection } from "typeorm";

import {
  LoginUserService,
  ListUsersService,
  RegisterUserService,
} from "../users.service";
import IUserLogin from "../../types/types";
import { Request, Response } from "express";
import { registerUser } from "../user.controller";

describe("Register user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return password from users's data response", async () => {
    const data = {
      name: "André",
      email: "teste@mail.com",
      password: "1234",
      isAdm: true,
    };

    const object = await registerUser(req, res);

    const response = await req;

    expect(object).not.toHaveProperty("password");
    expect(object).toBe({
      name: "André",
      email: "teste@mail.com",
      isAdm: true,
    });
  });
});
