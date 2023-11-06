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
    // console.log('emailNumberSave ', emailNumberSave);

    if(emailNumberSave === false) {
      return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 메일 전송을 다시 시도해주세요.', status: 500})); 
    }

    return new NextResponse(JSON.stringify({ success: true, status: 200 }));

  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: '메일 전송에 실패함', status: 500}));
  }

}

async function emailAuthNumberSend(email: string, mailNumber: string):Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:9999/mailNumber?email=${email}`);
    const data = await response.json();

    if (data.length > 0) {
      const existingDataId = data[0].id;
      const putResponse = await fetch(`http://localhost:9999/mailNumber/${existingDataId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          mailNumber: mailNumber
        }),
      });

      // console.log('putResponse.status ', putResponse.status);
      if (putResponse.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      const postResponse = await fetch('http://localhost:9999/mailNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          mailNumber: mailNumber
        }),
      });

      // console.log('postResponse.status ', postResponse.status);

      if (postResponse.status === 201) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log('err', err);
    return false;
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await fetch(`http://localhost:9999/mailNumber?email=${body.email}`);
    const data = await response.json();

    if (data.length > 0) {
      const existingDataId = data[0].id;
      const deleteResponse = await fetch(`http://localhost:9999/mailNumber/${existingDataId}`, {
        method: 'DELETE',
      });

      console.log('deleteResponse.status ', deleteResponse.status);
      if (deleteResponse.status === 200) {
        return new NextResponse(JSON.stringify({ success: true, status: 200 }));
      } else {
        return new NextResponse(JSON.stringify({ success: true, status: 404 }));
      }
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }
  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}