import { createConnection, getConnection } from "typeorm";
import request from "supertest";
import { bcrypt } from "../../types/types";

import app from "../../app";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
jest.mock("createdOn", () => "createdOn");
// const spyCompare = jest.spyOn(bcrypt, "hash");
// // .mockImplementation(() => Promise.resolve(false));
// spyCompare.mockReturnValue();

describe("Register product", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to post product's data request and have properties id and createdOn in the response", async () => {
    const data = {
      name: "Cacho de bananas",
      type: "fruta",
      price: 5,
    };

    const responseData = {
      id: "uuid",
      name: "Cacho de bananas",
      type: "fruta",
      price: 5,
      createdOn: "createdOn",
    };

    const response = await request(app).post("/product").send(data).expect(201);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("createdOn");
    expect(response).toBe(responseData);
  });
});
