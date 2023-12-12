import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/lib/prisma'
import { verifyStringJwt } from "@/app/lib/jwt"
import { xssPrevention } from "../../utill/xssPrevention";

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
      return NextResponse.json({ data, status: response.status, headers: {
        'Content-Type': 'application/json',
      }, });

      // return new NextResponse(JSON.stringify(data), {
      //   status: response.status,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
    } else {
      return NextResponse.json({ message: 'Error fetching data', status: response.status });
      // return new NextResponse(JSON.stringify({ message: 'Error fetching data', status: response.status }));
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred', status: 500 });
    // return new NextResponse(JSON.stringify({ message: 'An error occurred', status: 500 }));
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);

  try {
    const accessToken = req.headers.get('Authorization');
    // console.log('accessToken ', accessToken);

    if(accessToken === null) {
      return NextResponse.json({ redirect: true, status: 401 });
      // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
    }

    if (!(await verifyStringJwt(accessToken?.slice(7)))) {
      // 인증 만료, 로그인 재요청
      req.cookies.delete("next-auth.session-token");
      return NextResponse.json({ redirect: true, status: 401 });
      // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.user
      }
    });

    if(!user) {
      return NextResponse.json({ message: 'Error Not Found User', status: 500 });
      // return new NextResponse(JSON.stringify({ message: 'Error Not Found User', status: 500 }));
    }

    const title = xssPrevention(body.title);
    const content = xssPrevention(body.content);
    const post = await prisma.mainnotices.create({
      data: {
        category: body.category,
        title: title,
        content: content,
        authorId: user.id,
      },
    });
    if(post) {
      return NextResponse.json({ result: post, status: 201 });
      // return new NextResponse(JSON.stringify({result: post, status: 201}));
    } else {
      return NextResponse.json({ message: 'Error Create Post', status: 500 });
      // return new NextResponse(JSON.stringify({ message: 'Error Create Post', status: 500 }));
    }


  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred', status: 500 });
    // return new NextResponse(JSON.stringify({ message: 'An error occurred', status: 500 }));
  }
}
