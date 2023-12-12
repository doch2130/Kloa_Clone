import { NextRequest, NextResponse } from "next/server"
import { verifyStringJwt } from "@/app/lib/jwt"
import prisma from '@/app/lib/prisma'

export async function DELETE(req: NextRequest) {
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
    
    const post = await prisma.mainnotices.findFirst({
      where: {
        id: body.id
      }
    });

    if(!post) {
      return NextResponse.json({ success: true, status: 404 });
      // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }

    const postDelete = await prisma.mainnotices.delete({
      where: {
        id: body.id
      }
    });

    // console.log('postDelete ', postDelete);

    if(postDelete) {
      return NextResponse.json({ success: true, status: 200 });
      // return new NextResponse(JSON.stringify({ success: true, status: 200 }));
    } else {
      return NextResponse.json({ success: false, status: 404 });
      // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }

  } catch (err) {
    // console.log('err', err);
    return NextResponse.json({ success: false, status: 500 });
    // return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}