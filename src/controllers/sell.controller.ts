import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
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
  // pegar a compra pelo token do usuário

  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const [userClient] = await UserCustomRepository.find({
          where: { id: tokenId },
          relations: ["sells"],
        });
        console.log(userClient);
        if (!userClient) {
          throw new ErrorHandler("No user found!", 404);
        }

        const [cart] = await CartCustomRepository.find({
          where: { id: tokenId },
          relations: ["product", "sell"],
        });
        if (!cart) {
          throw new ErrorHandler("No cart found!", 404);
        }

        // if (!sell) {
        //   throw new ErrorHandler("No sell found!", 404);
        // }

        let priceAmount = 0;
        const cartProducts = cart.product;

        for (let count = 0; count < cartProducts.length; count++) {
          priceAmount += cartProducts[count].price;
        }
        // ver pelo id do cart e

        const sell = SellCustomRepository.create(cart);
        console.log(sell);

        const newSell = await SellCustomRepository.save(sell);

        // const [sel] = await SellCustomRepository.find({
        //   relations: ["cart", "user"],
        // });
        // console.log(sel);

        sell.totalPrice = priceAmount;

        userClient.sells.push(sell);
        const sells = userClient.sells;
        const lastSell = sells[sells.length - 1];

        const { password, isAdm, createdOn, ...data } = userClient;

        return res.json({
          message: "Sell succesfully done!",
          user: data,
          cart: cart.product,
          sell: lastSell,
        });
      }
    );
    //   não esquecer de mandar email!
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// export const listAllSells = async (req: Request, res: Response) => {
//   const userRepository = getRepository(User);
//   const cartRepository = getRepository(Cart);
//   const sellRepository = getRepository(Sell);
//   try {
//     const auth = req.headers.authorization;

//     const tokenItself = areHeadersEnabled(auth);

//     // Coisas de Admin
//     const isValidAdm = await userRepository.find({ isAdm: true });

//     jwt.verify(
//       tokenItself,
//       config.secret as string,
//       async (error, decoded: any) => {
//         for (let i = 0; i < isValidAdm.length; i++) {
//           if (isValidAdm[i].id === decoded.id) {
//             // Coisas do registro
//             const allSells = await sellRepository.find();

//             return allSells;
//           }
//         }

//         throw new ErrorHandler("This user is not an administrator!", 401);
//       }
//     );
//   } catch (error: any) {
//     res.status(error.statusCode).json({ message: error.message });
//   }
// };

// export const listOneSell = async (req: Request, res: Response) => {
//   const userRepository = getRepository(User);
//   const cartRepository = getRepository(Cart);
//   const sellRepository = getRepository(Sell);
//   const { id } = req.params;

//   try {
//     const auth = req.headers.authorization;

//     const tokenItself = areHeadersEnabled(auth);

//     jwt.verify(
//       tokenItself,
//       config.secret as string,
//       async (err, decoded: any) => {
//         const tokenId = decoded.id;
//         const userProfile = await userRepository.findOne({ id: tokenId });
//         if (!userProfile) {
//           throw new ErrorHandler("No user found!", 404);
//         }
//       }
//     );

//     // Coisas de Admin
//     const isValidAdm = await userRepository.find({ isAdm: true });

//     jwt.verify(
//       tokenItself,
//       config.secret as string,
//       async (error, decoded: any) => {
//         for (let i = 0; i < isValidAdm.length; i++) {
//           if (isValidAdm[i].id === decoded.id) {
//             // Coisas da listagem
//             const sell = await sellRepository.findOne({ id });
//             if (!sell) {
//               throw new ErrorHandler("No sell found!", 404);
//             }

//             return sell;
//           }
//         }

//         if (decoded.id === id) {
//           const cart = await cartRepository.findOne({ id });

//           return cart;
//         } else if (decoded.id !== id) {
//           throw new ErrorHandler("Only admins may check non self-carts!", 401);
//         }
//       }
//     );
//   } catch (error: any) {
//     res.status(error.statusCode).json({ message: error.message });
//   }
// };
