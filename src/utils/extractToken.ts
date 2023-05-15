export function extractToken(cookies: string | undefined) {
  if(!cookies) {
    return null;
  }

  const cookiesArray = cookies.split('; ');
  const accessTokenCookie = cookiesArray.find(c => c.startsWith('blat'));

  if(!accessTokenCookie) {
    return null;
  }

  const accessToken = accessTokenCookie.slice(5);
  return accessToken;
}