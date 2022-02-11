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
    console.log(newUser);
    const userCart = CartCustomRepository.create(newUser);
    const newCart = await CartCustomRepository.save(userCart);
    console.log(newCart);

    return res.json({ newUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
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

    return res.json({ token: token });
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const usersRepository = getRepository(User);

    const allUsers = await usersRepository.find();
    return res.json(allUsers);
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
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            return res.json(userId);
          }
        }

        if (decoded.id === id) {
          const user = await userRepository.findOne({ id });

          return res.json(user);
        } else {
          // POR QUE NÃO ESTÁ RETORNANDO????
          // throw new ErrorHandler("Only admins may list non self-profiles!", 400);
          res
            .status(400)
            .json({ message: "Only admins may list non self-profiles!" });
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
