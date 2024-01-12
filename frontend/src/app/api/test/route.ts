import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'
import path from 'path';
import fs from "fs";
import { writeFile } from "fs/promises";

export async function GET(req: NextRequest) {

  try {
    // top 5 가져오기 함수

    // Fetch API를 사용하여 외부 웹페이지의 데이터 가져오기
    const responseData = await fetch('https://lostark.game.onstove.com/Profile/Character/키토단');

    const result = await responseData.text();


    // 현재 폴더 디렉토리 경로 가져오는 함수 (frontend 폴더)
    // console.log('process.cwd() ',process.cwd());
    const filePath = path.join(process.cwd(), `/src/assets/test`);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }


    const fileData = result;
    const fileName = `${filePath}/test2.json`

    await writeFile(fileName, JSON.stringify(fileData, null, 2), 'utf-8');



    return NextResponse.json({ success: true, status: 404, result: [] });

  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ success: false, status: 500 });
  }
}

