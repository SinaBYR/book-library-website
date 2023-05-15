import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { JWTPayload } from '../types';
import { extractToken } from '../utils/extractToken';

export function auth(req: Request, _res: Response, next: NextFunction) {
  const accessToken = extractToken(req.headers.cookie);
  if(!accessToken) {
    req.user = null;
    return next();
  }

  const secret = config.jwt.secret!;
  const payload = jwt.verify(accessToken, secret) as JWTPayload;
  req.user = {
    id: payload.sub,
    fullName: payload.fullName,
    email: payload.email
  };
  next();
}
