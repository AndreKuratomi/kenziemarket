import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import config from "../config/jwt.config";
import User from "../entities/User";
import ErrorHandler from "../utils/errors";
import IUserLogin from "../types/types";

export const LoginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = getRepository(User);

  const doesUserExist = await userRepository.findOne({ email });

  if (doesUserExist === undefined) {
    throw new ErrorHandler("No user found!", 401);
  }

  const doesPasswordMatch = await bcrypt.compare(
    password,
    doesUserExist.password
  );

  if (!doesPasswordMatch) {
    throw new ErrorHandler("Given password mismatch!", 401);
  }

  const id = doesUserExist.id;

  const token: string = jwt.sign({ id }, config.secret as string, {
    expiresIn: config.expiresIn,
  });

  return token;
};

export const ListUsersService = async () => {
  const usersRepository = getRepository(User);

  const allUsers = await usersRepository.find();

  return allUsers;
};
