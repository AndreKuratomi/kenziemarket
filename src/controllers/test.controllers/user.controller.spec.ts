import { createConnection, getConnection } from "typeorm";
import request from "supertest";
import { bcrypt } from "../../types/types";

import app from "../../app";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
jest.mock("createdOn", () => "createdOn"); //COMO MOCKAR UM DATE()???
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

  it("Should be able not to return password from users's data response and have properties UUid and createdOn", async () => {
    const data = {
      name: "André",
      email: "teste@mail.com",
      password: "1234",
      isAdm: true,
    };

    const responseData = {
      id: "uuid",
      name: "André",
      email: "teste2@mail.com",
      isAdm: true,
      createdOn: "createdOn",
    };

    const response = await request(app).post("/user").send(data).expect(200);

    expect(response).toHaveProperty("id");
    expect(response.body.id).toBe("uuid");
    expect(response).not.toHaveProperty("password");
    expect(response.body).toBe(responseData);
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
    const responseData = {
      id: "uuid",
      name: "André",
      email: "teste2@mail.com",
      isAdm: true,
      createdOn: "createdOn",
    };

    const response = await request(app).get(`/user/${"uuid"}`).expect(200);

    expect(response).toBe([responseData]);
  });
});
