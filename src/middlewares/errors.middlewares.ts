import { Request, Response, NextFunction } from "express";

import ErrorHandler from "../utils/errors";

export const handleError = (
  error: ErrorHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ErrorHandler) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    message: "Internal server error",
  });
};
