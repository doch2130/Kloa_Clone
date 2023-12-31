import { NextRequest, NextResponse } from "next/server"
import { verifyStringJwt } from "@/libs/jwt"
import prisma from '@/libs/prisma'

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);

  try {
    const accessToken = req.headers.get('Authorization');
    // console.log('accessToken ', accessToken);

    if(accessToken === null) {
      return NextResponse.json({ redirect: false, status: 401 });
      // return new NextResponse(JSON.stringify({redirect: false, status: 401}));
    }

    if (!(await verifyStringJwt(accessToken?.slice(7)))) {
      // 인증 만료, 로그인 재요청
      req.cookies.delete("next-auth.session-token");
      return NextResponse.json({ redirect: true, status: 401 });
      // return new NextResponse(JSON.stringify({redirect: true, status: 401}));
    }
    
    const post = await prisma.mainnotices.findFirst({
      where: {
        id: body.postId
      }
    });

    if(!post) {
      return NextResponse.json({ success: true, status: 404 });
      // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }

    const updateRecomendCount = post.recomendCount + 1;

    const postUpdate = await prisma.mainnotices.update({
      data: {
        recomendCount: updateRecomendCount
      },
      where: {
        id: body.postId
      }
    });

    if(postUpdate) {
      return NextResponse.json({ success: true, status: 200, recomendCount: updateRecomendCount });
      // return new NextResponse(JSON.stringify({ success: true, status: 200, recomendCount: updateRecomendCount }));
    } else {
      return NextResponse.json({ success: true, status: 404 });
      // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }
    
  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ success: false, status: 500 });
    // return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}