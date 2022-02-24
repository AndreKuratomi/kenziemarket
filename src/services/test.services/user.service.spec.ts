import { createConnection, getConnection } from "typeorm";
// import * as bcrypt from "bcrypt";

import { bcrypt } from "../../types/types";

import {
  LoginUserService,
  ListUsersService,
  RegisterUserService,
} from "../users.service";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
const spyCompare = jest.spyOn(bcrypt, "hash"); // NÃO TEM EFEITO
// .mockImplementation(() => Promise.resolve(false));

spyCompare.mockReturnValue();

describe("Register user", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return the same data requested", async () => {
    const data = {
      name: "André",
      email: "teste2@mail.com",
      password: "1234",
      isAdm: true,
    };

    const object = await RegisterUserService(data);

    expect(object).toHaveProperty("isAdm");
    expect(object.password).not.toHaveLength(60);
    expect(spyCompare).toBe(bcrypt);
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

    expect(token).toHaveProperty("split");
    expect(token).toEqual(expect.any(String));
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
