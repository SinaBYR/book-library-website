import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import tokens from '../config/tokens';
import { PrismaClient } from '@prisma/client';
import { RequestUser } from '../types/express';
import { JWTPayload } from '../types';

const prisma = new PrismaClient();

export async function deleteAllTokensExceptForCurrent(currentToken: string) {
  await prisma.token.deleteMany({
    where: {
      NOT: {
        token: currentToken
      }
    }
  });
}

export async function deleteToken(token: string) {
  await prisma.$connect();
  const deletedToken = await prisma.token.delete({
    where: {
      token
    },
    select: null
  });

  await prisma.$disconnect();
  return deletedToken;
}

export async function verifyToken(token: string) {
  await prisma.$connect();
  const secret = config.jwt.secret!;
  const isTokenPresent = await prisma.token.findUnique({
    where: {
      token
    },
    select: null
  });
  await prisma.$disconnect();
  if(!isTokenPresent) {
    return null;
  }
  const payload = jwt.verify(token, secret) as JWTPayload;
  return payload;
}

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

function generateToken(user: RequestUser, expiresIn: number, type: string, secret = config.jwt.secret) {
  return jwt.sign({
    sub: user?.id,
    fullName: user?.fullName,
    email: user?.email,
    iat: moment().unix(),
    type,
  }, secret!, {
    expiresIn
  });
}

export async function generateAuthToken(user: RequestUser) {
  // 1. throw error
  if(!user?.id) return;
  const minutes = config.jwt.accessTokenExpMinutes;
  const accessToken = generateToken(user, minutes * 60, tokens.ACCESS);
  const accessTokenExp = moment().add(minutes, 'minutes');
  await saveToken(accessToken, user.id, accessTokenExp.toDate(), tokens.ACCESS as TokenTypes);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExp
    }
  }
}