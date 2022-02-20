import { createConnection, getConnection } from "typeorm";
import { ListUsersService } from "../users.service";

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
