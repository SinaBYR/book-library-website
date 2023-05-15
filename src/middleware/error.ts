import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { AuthError } from "../utils/AuthError";

export function handleValidationError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if(!(err instanceof ValidationError)) {
    return next(err);
  }

  let errorMessages: any = {};
  err.details.map(e => e.context?.label).forEach(label => {
    let errorObj = err.details.find(v => v.context?.label === label);
    errorMessages[label as string] = errorObj?.message;
  })

  switch (req.path) {
    case '/register': {
      delete err._original.repeatPassword;
      return res.status(400).render('pages/signup/page', {
        formData: err._original,
        errors: errorMessages
      });
    }

    case '/login': {
      return res.status(400).render('pages/signin/page', {
        formData: err._original,
        errors: errorMessages
      });
    }
  
    default:
      break;
  }
}

export function handleAuthError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if(!(err instanceof AuthError)) {
    return next(err);
  }

  switch (req.path) {
    case '/login':
      return res.status(err.statusCode).render('pages/signin/page', {
        formData: err.payload,
        errors: {
          auth: err.message
        }
      });

    default:
      break;
  }
}
