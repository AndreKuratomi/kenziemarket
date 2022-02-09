import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";

export const makeSell = async (req: Request, res: Response) => {
  // pegar a compra pelo token do usuário
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};

export const listAllSells = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};

export const listOneSell = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};
