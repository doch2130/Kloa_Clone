import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prisma'
import { merchantListType } from "@/types/merchant";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serverName = searchParams.get('server') || '';

  try {
    if(serverName.trim() === '') {
      return NextResponse.json({ data: undefined, message: 'Merchant Data Get Bad Request', status: 400 });
    }

    const getMerchants = await getMerchant(serverName);

    if(getMerchants.status === 500) {
      return NextResponse.json({ data: undefined, message: 'Merchant Data Get error', status: 500 });
    }

    return NextResponse.json({ data: getMerchants, message: 'Merchant Data Get Success', status: 200 });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: undefined, message: 'Merchant Data Get error', status: 500 });
  }
}

const getMerchant = async (server:string) => {
  let merchantList:merchantListType[] = [];
  try {
    if(server === '전 서버') {
      merchantList = await prisma.merchant.findMany({
        orderBy: [{ reportTime: 'desc'}],
      });
    } else {
      merchantList = await prisma.merchant.findMany({
        where: {
          server: server
        },
        orderBy: [{ reportTime: 'desc'}],
      });
    }
    
    return { merchantList: merchantList, status:200 };

  } catch (error) {
    console.error('Error: ', error);
    return { merchantList: [], status: 500 };
  }
}
