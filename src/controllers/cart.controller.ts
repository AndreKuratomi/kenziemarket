import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";

// export const createCart = async (req: Request, res: Response) => {
//   try {
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

    jwt.verify(tokenItself, config.secret as string, (err: any) => {
      if (err) {
        throw new ErrorHandler("Invalid token!", 401);
      }
    });

    const id: string = req.body.id;

    const doesAcquiredProductExist = await productRepository.findOne({ id });

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

        const cart = await cartRepository.findOne({ userId: tokenId });
        if (!cart) {
          throw new ErrorHandler("No cart found!", 404);
        }
        cart.cartOwner = userClient.name;
        cart.products.push(doesAcquiredProductExist);

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
            const allCarts = await cartRepository.find();

            return allCarts;
          }
        }

        throw new ErrorHandler("This user is not an administrator!", 401);
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export const listOneCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

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
            // Coisas da listagem
            const cart = await cartRepository.findOne({ id });
            if (!cart) {
              throw new ErrorHandler("No cart found!", 404);
            }

            return cart;
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

export const deleteCart = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
