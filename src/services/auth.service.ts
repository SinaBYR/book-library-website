import { LoginReqBody, RegisterReqBody } from "../controllers/types";
import { createNewUser, getUserByEmail, isEmailTaken } from "./";
import { AuthError, ApiError } from "../utils/errors";
import { isPasswordMatch } from "../utils/password";
import { deleteAllTokensExceptForCurrent, deleteToken } from "./";
import { Request } from "express";
import { extractToken } from "../utils/extractToken";

export async function logoutAllExceptForCurrent(cookies: string | undefined) {
  const accessToken = extractToken(cookies);
  if(!accessToken) {
    throw new ApiError(401, 'Unauthenticated access');
  }

  await deleteAllTokensExceptForCurrent(accessToken);
}

export async function logoutUser(req: Request) {
  const accessToken = extractToken(req.headers.cookie);
  if(!accessToken) {
    throw new ApiError(401, 'Unauthenticated access');
  }

  req.user = null;
  await deleteToken(accessToken);
}

export async function loginUserWithEmailAndPassword(body: LoginReqBody) {
  const user = await getUserByEmail(body.email);
  if(!user || !(await isPasswordMatch(body.password, user.password))) {
    throw new AuthError(401, 'Incorrect email or password', {
      email: body.email,
      password: body.password
    });
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.name
  };
}

export async function registerUserWithEmailAndPassword(body: RegisterReqBody) {
  const taken = await isEmailTaken(body.email);
  if(taken) {
    // un-necessary 'repeatPassword' is being sent back to the browser
    throw new AuthError(409, 'Email address already taken', body);
  }

  const user = await createNewUser(body);
  return user;
}
