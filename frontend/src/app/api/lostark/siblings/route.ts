
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const characterName = searchParams.get('characterName');

  // 로스트아크 API 보유 캐릭터 가져오기
  const url = 'https://developer-lostark.game.onstove.com/characters/' + characterName + '/siblings';

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
      // console.log('data ', data);
      if(data !== null) {
        return NextResponse.json({ message: 'Character Sibling Search Success', status: 200, data });
      } else {
        return NextResponse.json({ message: 'Character Sibling Search Not Found', status: 404, data });
      }
    } else {
      return NextResponse.json({ message: 'Character Sibling Search error', status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Character Sibling Search error', status: 500 });
  }
}
