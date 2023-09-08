import {
  VerifyCookieAuth,
  VerifyCookieAuthForLogin,
  VerifyCookieAuthForVerifyEmail,
} from "@/app/utils/VerifyCookieAuth";

export async function middleware(request, response) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return await VerifyCookieAuth(request);
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/registration")
  ) {
    return await VerifyCookieAuthForLogin(request);
  }

  if (request.nextUrl.pathname.startsWith("/otp")) {
    return await VerifyCookieAuthForVerifyEmail(request);
  }
}
