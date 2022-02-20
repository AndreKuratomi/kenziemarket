import { createConnection, getConnection } from "typeorm";
import { LoginUserService } from "../users.service";
import IUserLogin from "../../types/types";
import { Request, Response } from "express";

describe("Login user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  // it("Should be able to return a token typen string", async (req: Request) => {
  //   const { email, password } = req.body;

  //   const token = await LoginUserService({ email, password });

  //   expect(token).toBe("string");
  // });
});
