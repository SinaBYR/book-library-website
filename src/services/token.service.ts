import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
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

function generateToken(userId: string, expires: Moment, type: string, secret = config.jwt.secret) {
  return jwt.sign({
    sub: userId,
    iat: moment().unix(),
    eat: expires.unix(),
    type
  }, secret!);
}

type User = {
  id: string
  name: string
  email: string
} | undefined

export async function generateAuthToken(user: User) {
  // 1. throw error
  if(!user?.id) return;

  const accessTokenExp = moment().add(config.jwt.accessExpMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExp, tokens.ACCESS);
  await saveToken(accessToken, user.id, accessTokenExp.toDate(), tokens.ACCESS as TokenTypes);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExp
    }
  }
}