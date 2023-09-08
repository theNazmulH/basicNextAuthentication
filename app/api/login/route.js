import { VerifyToken } from "@/app/utils/JwtHelper";
import { TokenCookie } from "@/app/utils/TokenCookie";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const reqData = await request.json();
    const { email, password } = reqData;

    const token = request.cookies.get("regtoken");
    const payload = await VerifyToken(token?.value);

    if (!payload || !payload.isVerified) {
      return NextResponse.json({
        status: false,
        isVerified: false,
        message: "Login Failed. Your email is not verified.",
        type: "not-verified"
      });
    }

    const userEmail = payload.email;
    const userPassword = payload.password;

    if (email === userEmail && password === userPassword) {
      const cookie = await TokenCookie({ email }, "logintoken");
      return NextResponse.json(
          {
            status: true,
            isVerified: true,
            message: "Login Successful"
          },
          {
            status: 200,
            headers: cookie
          }
      );
    }

    return NextResponse.json({
      status: false,
      isVerified: true,
      message: "Login Failed. The email or password you entered does not match our records.",
      type: "not-matched"
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      isVerified: false,
      message: "Login Failed. Please register to continue.",
      type: "not-registered"
    });
  }
}