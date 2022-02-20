import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import config from "../config/jwt.config";
import User from "../entities/User";
import Cart from "../entities/Cart";
import UserRepository from "../repository/user.repository";
import CartRepository from "../repository/cart.repository";
import ErrorHandler from "../utils/errors";
import { areHeadersEnabled } from "../services/token.service";
import { ListUsersService, LoginUserService } from "../services/users.service";

export const registerUser = async (req: Request, res: Response) => {
  const UserCustomRepository = getCustomRepository(UserRepository);
  const CartCustomRepository = getCustomRepository(CartRepository);

  try {
    let { name, email, password, isAdm } = req.body;

    const emailAlreadyExists = await UserCustomRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new ErrorHandler("Email already registered!", 403);
    }

    const hashing = await bcrypt.hash(password as string, 10);
    password = hashing;

    const newBody = { name, email, password, isAdm };

    const user = UserCustomRepository.create(newBody);
    const newUser = await UserCustomRepository.save(user);

    const userCart = CartCustomRepository.create(newUser);
    const newCart = await CartCustomRepository.save(userCart);

    const { password: passaword_data, ...dataWithoutPassword } = newBody;

    return res.json(dataWithoutPassword);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await LoginUserService({ email, password });
    return res.json({ token: token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await ListUsersService();

    let nonSensitiveList = [];

    for (let count = 0; count < allUsers.length; count++) {
      const { password: passaword_data, ...dataWithoutPassword } =
        allUsers[count];
      nonSensitiveList.push(dataWithoutPassword);
    }

    return res.json(nonSensitiveList);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRepository = getRepository(User);
  try {
    if (id.length !== 36) {
      throw new ErrorHandler("Id must be uuid!", 404);
    }

    const userId = await userRepository.findOne({ id });
    if (!userId) {
      throw new ErrorHandler("No user found!", 404);
    }

    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const userWithThisId = await userRepository.findOne({ id: tokenId });
        if (!userWithThisId) {
          throw new ErrorHandler("No user found!", 404);
        }
      }
    );

    const isValidAdm = await userRepository.find({ isAdm: true });

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        try {
          for (let i = 0; i < isValidAdm.length; i++) {
            if (isValidAdm[i].id === decoded.id) {
              return res.json(userId);
            }
          }

          if (decoded.id === id) {
            const user = await userRepository.findOne({ id });

            return res.json(user);
          } else {
            throw new ErrorHandler(
              "Only admins may list non self-profiles!",
              400
            );
          }
        } catch (error: any) {
          res.status(error.statusCode).json({ message: error.message });
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
