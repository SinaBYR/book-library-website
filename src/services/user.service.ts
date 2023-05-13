import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
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

  return user;
}