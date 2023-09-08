import { VerifyToken } from "@/app/utils/JwtHelper";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const token = await request.cookies.get("regtoken");
    const payload = await VerifyToken(token?.value);

    const status = payload ? true : false;
    const message = status
        ? "Verified user Details provided"
        : "Verified user not found";

    return NextResponse.json({
      status,
      userDetails: payload || "",
      message,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      userDetails: "",
      message: "Sorry, we encountered an issue while verifying the user's information.",
    });
  }
}