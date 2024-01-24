
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/libs/prisma'

async function getVisitCount(name:string) {
  try {
    const isCharacter = await prisma.characterinfo.findMany({
      select: {
        todayCount: true,
        totalCount: true,
      },
      where: {
        name: name
      }
    });

    if(isCharacter.length <= 0) {
      return { status: 404, message: 'not Find Character', data: undefined }
    }
    
    return { status: 200, message: 'Find Character Visit Count', data: isCharacter[0] };

  } catch (error) {
    console.error('Error:', error);
    return { status: 500, message: 'server error', data: undefined };
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const characterName = searchParams.get('characterName');
  
  try {
    if(characterName === null || characterName.trim() === '') {
      return NextResponse.json({ message: 'Character Search Not Found', status: 404, data: undefined });
    }

    const response = await getVisitCount(characterName);

    if(response.status === 200) {
      return NextResponse.json({ message: 'Character Visit Count Success', status: 200, data: response.data });
    } else if(response.status === 404) {
      return NextResponse.json({ message: 'Character Search Not Found', status: 404, data: undefined });
    } else {
      return NextResponse.json({ message: 'Character Visit Count error', status: response.status, data: undefined });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Character Visit Count error', status: 500, data: undefined });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  try {
    if(body.characterName.trim() === '') {
      return NextResponse.json({ message: 'Character Search Not Found', status: 400, data: undefined });
    }

    const isCharacter = await prisma.characterinfo.findFirst({
      where: {
        name: body.characterName
      }
    });

    if(!isCharacter) {
      return NextResponse.json({ message: 'Character Search Not Found', status: 404, data: undefined });
    }

    const updatTodayVisitCount = isCharacter.todayCount + 1;
    const updatTotalVisitCount = isCharacter.totalCount + 1;

    const visitUpdate = await prisma.characterinfo.update({
      data: {
        todayCount: updatTodayVisitCount,
        totalCount: updatTotalVisitCount,
      },
      where: {
        id: isCharacter.id
      }
    })

    if(visitUpdate) {
      const data = {
        todayCount: visitUpdate.todayCount,
        totalCount: visitUpdate.totalCount
      }

      return NextResponse.json({ message: 'Character Visit Count Success', status: 200, data: data });
    } else {
      return NextResponse.json({ message: 'Character Search Not Found', status: 404, data: undefined });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Character Visit Count error', status: 500, data: undefined });
  }
}
