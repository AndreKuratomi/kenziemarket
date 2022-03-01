import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import ErrorHandler from "../utils/errors";
import { areHeadersEnabled } from "../services/token.service";
import CartRepository from "../repository/cart.repository";
import UserRepository from "../repository/user.repository";
import SellRepository from "../repository/sell.repository";

export const makeSell = async (req: Request, res: Response) => {
  const UserCustomRepository = getCustomRepository(UserRepository);
  const CartCustomRepository = getCustomRepository(CartRepository);
  const SellCustomRepository = getCustomRepository(SellRepository);

  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        try {
          const tokenId = decoded.id;
          let [userClient] = await UserCustomRepository.find({
            where: { id: tokenId },
            relations: ["sells"],
          });
          if (!userClient) {
            throw new ErrorHandler("No user found!", 404);
          }

          const [actualCart] = await CartCustomRepository.find({
            where: { id: tokenId },
            relations: ["product", "sell"],
          });
          if (!actualCart) {
            throw new ErrorHandler("No cart found!", 404);
          }

          let priceAmount = 0;
          const cartProducts = actualCart.product;

          for (let count = 0; count < cartProducts.length; count++) {
            priceAmount += cartProducts[count].price;
          }

          const actualSell = SellCustomRepository.create(actualCart);

          actualSell.totalPrice = priceAmount;

          actualSell.user = userClient; //funciona só aqui na compra mas sem persistência
          actualSell.cart = actualCart; //funciona só aqui na compra mas sem persistência

          const newSell = await SellCustomRepository.save(actualSell);

          return res.json({
            message: "Sell succesfully done!",
            user: actualSell.user.id,
            sell: actualSell.cart.product,
            total_price: actualSell.totalPrice,
          });
        } catch (error: any) {
          res.status(error.statusCode).json({ message: error.message });
        }
      }
    );
    //   não esquecer de mandar email!
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllSells = async (req: Request, res: Response) => {
  const SellCustomRepository = getCustomRepository(SellRepository);

  try {
    const allSells = await SellCustomRepository.find({
      relations: ["cart", "user"],
    });

    let allSellsWithoutSensitiveData = [];

    for (let i = 0; i < allSells.length; i++) {
      let { password, isAdm, createdOn, cart, ...userData } = allSells[i].user;
      // console.log(allSells[i].user.sells); //undefined porque não há persistência

      let { sell, user, ...cartData } = allSells[i].cart;
      // console.log(allSells[i].cart.product); //undefined porque não há persistência

      let sellWithoutSensitiveData = {
        id: allSells[i].id,
        createdOn: allSells[i].createdOn,
        totalPrice: allSells[i].totalPrice,
        user: userData,
        cart: cartData,
      };

      allSellsWithoutSensitiveData.push(sellWithoutSensitiveData);
    }

    return res.json(allSellsWithoutSensitiveData);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneSell = async (req: Request, res: Response) => {
  const SellCustomRepository = getCustomRepository(SellRepository);
  const UserCustomRepository = getCustomRepository(UserRepository);

  const { id } = req.params;

  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        try {
          const tokenId = decoded.id;

          const selectedSell = await SellCustomRepository.findOne({
            id: tokenId,
          });
          if (!selectedSell) {
            throw new ErrorHandler(
              "No sell found or the user is not owner of this sell!",
              404
            );
          }

          const selectedUser = await UserCustomRepository.findOne({
            id: tokenId,
          });
          if (!selectedUser) {
            throw new ErrorHandler("No User found!", 404);
          }

          // if (selectedSell.user.isAdm === true) { //undefined porque não há persistência
          if (selectedUser.isAdm === true) {
            return res.json(selectedSell);
          } else if (decoded.id === id) {
            return res.json(selectedSell);
          } else {
            throw new ErrorHandler(
              "Only admins may check non self-carts!",
              401
            );
          }
        } catch (error: any) {
          res.status(error.statusCode).json({ message: error.message });
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
