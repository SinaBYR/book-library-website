import { PrismaClient } from "@prisma/client";
import { RegisterReqBody } from "../controllers/types";

const prisma = new PrismaClient();

export async function createNewUser(body: RegisterReqBody) {
  try {
    await prisma.$connect();
    const {
      email,
      id,
      name
    } = await prisma.user.create({
      data: {
        name: body.fullName,
        email: body.email,
        password: body.password,
      }
    });

    return { id, name, email }
  } catch(err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}
