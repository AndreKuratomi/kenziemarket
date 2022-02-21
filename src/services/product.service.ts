import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import config from "../config/jwt.config";
import ErrorHandler from "../utils/errors";
import { IProductRegister, IUserLogin, IUserRegister } from "../types/types";
import User from "../entities/User";
import UserRepository from "../repository/user.repository";
import ProductRepository from "../repository/product.repository";
import Product from "../entities/Product";

export const RegisterProductService = async ({
  name,
  type,
  price,
}: IProductRegister) => {
  const ProductCustomRepository = getCustomRepository(ProductRepository);

  const productAlreadyExists = await ProductCustomRepository.findOne({
    name,
  });

  if (productAlreadyExists) {
    throw new ErrorHandler("Product already registered!", 403);
  }

  const newProduct = { name, type, price };
  return newProduct;
};

export const ListProductsService = async () => {
  const productRepository = getRepository(Product);

  const allProducts = await productRepository.find();

  return allProducts;
};

export const ListOneProductService = async (id: string) => {
  const productRepository = getRepository(Product);

  if (!id) {
    throw new ErrorHandler("No id found!", 404);
  }
  if (id.length !== 36) {
    throw new ErrorHandler("Id must be uuid!", 404);
  }

  const product = await productRepository.findOne({ id });
  if (!product) {
    throw new ErrorHandler("No product found!", 404);
  }

  return product;
};
