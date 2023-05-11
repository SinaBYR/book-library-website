import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

export function authRouteErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if(!(err instanceof ValidationError)) {
    // 1. return 500 error page
    // 2. or maybe handle other errors??
    return res.send('Server Error')
  }

  let errorMessages: any = {};
  err.details.map(e => e.context?.label).forEach(label => {
    let errorObj = err.details.find(v => v.context?.label === label);
    errorMessages[label as string] = errorObj?.message;
  })

  delete err._original.repeatPassword;

  if(req.path === '/register') {
    res.status(400).render('pages/signup/page', {
      formData: err._original,
      errors: errorMessages
    })
  }
}