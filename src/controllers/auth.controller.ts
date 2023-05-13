import { Request, Response } from "express";
import { createNewUser, generateAuthToken, loginUserWithEmailAndPassword } from "../services";
import { RegisterReqBody, LoginReqBody } from "./types";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req: Request<{}, {}, LoginReqBody>, res: Response) => {
  const user = await loginUserWithEmailAndPassword(req.body);
  const token = await generateAuthToken(user);
  const minutes = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;
  res.header('Set-Cookie', [
    `blat=${token?.access.token}; Path=/; Max-Age=${+minutes! * 60}; SameSite=Strict; Secure`
  ]);

  res.redirect('/');
})

export async function register(req: Request<{}, {}, RegisterReqBody>, res: Response) {
  const user = await createNewUser(req.body);
  const token = await generateAuthToken(user);
  const minutes = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;
  if(!minutes) {
    throw new Error('JWT_ACCESS_TOKEN_EXPIRATION_MINUTES env variable undefined');
  }
  res.header('Set-Cookie', [
    `blat=${token?.access.token}; Path=/; Max-Age=${+minutes * 60}; SameSite=Strict; Secure`
  ]);
  res.redirect('/');
}