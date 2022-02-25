import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import ErrorHandler from "../utils/errors";

export const validateSchema =
  (schema: yup.AnyObjectSchema) =>
  async (
    // error: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resource = req.body;
    try {
      await schema.validate(resource, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error: any) {
      next(new ErrorHandler({ [error.name]: error.errors }, 400));
    }
  };
