import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import Product from "../entities/Product";
import User from "../entities/User";
import ErrorHandler from "../utils/errors";
import ProductRepository from "../repository/product.repository";

export const registerProduct = async (req: Request, res: Response) => {
  const { name, type, price } = req.body;

  const ProductCustomRepository = getCustomRepository(ProductRepository);
  const productRepository = getRepository(Product);
  const userRepository = getRepository(User);

  try {
    const productAlreadyExists = await productRepository.findOne({ name });

    if (productAlreadyExists) {
      throw new ErrorHandler("Product already registered!", 403);
    }

    const newProduct = ProductCustomRepository.create({
      name,
      type,
      price,
    });

    await ProductCustomRepository.save(newProduct);

    return res.json(newProduct);
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
    // if (id.length !== 36) {
    //   throw new ErrorHandler("Id must be uuid!", 404);
    // }

    const product = await productRepository.findOne({ id });
    if (!product) {
      throw new ErrorHandler("No product found!", 404);
    }

    return res.json(product);
  } catch (error: any) {
    res.status(456).json({ message: error.message });
  }
};
