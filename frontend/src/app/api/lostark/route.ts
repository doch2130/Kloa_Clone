import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'
import path from 'path';
import fs from "fs";
import { readFile } from "fs/promises";

async function getNotices() {
  try {
    const notices = await prisma.notices.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return notices;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getAdventureIsland(reqDate:string | null) {
  try {
    let date = new Date();

    if(reqDate) {
      date = new Date(reqDate);
    }

    // console.log('date ', date);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    const folderName = `${year}${month}`;

    // console.log('folderName ', folderName);
  
    // 현재 폴더 디렉토리 경로 가져오는 함수 (frontend 폴더)
    // console.log('process.cwd() ',process.cwd());
    const filePath = path.join(process.cwd(), `/src/assets/Schedule/${folderName}`);
  
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  
    const fileDate = `${year}-${month}-${day}`;
    const fileName = `${filePath}/${fileDate}.json`
    const adventureFile = await readFile(fileName, 'utf-8');
    
    // console.log('fileDate', fileDate);
    // console.log('adventureFile', adventureFile);
    // console.log('adventureFile', JSON.parse(adventureFile));

    return JSON.parse(adventureFile);
  } catch (error:any) {
    console.log(error);
    if (error.code === 'ENOENT') {
      console.error('File not found');
    } else {
      console.error('Error reading file:', error);
    }
    return [];
  }
}


export async function GET(req: NextRequest) {
  // 로스트아크 공지사항, 캘린더 가져오기

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const reqDate = searchParams.get('currentDate');
  // console.log('category ', category);
  // console.log('reqDate ', reqDate);

  try {
    if(category === 'notices') {
      const notices = await getNotices();
      return NextResponse.json({ result: notices, status: 200 });
      // return new NextResponse(JSON.stringify({result: notices, status: 200}));
    }

    if(category === 'adventure') {
      const adventure = await getAdventureIsland(reqDate);
      return NextResponse.json({ result: adventure, status: 200 });
      // return new NextResponse(JSON.stringify({result: adventure, status: 200}));
    }

    return NextResponse.json({ result: [], status: 200 });
    // return new NextResponse(JSON.stringify({result: [], status: 200}));

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'LostArk Notices Update error', status: 500 });
    // return new NextResponse(JSON.stringify({message: 'LostArk Notices Update error', status: 500}));
  }
}
