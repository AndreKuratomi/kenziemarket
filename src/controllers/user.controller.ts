import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";

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
};

export const listOneUser = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};
