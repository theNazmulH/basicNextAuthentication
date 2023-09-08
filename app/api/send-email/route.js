import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// variables
const SMTP_HOST = "mail.teamrabbil.com";
const SMTP_PORT = 25;
const SMTP_USER = "info@teamrabbil.com";
const SMTP_PASS = "~sR4[bhaC[Qs";

export async function POST(request, response) {
  const requestData = await request.json();
  const toEmail = requestData.email;
  const mailSubject = requestData.mailSubject;
  const mailText = requestData.mailText;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `Email Verification OTP From NEXT.js Application <${SMTP_USER}>`,
    to: toEmail,
    subject: mailSubject,
    text: mailText,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: true,
      message: "Email sent successfully",
      result,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({
      status: false,
      message: "Email sending unsuccessful",
    });
  }
}
