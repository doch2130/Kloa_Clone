import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/lib/prisma'
import { verifyJwt } from "@/app/lib/jwt"

export async function GET() {
  const url = 'https://developer-lostark.game.onstove.com/news/notices';

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new NextResponse('Error fetching data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const accessToken = req.headers.get('Authorization');
    // console.log('test ', accessToken);
    if (!accessToken || !verifyJwt(accessToken.slice(7))) {
      return new NextResponse('No Authorization', { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.user
      }
    });

    if(!user) {
      return new NextResponse('Error Not Found User', { status: 500 });
    }

    const post = await prisma.mainnotices.create({
      data: {
        category: body.category,
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
    });
    if(post) {
      return new NextResponse(JSON.stringify({result: post, status: 201}));
    } else {
      return new NextResponse('Error Create Post', { status: 500 });
    }


  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
