import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  // console.log('body ', body);
  try {
    const post = await prisma.mainnotices.findFirst({
      where: {
        id: body.id
      }
    });

    if(!post) {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }

    const postDelete = await prisma.mainnotices.delete({
      where: {
        id: body.id
      }
    });

    // console.log('postDelete ', postDelete);

    if(postDelete) {
      return new NextResponse(JSON.stringify({ success: true, status: 200 }));
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }
    
  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}