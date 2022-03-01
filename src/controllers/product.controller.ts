import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";

import Product from "../entities/Product";
import User from "../entities/User";
import ErrorHandler from "../utils/errors";
import ProductRepository from "../repository/product.repository";
import CartRepository from "../repository/cart.repository";
import {
  ListOneProductService,
  ListProductsService,
  RegisterProductService,
} from "../services/product.service";

export const registerProduct = async (req: Request, res: Response) => {
  const ProductCustomRepository = getCustomRepository(ProductRepository);

  try {
    const newBody = await RegisterProductService(req.body);

    const { name, type, price } = newBody;
    const product = ProductCustomRepository.create({
      name,
      type,
      price,
    });
    const newProduct = await ProductCustomRepository.save(product);

    return res.json(newProduct);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllProducts = async (req: Request, res: Response) => {
  const allProducts = await ListProductsService();

  try {
    return res.json(allProducts);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ListOneProductService(id);

  try {
    return res.json(product);
  } catch (error: any) {
    res.status(456).json({ message: error.message });
  }
};
