import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { JWTPayload } from '../types';

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookies = req.headers.cookie;
    if(!cookies) {
      req.user = null;
      return next();
    }

    const cookiesArray = cookies.split('; ');
    const accessTokenCookie = cookiesArray.find(c => c.startsWith('blat'));

    if(!accessTokenCookie) {
      req.user = null;
      return next();
    }

    const accessToken = accessTokenCookie.slice(5);
    const secret = config.jwt.secret!;
    const payload = jwt.verify(accessToken, secret) as JWTPayload;
    req.user = {
      id: payload.sub,
      fullName: payload.fullName,
      email: payload.email
    };
    next();
  } catch(err) {
    console.log(err);
  }
}
