import { createConnection, getConnection } from "typeorm";

import {
  RegisterProductService,
  ListProductsService,
} from "../product.service";

// describe("Register product", () => {
//   beforeAll(async () => {
//     await createConnection();
//   });

//   afterAll(async () => {
//     const defaultConnection = getConnection("default");
//     await defaultConnection.close();
//   });

//   it("Should be able to return the same data requested", async () => {
//     const data = {
//       name: "Cacho de bananas",
//       type: "fruta",
//       price: 5,
//     };

//     const object = await RegisterProductService(data);

//     expect(object).toHaveProperty("price");
//     expect(object).toEqual({
//       name: expect.any(String),
//       type: expect.any(String),
//       price: expect.any(Number),
//     });
//   });
// });

// describe("List products", () => {
//   beforeAll(async () => {
//     await createConnection();
//   });

//   afterAll(async () => {
//     const defaultConnection = getConnection("default");
//     await defaultConnection.close();
//   });

//   it("Should be able to return the list of all products", async () => {
//     const allProducts = await ListProductsService();

//     expect(allProducts).toEqual(expect.any(Array));
//   });
// });
