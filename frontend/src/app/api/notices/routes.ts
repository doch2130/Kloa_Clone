// 현재 api 방식
// src/app/api
// api/hello/example.ts

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// curl -X 'GET' \
//   'https://developer-lostark.game.onstove.com/news/notices' \
//   -H 'accept: application/json' \
//   -H 'authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAyNzYwMTAifQ.e1_VT2UlasQyNDk3p23Q7yCl020kGgDSDFugBULYFOgklQxkzhHG5uyp_ZUWeRJFOZi1Fz8fdqzpfW-i3oXGC7gUqQ544pXnC7r8-cocEjkygncD1mnfEymXT4eNGVxVIIo69sG6THGtFH6wACHe5hSIsGmcCEKWUm-kCuXEgOJncmpG95FOW8UfUgnAmGF2D7icEVfYNwe3NeNNdkMWsKurgC29rmKsmvcfaCyMSuJnLJKyaFvmhfe6pz1yAC9Ub6oK6CyfKpqSaW16Tjdlta0Pt9RL72C0RkoYnGxw_pHVkMQG914wmta8er4whY7KElGlIveRjmTnC2YN3Kl22g'


export async function GET(request: Request) {
  // 요청을 받아서 리다이렉션 할 수 있음 - start
  // redirect('thisurldoesntexist.com');
  // redirect('http://localhost:3000');
  // redirect는 return 기능도 같이 작동해서 아래 return은 필요없다.
  // 요청을 받아서 리다이렉션 할 수 있음 - end
  // return new Response('hi');
  // const url = 'https://developer-lostark.game.onstove.com/news/notices';
  // fetch(url, {
  //   'accept': 'application/json',
  //   'authorization': {process.env.NEXT_PUBLIC_LOSTARK_API}
  // })
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