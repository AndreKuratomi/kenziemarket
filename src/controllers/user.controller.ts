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
};

export const listUsers = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};

export const listOneUser = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};
