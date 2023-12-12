import { NextRequest, NextResponse } from "next/server"
import { verifyStringJwt } from "@/app/lib/jwt";
import prisma from '@/app/lib/prisma'

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);
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

    const findPost = await prisma.mainnotices.findMany({
      where: {
        id: Number(body.id)
      },
      take: 1,
    });

    if(findPost) {
      const updatePost = await prisma.mainnotices.update({
        data: {
          category: body.category,
          title: body.title,
          content: body.content,
        },
        where: {
          id: Number(body.id)
        }
      });

      // console.log('updatePost ', updatePost);

      if(updatePost) {
        return NextResponse.json({ success: true, status: 200 });
        // return new NextResponse(JSON.stringify({ success: true, status: 200 }));
      } else {
        return NextResponse.json({ success: true, status: 404 });
        // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
      }
    } else {
      return NextResponse.json({ success: true, status: 404, result: [] });
      // return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
    }

  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ success: false, status: 500 });
    // return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}