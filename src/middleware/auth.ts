import { NextFunction, Request, Response } from 'express';
import { extractToken } from '../utils/extractToken';
import { verifyToken } from '../services';

export async function auth(req: Request, _res: Response, next: NextFunction) {
  const accessToken = extractToken(req.headers.cookie);
  if(!accessToken) {
    req.user = null;
    req.token = null;
    return next();
  }

  const user = await verifyToken(accessToken);
  if(!user) {
    req.user = null;
    req.token = null;
    return next();
  }

  req.token = accessToken;
  req.user = {
    id: user.sub,
    fullName: user.fullName,
    email: user.email
  };
  next();
}
