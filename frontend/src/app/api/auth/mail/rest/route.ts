import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/config/nodemailer"
import prisma from '@/app/lib/prisma'

// 이메일 가입 여부 체크 (중복 검사)
async function emailCheck(email:string):Promise<boolean> {
  // 중복 값 응답 코드 관련 참고 사이트
  // https://deveric.tistory.com/62
  try {
    const existingDataUser = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    // console.log('existingDataUser ', existingDataUser);

    if(existingDataUser) {
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    return false;
  }
}


// 메일 인증번호 업데이트
async function emailAuthNumberSend(email: string, mailNumber: string):Promise<boolean> {
  try {
    const existingDataMailUser = await prisma.mailnumber.findFirst({
      where: {
        email: email
      }
    });

    if(existingDataMailUser) {
      const userMailNumberUpdate = await prisma.mailnumber.update({
        data: {
          mailAuthNumber: mailNumber
        },
        where: {
          email: email
        }
      });
      // console.log('userMailNumberUpdate ',userMailNumberUpdate);
      if(userMailNumberUpdate) {
        return true;
      } else {
        return false;
      }

    } else {
      const userMailNumberCreate = await prisma.mailnumber.create({
        data: {
          email: email,
          mailAuthNumber: mailNumber
        }
      });
      // console.log('userMailNumberCreate ',userMailNumberCreate);
      if(userMailNumberCreate) {
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


export async function POST(req: NextRequest) {
  const body = await req.json();

  const emailDuplicate = await emailCheck(body.email);

  if(!emailDuplicate) {
    return NextResponse.json({ success: false, status: 404 });
    // return new NextResponse(JSON.stringify({ success: false, status: 404 }));
  }

  // 메일 제목 형식에 활용할 fixTime 객체 선언 : 전송 시간 기록
  const fixTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 메일 옵션 정하기
  const mailOptions = {
    // 송신할 이메일 
    from: process.env.GOOGLE_EMAIL,
    to: body.email, // 수신할 이메일
  };

  // 메일 인증번호 생성 6자리
  const number = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');

  let subject = '클로아 회원가입 메일 인증 - ';
  let text = '클로아 회원가입 인증번호 :';
  if(body.type === 'rest') {
    subject = '클로아 비밀번호찾기 메일 인증 - ';
    text = '클로아 비밀번호찾기 인증번호 :';
  }

  // transperter 활용해 이메일 전송
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...{
        text: `${text} ${number}`,
      },
      subject: `${subject}${fixTime}`,
    });

    const emailNumberSave = await emailAuthNumberSend(body.email, number);
    // console.log('emailNumberSave ', emailNumberSave);

    if(emailNumberSave === false) {
      return NextResponse.json({ message: '에러가 발생하였습니다. 메일 전송을 다시 시도해주세요.', status: 500});
      // return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 메일 전송을 다시 시도해주세요.', status: 500})); 
    }

    return NextResponse.json({ success: true, status: 200 });
    // return new NextResponse(JSON.stringify({ success: true, status: 200 }));

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: '메일 전송에 실패함', status: 500});
    // return new NextResponse(JSON.stringify({ message: '메일 전송에 실패함', status: 500}));
  }
}
