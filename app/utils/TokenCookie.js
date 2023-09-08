import { CreateToken } from "./JwtHelper";

export async function TokenCookie(info, cookieName) {
  const token = await CreateToken(info);
  const cookie = {
    "SET-Cookie": `${cookieName}=${token}; Max-Age=7200; Secure; HttpOnly; path=/; SameSite=Strict`,
  };
  return cookie;
}
