import dotenv from 'dotenv';
dotenv.config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpMinutes: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES!,
    accessSessionExpMinutes: process.env.JWT_ACCESS_SESSION_EXPIRATION_MINUTES
  },
  port: +process.env.PORT!
}