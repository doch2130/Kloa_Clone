import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/config/nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 메일 제목 형식에 활용할 fixTime 객체 선언 : 전송 시간 기록
  const fixTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 메일 옵션 정하기
  const mailOptions = {
    // 송신할 이메일 
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: body.email, // 수신할 이메일
  };

  // 메일 인증번호 생성 6자리
  const number = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');

  // transperter 활용해 이메일 전송
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...{
        text: `클로아 회원가입 인증번호 : ${number}`,
      },
      subject: `클로아 메일 인증-${fixTime}`,
    });

    const emailNumberSave = await emailAuthNumberSend(body.email, number);

    if(emailNumberSave === false) {
      return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 메일 전송을 다시 시도해주세요.', status: 500})); 
    }

    return new NextResponse(JSON.stringify({ success: true, status: 200 }));

  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: '메일 전송에 실패함', status: 500}));
  }

}

async function emailAuthNumberSend(email: string, mailNumber:string):Promise<Boolean> {
  return fetch('http://localhost:9999/mailNumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      mailNumber: mailNumber
    }),
  })
    .then(res => {
      return true;
    })
    .catch(err => {
      console.log('err ', err);
      return false;
    });
}
