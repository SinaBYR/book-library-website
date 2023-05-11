import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import * as validationSchemas from '../validations/auth.validation';

export async function validateRegister(req: Request, _res: Response, next: NextFunction) {
  const { error } = Joi.compile(validationSchemas.register).validate(req.body, {
    abortEarly: false
  });

  if(error) {
    return next(error);
  }

  next();
}