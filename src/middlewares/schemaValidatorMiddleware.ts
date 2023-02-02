import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const fruit = req.body;
    const validation = schema.validate(fruit);
    if (validation.error) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: validation.error.message });
    }

    next();
  };
}
