import { PrismaClient } from "@prisma/client";
import { RegisterReqBody } from "../controllers/types";

const prisma = new PrismaClient();

export async function createNewUser(body: RegisterReqBody) {
  await prisma.$connect();
  const user = await prisma.user.create({
    data: {
      name: body.fullName,
      email: body.email,
      password: body.password,
    }
  });

  await prisma.$disconnect();
  return {
    id: user.id,
    email: user.email,
    fullName: user.name
  };
}

export async function isEmailTaken(email: string) {
  await prisma.$connect();
  const user = await prisma.user.findUnique({
    select: null,
    where: {
      email: email
    }
  });

  await prisma.$disconnect();
  return user !== null;
}

export async function getUserByEmail(email: string) {
  await prisma.$connect();
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      name: true,
      password: true
    },
    where: {
      email
    }
  });

  await prisma.$disconnect();
  return user;
}