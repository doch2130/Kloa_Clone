import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const existingDataMailUser = await prisma.mailnumber.findFirst({
      where: {
        email: body.email,
        mailAuthNumber: body.number
      }
    });

    if(existingDataMailUser) {
      return new NextResponse(JSON.stringify({ data: existingDataMailUser, status: 200 }));
    } else {
      return new NextResponse(JSON.stringify({ data: existingDataMailUser, status: 204 }));
    }

  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: '에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.', status: 500})); 
  }

}
