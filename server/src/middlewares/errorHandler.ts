// Middlewares para manejo de errores, autenticación, etc.

import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send({
    error: "Something went wrong!",
    details: err.message,
  });
};
