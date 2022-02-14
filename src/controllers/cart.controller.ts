import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import User from "../entities/User";
import Product from "../entities/Product";
import Cart from "../entities/Cart";
import CartRepository from "../repository/cart.repository";
import ErrorHandler from "../utils/errors";
import { areHeadersEnabled } from "../services/token.service";

export const addToCart = async (req: Request, res: Response) => {
  const { id, name, type, price } = req.body;

  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const cartRepository = getRepository(Cart);

  try {
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);
    const id: string = req.body.id;

    const doesAcquiredProductExist = await productRepository.findOne(id);
    if (!doesAcquiredProductExist) {
      throw new ErrorHandler("No product found!", 404);
    }

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const userClient = await userRepository.findOne({ id: tokenId });
        if (!userClient) {
          throw new ErrorHandler("No user found!", 404);
        }

        const owner = userClient.id;
        console.log(userClient.cart);
        // const [cart] = await cartRepository.find({ //outra maneira de escrever
        //[] denota que va ipegar o primeiro índice
        const cart = await cartRepository.find({
          where: { id: tokenId },
          relations: ["product"], //especifica para este caso
        });

        if (!cart) {
          // MAS POR QUE NÃO RETORNA???
          // throw new ErrorHandler("No cart found!", 404);
          res.status(404).json({ message: "No cart found!" });
        }

        // cart.product.push(doesAcquiredProductExist); //já está como primeiro elemento
        cart[0].product.push(doesAcquiredProductExist); //aqui delimitei

        const newCart = await cartRepository.save(cart);

        return res.json({
          message: "Product succesfully added to your cart!",
          cart: cart,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const listAllCarts = async (req: Request, res: Response) => {
  const cartRepository = getRepository(Cart);

  try {
    const allCarts = await cartRepository.find({
      relations: ["product"],
    });

    return res.json(allCarts);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

  try {
    if (!id) {
      throw new ErrorHandler("No id found!", 404);
    }
    if (id.length !== 36) {
      throw new ErrorHandler("Id must be uuid!", 404);
    }

    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const [userProfile] = await userRepository.find({
          where: { id: tokenId },
        });
        if (!userProfile) {
          throw new ErrorHandler("No user found!", 404);
        }

        const [cart] = await cartRepository.find({
          where: { id: tokenId },
          relations: ["product"],
        });
        if (!cart) {
          throw new ErrorHandler("No cart found!", 404);
        }

        if (userProfile.isAdm) {
          return res.json(cart);
        } else if (userProfile.id === id) {
          return res.json(cart);
        } else {
          // MAS POR QUE NÃO RETORNA???
          // throw new ErrorHandler("Only admins may check non self-carts!", 401);
          res
            .status(401)
            .json({ message: "Only admins may check non self-carts!" });
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  const { id, product_id } = req.params;
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  try {
    if (!id) {
      throw new ErrorHandler("No id found!", 404);
    }
    if (id.length !== 36) {
      throw new ErrorHandler("Id must be uuid!", 404);
    }

    // Tem usuário com este id?
    const [user] = await userRepository.find({ where: { id: id } });
    if (!user) {
      throw new ErrorHandler("No user found!", 404);
    }

    const [cart] = await cartRepository.find({
      where: { id: id },
      relations: ["product"],
    });
    if (!cart) {
      throw new ErrorHandler("No cart found!", 404);
    }

    // Coisas de token
    const auth = req.headers.authorization;

    const tokenItself = areHeadersEnabled(auth);

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;

        const userProfile = await userRepository.find({
          where: { id: tokenId },
        });
        if (!userProfile) {
          throw new ErrorHandler("No user found!", 404);
        }

        if (userProfile[0].isAdm) {
          let cartProducts = cart.product;
          // E tem este product_id no carrinho dele?
          for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].id === product_id) {
              const newCart = cartProducts.filter(
                (elt) => elt.id !== product_id
              );

              cartProducts = newCart;

              // REMOVEU MAS NÃO ATUALIZOU
              await cartRepository.save(cart);
              console.log(cart);

              return res.json({
                message: `Product ${cartProducts[i].name} deleted from cart of client ${user.name}.`,
              });
            }
          }
          throw new ErrorHandler("No product found!", 404);
        }

        if (userProfile[0].id === cart.id) {
          const cartProducts = cart.product;
          for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].id === product_id) {
              cartProducts.filter((elt) => elt.id !== product_id);

              await cartRepository.save(cart);

              return res.json({
                message: `Product ${cartProducts[i].name} deleted from cart of client ${user.name}.`,
              });
            }
          }
          throw new ErrorHandler("No product found!", 404);
        } else {
          // POR QUE AQUI NÃO FUNCIONA?
          // throw new ErrorHandler(
          //   "Only admins or the own user may delete its cart!",
          //   401
          // );
          res.status(401).json({
            message: "Only admins or the own user may delete its product cart!",
          });
        }
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
