import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/lib/prisma'
import * as bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        privacy: body.privacy
      },
    });

    // console.log('user ', user);

    if(user) {
      const { password, ...result } = user;
      return NextResponse.json(result);
      // return new NextResponse(JSON.stringify(result))
    } else {
      return NextResponse.json({ message: 'Error user add', status: 500 });
      // return new NextResponse(JSON.stringify({ message: 'Error user add', status: 500 }));
    }

  } catch (error) {
    console.error('user add error: ', error);
    return NextResponse.json({ message: 'An error occurred', status: 500 });
    // return new NextResponse(JSON.stringify({ message: 'An error occurred', status: 500 }));
  }
}
