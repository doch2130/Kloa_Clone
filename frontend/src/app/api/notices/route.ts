import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'


// top 5 페이지 가져오기 전용 함수
async function getTopPost() {
  const topPostList = await prisma.mainnotices.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      createdAt: 'desc'
    }
  });
  return topPostList;
}

// 상세 페이지 가져오기 전용 함수
async function getPostDetail(id: number) {
  // console.log('id ', id);
  // 서브쿼리를 지원하지 않지만, 해당 방법으로 id 기준 이전, 이후 값도 같이 가져올 수 있다.
  const post = await prisma.mainnotices.findMany({
    where: {
      id: id
    },
    take: 1,
  });

  const prevPost = await prisma.mainnotices.findMany({
    where: {
      id: { lt: id }
    },
    orderBy: {
      id: 'desc'
    },
    take: 1,
  });

  const nextPost = await prisma.mainnotices.findMany({
    where: {
      id: { gt: id }
    },
    orderBy: {
      id: 'asc'
    },
    take: 1,
  });

  return [post, prevPost, nextPost];
}


// 수정 페이지 데이터 가져오기 전용 함수
async function getPostUpdateDetail(id: number) {
  // console.log('id ', id);
  // 서브쿼리를 지원하지 않지만, 해당 방법으로 id 기준 이전, 이후 값도 같이 가져올 수 있다.
  const post = await prisma.mainnotices.findMany({
    where: {
      id: id
    },
    take: 1,
  });

  return post;
}


// 전체 리스트 가져오기, 상세 페이지 가져오기
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const detail = searchParams.get('detail');
  const update = searchParams.get('update');
  const top = searchParams.get('top');
  const page = searchParams.get('page');

  try {
    // top 5 가져오기 함수
    if(top === 'true') {
      const topPost = await getTopPost();
      if(topPost) {
        return NextResponse.json({ success: true, status: 200, result: topPost });
        // return new NextResponse(JSON.stringify({ success: true, status: 200, result: topPost }));
      } else {
        return NextResponse.json({ success: true, status: 404, result: [] });
        // return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
      }
    }

    // 상세 페이지 가져오는 함수 / 분기점
    if(detail === 'true' && id !== null) {
      if(update === 'true') {
        const updateDetailPosts = await getPostUpdateDetail(Number(id));
        if(updateDetailPosts) {
          return NextResponse.json({ success: true, status: 200, result: updateDetailPosts });
          // return new NextResponse(JSON.stringify({ success: true, status: 200, result: updateDetailPosts }));
        } else {
          return NextResponse.json({ success: true, status: 404, result: [] });
          // return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
        }
      }
      const posts = await getPostDetail(Number(id));
      // console.log('posts ', posts);
      if(posts) {
        return NextResponse.json({ success: true, status: 200, result: posts });
        // return new NextResponse(JSON.stringify({ success: true, status: 200, result: posts }));
      } else {
        return NextResponse.json({ success: true, status: 404, result: [] });
        // return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
      }
    }

    // 전체 리스트 가져오는 함수
    // 임시 보류
    // const skipValue = page === null ? 0 : (Number(page)-1)*10;
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
      return NextResponse.json({ success: true, status: 200, result: postList });
      // return new NextResponse(JSON.stringify({ success: true, status: 200, result: postList }));
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
      return NextResponse.json({ success: true, status: 404 });
      // return new NextResponse(JSON.stringify({ success: true, status: 404 }));
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
      return NextResponse.json({ success: true, status: 200, viewCount: updateViewCount });
      // return new NextResponse(JSON.stringify({ success: true, status: 200, viewCount: updateViewCount }));
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
