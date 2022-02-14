import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import config from "../config/jwt.config";
import User from "../entities/User";
import { areHeadersEnabled } from "../services/token.service";
import ErrorHandler from "../utils/errors";

export const isUserAdmn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = getRepository(User);
  const isValidAdm = await usersRepository.find({ isAdm: true });

  const auth = req.headers.authorization;

  const tokenItself = areHeadersEnabled(auth);

  try {
    jwt.verify(
      tokenItself,
      config.secret as string,
      async (error, decoded: any) => {
        for (let i = 0; i < isValidAdm.length; i++) {
          if (isValidAdm[i].id === decoded.id) {
            return next();
          }
        }
        // POR QUE NÃO ESTÁ RETORNANDO????
        // throw new ErrorHandler("This user is not an administrator!", 401);
        res.status(401).json({ message: "This user is not an administrator!" });
      }
    );
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
};
