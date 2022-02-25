import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import config from "../config/jwt.config";
import ErrorHandler from "../utils/errors";
import { IUserLogin, IUserRegister } from "../types/types";
import User from "../entities/User";
import UserRepository from "../repository/user.repository";

export const RegisterUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRegister) => {
  const UserCustomRepository = getCustomRepository(UserRepository);

  const emailAlreadyExists = await UserCustomRepository.findOne({ email });

  if (emailAlreadyExists) {
    throw new ErrorHandler("Email already registered!", 403);
  }

  const hashing = await bcrypt.hash(password as string, 10);
  password = hashing;

  const newBody = { name, email, password, isAdm };

  return newBody;
};

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
