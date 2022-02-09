import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Product } from "../entities/Product";
import { User } from "../entities/User";

export const createCart = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllCarts = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneCart = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
