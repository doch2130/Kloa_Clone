import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

export async function GET(req: NextRequest) {
  // 로스트아크 공지사항 가져오기
  try {
    const notices = await prisma.notices.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(JSON.stringify({data: notices, status: 200}));

  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(JSON.stringify({message: 'LostArk Notices Update error', status: 500}));
  }
}
