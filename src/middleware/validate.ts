import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import * as validationSchemas from '../validations/auth.validation';

export function validateLogin(req: Request, _res: Response, next: NextFunction) {
  const { error } = Joi.compile(validationSchemas.login).validate(req.body);

  if(error) {
    return next(error);
  }

  next();
}

export function validateRegister(req: Request, _res: Response, next: NextFunction) {
  const { error } = Joi.compile(validationSchemas.register).validate(req.body);

  if(error) {
    return next(error);
  }

  next();
}