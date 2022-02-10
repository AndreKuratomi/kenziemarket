import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import ErrorHandler from "../utils/errors";

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

    if (!tokenItself) {
      throw new ErrorHandler("No token found!", 404);
    }

    jwt.verify(tokenItself, config.secret as string, (err: any) => {
      if (err) {
        throw new ErrorHandler("Invalid token!", 401);
      }
    });

    // Coisas de Admin

    const isValidAdm = await userRepository.find({ isAdm: true });

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            // Coisas do registro
            const newProduct = productRepository.create({ name, type, price });

            await productRepository.save(newProduct);
            return res.json(newProduct);
          }
        }
        // POR QUE NÃO ESTÁ RETORNANDO????
        // throw new ErrorHandler("This user is not an administrator!", 401);
        res.status(401).json({ message: "This user is not an administrator!" });
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllProducts = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);

  try {
    const allProducts = await productRepository.find();

    return res.json(allProducts);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productRepository = getRepository(Product);

  try {
    if (!id) {
      throw new ErrorHandler("No id found!", 404);
    }

    const product = await productRepository.findOne({ id });
    if (!product) {
      throw new ErrorHandler("No product found!", 404);
    }

    return res.json(product);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
