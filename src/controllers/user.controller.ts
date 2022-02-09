import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";

export const registerUser = async () => {
  const userRepository = getRepository(User);
};

export const loginUser = async () => {};

export const listUsers = async () => {};

export const listOneUser = async () => {};
