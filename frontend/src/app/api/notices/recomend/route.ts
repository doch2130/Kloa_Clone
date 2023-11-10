import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);

  try {
    const post = await prisma.mainnotices.findFirst({
      where: {
        id: body.postId
      }
    });

    if(!post) {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
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
      return new NextResponse(JSON.stringify({ success: true, status: 200, recomendCount: updateRecomendCount }));
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }
    
  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}