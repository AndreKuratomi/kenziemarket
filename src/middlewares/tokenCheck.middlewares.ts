import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { areHeadersEnabled } from "../services/token.service";
import ErrorHandler from "../utils/errors";

export const isTokenValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  const tokenItself = areHeadersEnabled(auth);

  if (!tokenItself) {
    throw new ErrorHandler("No token found!", 404);
  }

  jwt.verify(tokenItself, config.secret as string, (err: any) => {
    if (err) {
      throw new ErrorHandler("Invalid token!", 401);
    }
  });

  return next();
};
