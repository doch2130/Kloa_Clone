// 현재 api 방식
// src/app/api
// api/hello/example.ts

import { NextRequest } from "next/server";

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
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(req.cookies.get('cookie'));
  console.log(body);
  console.log(req.headers.get('Authorization'));

  // return new Response('OK');
  return new Response(JSON.stringify({ hello: 'world' }));
}