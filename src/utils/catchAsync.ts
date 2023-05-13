import { NextFunction, Request, Response } from "express";

export default function(fn: Function) {
  return function(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  }
}