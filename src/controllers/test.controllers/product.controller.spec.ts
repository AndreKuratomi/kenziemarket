import { createConnection, getConnection } from "typeorm";
import request from "supertest";
import { bcrypt } from "../../types/types";

import app from "../../app";
import { ListOneProductService } from "../../services/product.service";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
// jest.mock("createdOn", () => "createdOn"); //COMO MOCKAR UM DATE()???

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

describe("List one product", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  it("Should be able to return the list of one product by id", async () => {
    const responseData = {
      id: "uuid",
      name: "Cacho de bananas",
      type: "fruta",
      price: 5,
      createdOn: "createdOn",
    };

    const response = await request(app).get(`/product/${"uuid"}`).expect(200);
    expect(response).toBe([responseData]);
    expect(response).toHaveProperty("indexOf");
  });
});
