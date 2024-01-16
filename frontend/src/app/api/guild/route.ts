import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'
import { jobClassListCountType } from "@/types/guild";

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

    // return NextResponse.json({ data: getGuildInfos.guildList, message: 'Guild Data Get Success', status: 200 });
    return NextResponse.json({ data: getGuildInfos, message: 'Guild Data Get Success', status: 200 });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: undefined, message: 'Guild Data Get error', status: 500 });
  }
}

const getGuildInfo = async (guildName:string) => {
  const jobClassListCount:jobClassListCountType = {
    '워로드': 0,
    '디스트로이어': 0,
    '버서커': 0,
    '홀리나이트': 0,
    '슬레이어': 0,
    '스트라이커': 0,
    '브레이커': 0,
    '배틀마스터': 0,
    '인파이터': 0,
    '기공사': 0,
    '창술사': 0,
    '데빌헌터': 0,
    '블래스터': 0,
    '호크아이': 0,
    '스카우터': 0,
    '건슬링어': 0,
    '바드': 0,
    '서머너': 0,
    '아르카나': 0,
    '소서리스': 0,
    '블레이드': 0,
    '데모닉': 0,
    '리퍼': 0,
    '소울이터': 0,
    '도화가': 0,
    '기상술사': 0,
    'dealer': 0,
    'supporter': 0,
  };
  
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

    guildList.forEach((list) => {
      jobClassListCount[list.jobClass]++
      
      if(list.jobClass === '바드' || list.jobClass === '홀리나이트' || list.jobClass === '도화가') {
        jobClassListCount['supporter']++
      } else {
        jobClassListCount['dealer']++
      }
    });

    return { guildList: guildList, jobClassListCount: jobClassListCount, status:200 };

  } catch (error) {
    console.error('Error: ', error);
    return { guildList: [], jobClassListCount: jobClassListCount, status: 500 };
  }
}


