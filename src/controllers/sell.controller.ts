import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import { Sell } from "../entities/Sell";
import ErrorHandler from "../utils/errors";

const userRepository = getRepository(User);
const cartRepository = getRepository(Cart);
const sellRepository = getRepository(Sell);

export const makeSell = async (req: Request, res: Response) => {
  // pegar a compra pelo token do usuário

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

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const userClient = await userRepository.findOne({ id: tokenId });
        if (!userClient) {
          throw new ErrorHandler("No user found!", 404);
        }

        const cart = await cartRepository.findOne({ userId: tokenId });
        if (!cart) {
          throw new ErrorHandler("No cart found!", 404);
        }

        const sell = await sellRepository.findOne({ cartId: tokenId });
        if (!sell) {
          throw new ErrorHandler("No sell found!", 404);
        }

        let priceAmount = 0;
        const cartProducts = cart.products;

        for (let count = 0; count < cartProducts.length; count++) {
          priceAmount += cartProducts[count].price;
        }
        // ver pelo id do cart e
        sell.clientName = userClient.name;
        sell.clientEmail = userClient.email;
        sell.totalPrice = priceAmount;

        const sells = userClient.sells;
        const lastSell = sells[sells.length - 1];

        return response.json({
          message: "Sell succesfully done!",
          sell: lastSell,
        });
      }
    );
    //   não esquecer de mandar email!
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllSells = async (req: Request, res: Response) => {
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
  const { id } = req.params;

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
