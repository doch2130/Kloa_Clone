
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guildName = searchParams.get('guildName') || '';
  const serverName = searchParams.get('serverName') || '';

  // console.log('guildName ', guildName);
  // console.log('serverName ', serverName);
  // decodeURIComponent
  // 로스트아크 API 길드 랭킹 가져오기
  const url = `https://developer-lostark.game.onstove.com/guilds/rankings?serverName=${serverName}&GuildName='NextStep'`;
  // const url = `https://developer-lostark.game.onstove.com/guilds/rankings?serverName=${guildName}`;

  // console.log('url ', url);

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
      console.log('data ', data);
      if(data !== null) {
        return NextResponse.json({ message: 'Character Guild Search Success', status: 200, data });
      } else {
        return NextResponse.json({ message: 'Character Guild Search Not Found', status: 404, data });
      }
    } else {
      return NextResponse.json({ message: 'Character Guild Search error', status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Character Guild Search error', status: 500 });
  }
}
