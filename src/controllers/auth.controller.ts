import { Request, Response } from "express";
import { registerUserWithEmailAndPassword, generateAuthToken, loginUserWithEmailAndPassword, logoutUser, logoutAllExceptForCurrent } from "../services";
import { RegisterReqBody, LoginReqBody } from "./types";
import catchAsync from "../utils/catchAsync";
import config from "../config/config";

export const logoutAll = catchAsync(async (req: Request, res: Response) => {
  await logoutAllExceptForCurrent(req);
  res.end();
})

export const logout = catchAsync(async (req: Request, res: Response) => {
  await logoutUser(req);
  res.header('Set-Cookie', 'blat=; Path=/; Max-Age=-1; SameSite=Strict; Secure');
  res.end();
})

export const login = catchAsync(async (req: Request<{}, {}, LoginReqBody>, res: Response) => {
  const user = await loginUserWithEmailAndPassword(req.body);
  const token = await generateAuthToken(user);
  const minutes = config.jwt.accessSessionExpMinutes;
  res.header('Set-Cookie', [
    `blat=${token?.access.token}; Path=/; Max-Age=${minutes * 60}; SameSite=Strict; Secure`
  ]);

  res.redirect('/');
})

export const register = catchAsync(async (req: Request<{}, {}, RegisterReqBody>, res: Response) => {
  const user = await registerUserWithEmailAndPassword(req.body);
  const token = await generateAuthToken(user);
  const minutes = config.jwt.accessSessionExpMinutes;
  res.header('Set-Cookie', [
    `blat=${token?.access.token}; Path=/; Max-Age=${minutes * 60}; SameSite=Strict; Secure`
  ]);
  res.redirect('/');
})
