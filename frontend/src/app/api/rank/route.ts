import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
  // 로스트아크 랭크 가져오기
  // const { searchParams } = new URL(req.url);

  try {
    const getRanks = await getRankList();

    if(getRanks.status === 500) {
      return NextResponse.json({ data: undefined, message: 'Rank Data Get error', status: 500 });
    }

    return NextResponse.json({ data: getRanks.rankList, message: 'Rank Data Get Success', status: 200 });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: undefined, message: 'Rank Data Get error', status: 500 });
    // return new NextResponse(JSON.stringify({message: 'LostArk Notices Update error', status: 500}));
  }
}

const getRankList = async () => {
  try {
    const rankList = await prisma.characterinfo.findMany({
      skip: 0,
      take: 100,
      orderBy: [
        { itemLevel: 'desc' },
        { itemLevelUpdateDate: 'asc' }
      ],
    });

    return { rankList, status:200 };

  } catch (error) {
    console.error('Error: ', error);
    return { rankList: [], status: 500 };
  }
}