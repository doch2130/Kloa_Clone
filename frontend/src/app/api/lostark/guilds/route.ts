import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
  // 로스트아크 길드 정보 가져오기
  const { searchParams } = new URL(req.url);
  const guildName = searchParams.get('guildName') || '';

  try {
    if(guildName.trim() === '') {
      return NextResponse.json({ data: undefined, message: 'Guild Data Get Bad Request', status: 400 });
    }

    const getGuildInfos = await getGuildInfo(guildName);
    // console.log('getGuildInfos ', getGuildInfos);

    if(getGuildInfos.status === 500) {
      return NextResponse.json({ data: undefined, message: 'Guild Data Get error', status: 500 });
    }

    return NextResponse.json({ data: getGuildInfos.guildList, message: 'Guild Data Get Success', status: 200 });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: undefined, message: 'Guild Data Get error', status: 500 });
  }
}

const getGuildInfo = async (guildName:string) => {
  try {
    const guildList = await prisma.characterinfo.findMany({
      where: {
        guildName: guildName
      },
      orderBy: [
        { guildMaster: 'desc'},
        { itemLevel: 'desc' },
        { itemLevelUpdateDate: 'asc' }
      ],
    });

    return { guildList: guildList, status:200 };

  } catch (error) {
    console.error('Error: ', error);
    return { guildList: [], status: 500 };
  }
}
