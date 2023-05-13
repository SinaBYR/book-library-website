import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import tokens from '../config/tokens';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TokenTypes = keyof typeof tokens

async function saveToken(token: string, userId: string, expires: Date, type: TokenTypes) {
  await prisma.$connect();
  await prisma.user.update({
    data: {
      tokens: {
        create: {
          token,
          type,
          expires
        }
      }
    },
    where: {
      id: userId
    }
  });
  await prisma.$disconnect();
}

function generateToken(userId: string, expiresIn: number, type: string, secret = config.jwt.secret) {
  return jwt.sign({
    sub: userId,
    iat: moment().unix(),
    type,
  }, secret!, {
    expiresIn
  });
}

type User = {
  id: string
  name: string
  email: string
} | undefined

export async function generateAuthToken(user: User) {
  // 1. throw error
  if(!user?.id) return;
  const minutes = config.jwt.accessExpMinutes;
  if(!minutes) {
    throw new Error('JWT_ACCESS_EXPIRATION_MINUTES env variable is undefined');
  }
  const accessToken = generateToken(user.id, +minutes * 60, tokens.ACCESS);
  const accessTokenExp = moment().add(minutes, 'minutes');
  await saveToken(accessToken, user.id, accessTokenExp.toDate(), tokens.ACCESS as TokenTypes);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExp
    }
  }
}