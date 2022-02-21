import { createConnection, getConnection } from "typeorm";
// import * as bcrypt from "bcrypt";

import { bcrypt } from "../../types/types";

import {
  LoginUserService,
  ListUsersService,
  RegisterUserService,
} from "../users.service";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
// jest.mock("createdOn", () => "createdOn"); //??
const spyCompare = jest.spyOn(bcrypt, "hash");
// .mockImplementation(() => Promise.resolve(false));
// ERRO NO PARÂMETRO DE .MOCKERETURNVALUE. DIZ QUE O TIPO É VOID
spyCompare.mockReturnValue();
// está retornando o password hashed mas quero como acima
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

    const responseData = {
      name: "André",
      email: "teste2@mail.com",
      password: "1234",
      isAdm: true,
    };

    const object = await RegisterUserService(data);

    expect(object).toHaveProperty("isAdm");
    expect(object.password).not.toBe("123");
    expect(object).toBe(responseData);
    // expect(spyCompare).toBeCalledWith("1234");
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

    // expect(token).toBe("string");  NA VERDADE EU QUERIA UMA PROPRIEDADE DE EXPECT QUE IDENTIFICASSE O TIPO
    expect(token).toHaveProperty("split");
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

    // expect(allUsers).toBe(an array); NA VERDADE EU QUERIA UMA PROPRIEDADE DE EXPECT QUE IDENTIFICASSE O TIPO
    expect(allUsers).toHaveProperty("map");
  });
});
