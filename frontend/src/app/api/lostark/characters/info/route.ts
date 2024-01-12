
import { NextRequest, NextResponse } from "next/server"

// export async function GET(req: NextRequest) {
export async function POST(req: NextRequest) {
  const body = await req.json();
  // const { searchParams } = new URL(req.url);
  // const characterName = searchParams.get('characterName');

  if(body.characterName === null || body.characterName.trim() === '') {
    return NextResponse.json({ message: 'Character Info Bad Request', status: 400 });
  }

  // 로스트아크 API 캐릭터 데이터 업데이트 요청하기 (backend로 전송)
  // const url = `${process.env.BACKEND_URL}/lostark/crawling/update?characterName=${body.characterName}`;
  const url = `${process.env.BACKEND_URL}/lostark/crawling/update`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        characterName: body.characterName,
        characterImage: body.characterImage,
        engravingList: body.engravingList,
      }),
    });

    // console.log('response.status ', response.status);

    if (response.ok) {
      const data = await response.json();
      // console.log('data ', data);
      if(data.status === 200) {
        return NextResponse.json({ message: 'Character Info Update Success', status: 200 });
      } else {
        return NextResponse.json({ message: 'Character Info error', status: 500 });
      }
    } else {
      return NextResponse.json({ message: 'Character Info error', status: 500 });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Character Info error', status: 500 });
  }
}
