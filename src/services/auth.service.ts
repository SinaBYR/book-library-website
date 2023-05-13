import { PrismaClient } from "@prisma/client";
import { LoginReqBody, RegisterReqBody } from "../controllers/types";
import { getUserByEmail } from "./user.service";
import { AuthError } from "../utils/AuthError";
import { isPasswordMatch } from "../utils/password";

const prisma = new PrismaClient();

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

export async function createNewUser(body: RegisterReqBody) {
  try {
    await prisma.$connect();
    const user = await prisma.user.create({
      data: {
        name: body.fullName,
        email: body.email,
        password: body.password,
      }
    });

    return {
      id: user.id,
      email: user.email,
      fullName: user.name
    };
  } catch(err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
