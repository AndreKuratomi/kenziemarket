import { createConnection, getConnection } from "typeorm";
import * as bcrypt from "bcrypt";

import {
  LoginUserService,
  ListUsersService,
  RegisterUserService,
} from "../users.service";

const spyCompare = jest.spyOn(bcrypt, "hash");
// ERRO NO PARÂMETRO DE .MOCKERETURNVALUE. DIZ QUE O TIPO É VOID
// spyCompare.mockReturnValue("1234");

describe("Register user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return a token typen string", async () => {
    const data = {
      name: "André",
      email: "teste@mail.com",
      password: "1234",
      isAdm: true,
    };

    const object = await RegisterUserService(data);

    expect(object).toHaveProperty("isAdm");
    expect(object.password).not.toBe("123");
    expect(object.password).toBe("1234");
    expect(object).toBe(data);
  });
});

describe("Login user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return a token typen string", async () => {
    const data = { email: "teste@mail.com", password: "1234" };

    const token = await LoginUserService(data);

    expect(token).toBe("string");
  });
});

describe("List users", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return the list of all users", async () => {
    const allUsers = await ListUsersService();

    expect(allUsers).toHaveProperty("map");
  });
});
