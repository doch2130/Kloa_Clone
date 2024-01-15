import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
  // 로스트아크 랭크 가져오기
  const { searchParams } = new URL(req.url);

  const server = searchParams.get('server') || '';
  const job = searchParams.get('job') || '';
  const engraving = searchParams.get('engraving') || '';
  const minLevel = searchParams.get('minLevel') || '';
  const maxLevel = searchParams.get('maxLevel') || '';
  const skipStart = searchParams.get('start') || '0';
  const limit = searchParams.get('limit') || '0';

  try {
    const getRanks = await getRankList(server, job, engraving, minLevel, maxLevel, Number(skipStart), Number(limit));

    if(getRanks.status === 500) {
      return NextResponse.json({ data: undefined, message: 'Rank Data Get error', status: 500 });
    }

    return NextResponse.json({ data: getRanks.rankList, message: 'Rank Data Get Success', status: 200 });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: undefined, message: 'Rank Data Get error', status: 500 });
  }
}

const getRankList = async (server:string, job:string, engraving:string, minLevel:string, maxLevel:string, skipStart:number, limit:number) => {
  let rankWhere = [];

  if (server !== '' && server !== '전 서버') {
    rankWhere.push({ server: server });
  }

  if (job !== '' && job !== '전체 클래스') {
    rankWhere.push({ jobClass: job });
  }

  if (engraving !== '' && engraving !== '전체') {
    rankWhere.push({ jobEngraving: { contains: engraving } });
  }

  rankWhere.push({ itemLevel: { gte: Number(minLevel) } });
  rankWhere.push({ itemLevel: { lte: Number(maxLevel) } });

  const lastRankWhere = { AND: rankWhere };

  try {
    const rankList = await prisma.characterinfo.findMany({
      where: lastRankWhere,
      skip: skipStart,
      take: limit,
      orderBy: [
        { itemLevel: 'desc' },
        { itemLevelUpdateDate: 'asc' }
      ],
    });

    const updateRankList = rankList.map((rank, index:number) => ({
      ...rank,
      ranking: skipStart + index
    }));

    return { rankList: updateRankList, status:200 };

  } catch (error) {
    console.error('Error: ', error);
    return { rankList: [], status: 500 };
  }
}
