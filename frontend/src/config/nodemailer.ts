import nodemailer from "nodemailer";


// 메일 주소 및 앱 비밀번호 선언하기 (gmail)
const email = process.env.NEXT_PUBLIC_EMAIL;
const pass = process.env.NEXT_PUBLIC_PASSWORD;


// transporter 생성하기
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
