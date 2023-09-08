import { VerifyToken } from "@/app/utils/JwtHelper";
import { TokenCookie } from "@/app/utils/TokenCookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const reqData = await request.json();
    const otp = reqData["otp"];
    const token = request.cookies.get("regtoken");
    const payload = await VerifyToken(token["value"]);
    const verificationCode = payload["verificationCode"];

    if (verificationCode === parseInt(otp)) {
      cookies().delete("regtoken");
      payload["isVerified"] = true;
      const cookie = await TokenCookie(payload, "regtoken");
      return NextResponse.json(
        {
          status: true,
          message: "Your Email is successfully verified ",
        },
        { status: 200, headers: cookie }
      );
    } else {
      return NextResponse.json({
        status: false,
        message: "Verification error.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Verification error.",
    });
  }
}
