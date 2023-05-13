export async function isPasswordMatch(plain: string, hashed: string) {
  return plain === hashed;
}