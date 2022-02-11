import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import User from "../entities/User";
import Product from "../entities/Product";
import Cart from "../entities/Cart";
import CartRepository from "../repository/cart.repository";
import ErrorHandler from "../utils/errors";

// export const createCart = async (req: Request, res: Response) => {
//   const CartCustomRepository = getCustomRepository(CartRepository);
//   // const userRepository = getRepository(User);
//   try {
//     let { cartOwner, products } = req.body;

//     const cartAlreadyExists = await CartCustomRepository.findOne({ cartOwner });

//     if (cartAlreadyExists) {
//       throw new ErrorHandler("Cart already registered!", 403);
//     }

//     const cart = CartCustomRepository.create({ cartOwner, products });

//     await CartCustomRepository.save(cart);

//     return res.json(cart);
//   } catch (error: any) {
//     res.status(error.statusCode).json({ message: error.message });
//   }
// };

export const addToCart = async (req: Request, res: Response) => {
  const { id, name, type, price } = req.body;

  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const cartRepository = getRepository(Cart);

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

    const id: string = req.body.id;

    const doesAcquiredProductExist = await productRepository.findOne(id);
    if (!doesAcquiredProductExist) {
      throw new ErrorHandler("No product found!", 404);
    }
    const { ...object } = doesAcquiredProductExist;
    // console.log(object);

    // let arr: object[] = [];
    jwt.verify(
      tokenItself,
      config.secret as string,
      async (err, decoded: any) => {
        const tokenId = decoded.id;
        const userClient = await userRepository.findOne({ id: tokenId });
        if (!userClient) {
          throw new ErrorHandler("No user found!", 404);
        }

        const owner = userClient.name;

        const cart = await cartRepository.findOne({
          cartOwner: owner,
        });
        console.log(cart);
        if (!cart) {
          // MAS POR QUE NÃO RETORNA???
          // throw new ErrorHandler("No cart found!", 404);
          res.status(404).json({ message: "No cart found!" });
        }
        // arr.push(object);
        // console.log(arr);
        cart?.products.push(object);
        // console.log(cart?.products);
        console.log(cart?.products);
        await cartRepository.save(cart);
        return res.json({
          message: "Product succesfully added to your cart!",
          cart: cart,
        });
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listAllCarts = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

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
            // const qwe = await cartRepository.findOne({ cartOwner: "André13" });
            // console.log(qwe);
            const allCarts = await cartRepository.find();
            // POR QUE NÃO RETORNA JÁ COM OS VALORES QUE EU INSERI NA FUNÇÃO ANTERIOR?
            return res.json(allCarts);
          }
        }
        // MAS POR QUE NÃO RETORNA???
        // throw new ErrorHandler("This user is not an administrator!", 401);
        res.status(401).json({ message: "This user is not an administrator!" });
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneCart = async (req: Request, res: Response) => {
  const { id, product_id } = req.params;
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

  try {
    if (!id) {
      throw new ErrorHandler("No id found!", 404);
    }
    // if (id.length !== 36) {
    //   throw new ErrorHandler("Id must be uuid!", 404);
    // }

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

    const isValidAdm = await userRepository.find({ isAdm: true });

    // Coisas de Admin
    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        const ownerId = await userRepository.findOne({ id: decoded.id });
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            // Coisas da listagem
            const cart = await cartRepository.findOne({ id });
            console.log(cart);
            if (!cart) {
              throw new ErrorHandler("No cart found!", 404);
            }
            return res.json(cart);
          }
        }
        const cart = await cartRepository.findOne({ id });
        console.log(ownerId?.name);
        console.log(cart?.cartOwner);
        if (ownerId?.name === cart?.cartOwner) {
          return res.json(cart);
        } else if (ownerId?.name !== cart?.cartOwner) {
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

export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  try {
    if (!id) {
      throw new ErrorHandler("No id found!", 404);
    }
    // if (id.length !== 36) {
    //   throw new ErrorHandler("Id must be uuid!", 404);
    // }

    // Tem usuário com este id?
    const userProfile = await userRepository.findOne({ id: id });
    if (!userProfile) {
      throw new ErrorHandler("No user found!", 404);
    }

    // E tem este product_id no carrinho dele?
    const cart = await cartRepository.findOne({ cartOwner: userProfile.name });
    if (!cart) {
      throw new ErrorHandler("No cart found!", 404);
    }

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

    const isValidAdm = await userRepository.find({ isAdm: true });

    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            const cartProducts = cart.products;
            for (let i = 0; i < cartProducts.length; i++) {
              // console.log(cartProducts[i]);
              // if (cartProducts[i].id === id) {
              //   cartProducts.filter((elt) => elt.id !== id);
              //   return res.json({
              //     message: `Product ${cartProducts[i].id} deleted from cart`,
              //   });
              // }
            }
            throw new ErrorHandler("No product found!", 404);
          }
        }
        // tenho que ver se o id do param coincide com o id do token e se sim se este token tem dentro de si o id do produto

        if (cart) {
          const cartProducts = cart.products;
          for (let i = 0; i < cartProducts.length; i++) {
            // if (cartProducts[i].id === id) {
            //   cartProducts.filter((elt) => elt.id !== id);
            //   return res.json({
            //     message: `Product ${cartProducts[i].id} deleted from cart`,
            //   });
            // }
          }
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
