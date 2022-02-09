import { Request, response, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import { Sell } from "../entities/Sell";
import { setFlagsFromString } from "v8";

export const makeSell = async (req: Request, res: Response) => {
  // pegar a compra pelo token do usuário
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const sellRepository = getRepository(Sell);

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
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};

export const listOneSell = async (req: Request, res: Response) => {
  // try {} catch (error: any) {res.status(error.statusCode).json({message: error.message})}
};
