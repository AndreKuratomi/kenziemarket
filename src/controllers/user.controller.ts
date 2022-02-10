import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import config from "../config/jwt.config";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import ErrorHandler from "../utils/errors";

interface IUserBody {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export const registerUser = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
  const { name, email, password, isAdm } = req.body;

  const userRepository = getRepository(User);
  const user = userRepository.create({ name, email, password, isAdm });

  await userRepository.save(user);
  res.send(user);
};

export const loginUser = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
  const { email, password } = req.body;

  const auth = req.headers.authorization;

  if (auth === undefined) {
    throw new ErrorHandler("Headers unabled!", 400);
  }

  const tokenItself = auth.split(" ")[1];

  jwt.verify(tokenItself, config.secret as string, (err: any) => {
    if (err) {
      throw new ErrorHandler("Invalid token!", 401);
    }
  });

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
};

export const listUsers = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}

  // Coisas de token
  const auth = req.headers.authorization;

  if (auth === undefined) {
    throw new ErrorHandler("Headers unabled!", 400);
  }

  const tokenItself = auth.split(" ")[1];

  jwt.verify(tokenItself, config.secret as string, (err: any) => {
    if (err) {
      throw new ErrorHandler("Invalid token!", 401);
    }
  });

  // Coisas de Admin
  const usersRepository = getRepository(User);

  const isValidAdm = await usersRepository.find({ isAdm: true });
  // try {
  jwt.verify(tokenItself, config.secret as string, (error, decoded: any) => {
    for (let i = 0; i < isValidAdm.length; i++) {
      if (isValidAdm[i].id === decoded.id) {
        // return "";
        // Coisas da listagem
        const allUsers = usersRepository.find();

        return allUsers;
      }
    }

    throw new ErrorHandler("This user is not an administrator!", 401);
  });
};

export const listOneUser = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}

  const { id } = req.params;

  const userRepository = getRepository(User);

  // Coisas de token
  const auth = req.headers.authorization;

  if (auth === undefined) {
    throw new ErrorHandler("Headers unabled!", 400);
  }

  const tokenItself = auth.split(" ")[1];

  jwt.verify(tokenItself, config.secret as string, (err: any) => {
    if (err) {
      throw new ErrorHandler("Invalid token!", 401);
    }
  });

  jwt.verify(
    tokenItself,
    config.secret as string,
    async (err, decoded: any) => {
      const tokenId = decoded.id;
      const userProfile = await userRepository.findOne({ id: tokenId });
      if (!userProfile) {
        throw new ErrorHandler("No user found!", 404);
      }
    }
  );

  // Coisas de Admin
  const isValidAdm = await userRepository.find({ isAdm: true });
  // try {
  jwt.verify(
    tokenItself,
    config.secret as string,
    async (error, decoded: any) => {
      for (let i = 0; i < isValidAdm.length; i++) {
        if (isValidAdm[i].id === decoded.id) {
          // return "";
          // Coisas da listagem
          const user = await userRepository.findOne({ id });

          return user;
        }
      }

      if (decoded.id === id) {
        const user = await userRepository.findOne({ id });

        return user;
      } else if (decoded.id !== id) {
        throw new ErrorHandler(
          "Only admins may update non self-profiles!",
          401
        );
      }
    }
  );
};
