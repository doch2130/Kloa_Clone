import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const user = await prisma.user.update({
      data: {
        password: await bcrypt.hash(body.password, 10),
      },
      where: {
        email: body.email
      }
    });

    // console.log('user ', user);

    if(user) {
      const { password, ...result } = user;
      return new NextResponse(JSON.stringify({ data: result, status: 200 }))
    } else {
      return new NextResponse(JSON.stringify({ message: 'Error password update', status: 500 }));
    }

  } catch (error) {
    console.error('user add error: ', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred', status: 500 }));
  }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if(!email) {
    return new NextResponse(JSON.stringify({ message: 'Error email data', status: 500 }));
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        email: email
      },
      take: 1
    });
    if(user.length > 0) {
      return new NextResponse(JSON.stringify({ message: 'Find User Data', status: 200 }));
    } else {
      return new NextResponse(JSON.stringify({ message: 'Error Find User', status: 500 }));
    }
  } catch (error) {
    console.error('user add error: ', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred', status: 500 }));
  }
}