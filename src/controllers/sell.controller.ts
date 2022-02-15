import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import User from "../entities/User";
import Product from "../entities/Product";
import Cart from "../entities/Cart";
import Sell from "../entities/Sell";
import ErrorHandler from "../utils/errors";
import { areHeadersEnabled } from "../services/token.service";

export const makeSell = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const sellRepository = getRepository(Sell);
  // pegar a compra pelo token do usuário

  try {
    // Coisas de token
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const [userClient] = await userRepository.find({
          where: { id: tokenId },
        });
        if (!userClient) {
          throw new ErrorHandler("No user found!", 404);
        }

        const [cart] = await cartRepository.find({ where: { id: tokenId } });
        if (!cart) {
          throw new ErrorHandler("No cart found!", 404);
        }

        const [sell] = await sellRepository.find({ where: { id: tokenId } });
        if (!sell) {
          throw new ErrorHandler("No sell found!", 404);
        }

        let priceAmount = 0;
        const cartProducts = cart.product;

        for (let count = 0; count < cartProducts.length; count++) {
          priceAmount += cartProducts[count].price;
        }
        console.log(priceAmount);
        // ver pelo id do cart e
        sell.clientName = userClient.name;
        sell.clientEmail = userClient.email;
        sell.totalPrice = priceAmount;

        const sells = userClient.sells;
        const lastSell = sells[sells.length - 1];

        return res.json({
          message: "Sell succesfully done!",
          sell: lastSell,
        });
      }
    );
    //   não esquecer de mandar email!
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listAllSells = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const sellRepository = getRepository(Sell);
  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    // Coisas de Admin
    const isValidAdm = await userRepository.find({ isAdm: true });

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            // Coisas do registro
            const allSells = await sellRepository.find();

            return allSells;
          }
        }

        throw new ErrorHandler("This user is not an administrator!", 401);
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneSell = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const sellRepository = getRepository(Sell);
  const { id } = req.params;

  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

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

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            // Coisas da listagem
            const sell = await sellRepository.findOne({ id });
            if (!sell) {
              throw new ErrorHandler("No sell found!", 404);
            }

            return sell;
          }
        }

        if (decoded.id === id) {
          const cart = await cartRepository.findOne({ id });

          return cart;
        } else if (decoded.id !== id) {
          throw new ErrorHandler("Only admins may check non self-carts!", 401);
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
