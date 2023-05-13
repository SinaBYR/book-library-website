import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

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
    const payload = jwt.verify(accessToken, secret);
    console.log(payload);
    next();
  } catch(err) {
    console.log(err);
  }
}