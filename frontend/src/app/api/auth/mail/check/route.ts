import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/config/nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // transperter 활용해 이메일 전송
  try {
    const response = await fetch(`http://localhost:9999/mailNumber?email=${body.email}&mailNumber=${body.number}`, {
      method: 'GET',
    });

    if(response.ok) {
      const data = await response.json();
      // console.log('data ', data);
      // console.log('data ', data.length);

      if(data.length === 0) {
        return new NextResponse(JSON.stringify({ data: data, status: 204 }));
      } else {
        return new NextResponse(JSON.stringify({ data: data, status: 200 }));
      }
    } else {
      return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.', status: 500})); 
    }

  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.', status: 500})); 
  }

}
