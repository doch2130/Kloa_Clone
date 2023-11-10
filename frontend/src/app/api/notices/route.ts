import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

// 상세 페이지 가져오기 전용 함수
async function getPostDetail(id:number) {
  const post = await prisma.mainnotices.findFirst({
    where: {
      id: id
    }
  });
  return post;
}

// 전체 리스트 가져오기, 상세 페이지 가져오기
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const detail = searchParams.get('detail');

  try {
    // 상세 페이지 가져오는 함수 / 분기점
    if(detail === 'true' && id !== null) {
      const post = await getPostDetail(Number(id));
      if(post) {
        return new NextResponse(JSON.stringify({ success: true, status: 200, result: post }));
      } else {
        return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
      }
    }

    // 전체 리스트 가져오는 함수
    // skip은 앞에서부터 X개를 건너뛰고, take는 건너뛴 이후 부터 X개를 가져온다는 의미
    const postList = await prisma.mainnotices.findMany({
      skip: 0,
      take: 100,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // console.log('postList ', postList);

    if(postList) {
      return new NextResponse(JSON.stringify({ success: true, status: 200, result: postList }));
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
    }

  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}


// 조회수 증가 함수
export async function PATCH(req: NextRequest) {
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

    const updateViewCount = post.viewCount + 1;

    const postUpdate = await prisma.mainnotices.update({
      data: {
        viewCount: updateViewCount
      },
      where: {
        id: body.id
      }
    });

    if(postUpdate) {
      return new NextResponse(JSON.stringify({ success: true, status: 200, viewCount: updateViewCount }));
    } else {
      return new NextResponse(JSON.stringify({ success: true, status: 404 }));
    }

  } catch (err) {
    console.log('err', err);
    return new NextResponse(JSON.stringify({ success: false, status: 500 }));
  }
}
