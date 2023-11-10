import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

// export async function GET() {
//   try {
//     // skip은 앞에서부터 X개를 건너뛰고, take는 건너뛴 이후 부터 X개를 가져온다는 의미
//     const postList = await prisma.mainnotices.findMany({
//       skip: 0,
//       take: 100,
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     // console.log('postList ', postList);

//     if(postList) {
//       return new NextResponse(JSON.stringify({ success: true, status: 200, result: postList }));
//     } else {
//       return new NextResponse(JSON.stringify({ success: true, status: 404, result: [] }));
//     }

//   } catch (err) {
//     console.log('err', err);
//     return new NextResponse(JSON.stringify({ success: false, status: 500 }));
//   }
// }


// export async function PATCH(req: NextRequest) {
//   const body = await req.json();
//   // console.log('body ', body);
//   try {
//     const post = await prisma.mainnotices.findFirst({
//       where: body.id
//     });

//     if(!post) {
//       return new NextResponse(JSON.stringify({ success: true, status: 404 }));
//     }

//     const updateViewCount = post.viewCount + 1;

//     const postUpdate = await prisma.mainnotices.update({
//       data: {
//         viewCount: updateViewCount
//       },
//       where: body.id
//     });

//     if(postUpdate) {
//       return new NextResponse(JSON.stringify({ success: true, status: 200, viewCount: updateViewCount }));
//     } else {
//       return new NextResponse(JSON.stringify({ success: true, status: 404 }));
//     }

//   } catch (err) {
//     console.log('err', err);
//     return new NextResponse(JSON.stringify({ success: false, status: 500 }));
//   }
// }


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