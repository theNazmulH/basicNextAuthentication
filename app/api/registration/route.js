import { TokenCookie } from "@/app/utils/TokenCookie";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const reqData = await request.json();
  const { ...userDetails } = reqData;
  const cookie = await TokenCookie(userDetails, "regtoken");
  return NextResponse.json(
    { status: true, message: "Registration Successful" },
    { status: 200, headers: cookie }
  );
}
