import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(info) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT(info)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION)
    .sign(secret);
  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const verifiedToken = await jwtVerify(token, secret);
  return verifiedToken["payload"];
}
