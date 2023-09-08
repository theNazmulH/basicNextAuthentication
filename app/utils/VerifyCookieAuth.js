import { NextResponse } from "next/server";
import { VerifyToken } from "./JwtHelper";
async function setRequestHeaders(req, payload) {
  const requestHeader = new Headers(req.headers);
  for (const key in payload) {
    requestHeader.set(key, payload[key]);
  }
  return requestHeader;
}

export async function VerifyCookieAuth(req) {
  try {
    const token = req.cookies.get("logintoken");
    const payload = await VerifyToken(token?.value);
    const requestHeader = await setRequestHeaders(req, payload);
    return NextResponse.next({ request: { headers: requestHeader } });
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export async function VerifyCookieAuthForLogin(req) {
  try {
    const token = req.cookies.get("logintoken");
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export async function VerifyCookieAuthForVerifyEmail(req) {
  try {
    const token = req.cookies.get("regtoken");
    const payload = await VerifyToken(token?.value);

    if (!payload) {
      return NextResponse.redirect(new URL("/registration", req.url));
    }

    const requestHeader = await setRequestHeaders(req, payload);
    if (!payload.isVerified) {
      return NextResponse.next({ request: { headers: requestHeader } });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/registration", req.url));
  }
}