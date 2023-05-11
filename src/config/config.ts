export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES
  }
}