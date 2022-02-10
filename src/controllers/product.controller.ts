import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export const registerProduct = async (req: Request, res: Response) => {
  const { name, type, price } = req.body;

  const productRepository = getRepository(Product);
  const userRepository = getRepository(User);

  try {
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

    const isValidAdm = await userRepository.find({ isAdm: true });
    // try {
    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            // Coisas do registro
            const newProduct = productRepository.create({ name, type, price });

            await productRepository.save(newProduct);
            res.send(newProduct);
          }
        }

        throw new ErrorHandler("This user is not an administrator!", 401);
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllProducts = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);

  try {
    const allProducts = productRepository.find();

    return allProducts;
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productRepository = getRepository(Product);

  try {
    const product = productRepository.findOne({ id });
    if (!product) {
      throw new ErrorHandler("No user found!", 404);
    }

    return product;
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
