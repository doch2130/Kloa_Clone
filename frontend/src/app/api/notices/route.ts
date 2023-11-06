// 현재 api 방식
// src/app/api
// api/hello/example.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
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
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response('Error fetching data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response('An error occurred', { status: 500 });
  }
}

// export async function POST(req: Request) {
export async function POST(req: NextRequest, res:NextResponse) {
  const body = await req.json();
  // console.log(body);

  const date = new Date();

  try {
    const response = await fetch('http://localhost:9999/mainNotices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: body.category,
        title: body.title,
        textData: body.textData,
        writeTime: date,
        viewCount: 0,
        likeCount: 0,
      })
    });

    if(response.ok) {
      const data = await response.json();
      return new NextResponse(JSON.stringify({message: 'Success', status: response.status}));
    } else {
      return new NextResponse('Error Write data', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('An error occurred', { status: 500 });
  }
}
