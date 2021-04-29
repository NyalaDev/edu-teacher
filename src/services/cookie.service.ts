import Cookies from 'universal-cookie';

const COOKIE_NAME = '_barmaga_token';

/**
 * Remove the auth cookie
 */
export const removeAuthCookie = (): void => {
  const cookies = new Cookies();
  cookies.remove(COOKIE_NAME);
};

/**
 * get the JWt from cookie
 * @returns the JWT token
 */
export const getTokenFromCookie = (): string => {
  const cookies = new Cookies();
  return cookies.get(COOKIE_NAME) || '';
};
