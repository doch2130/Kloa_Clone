'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react'

import { ImgAuctionEmpty } from '/public/images';
import { useRouter } from 'next/navigation';

export default function Sell() {
  const session = useSession();
  const router = useRouter();

  // 경매장 상품 코드 확인
  const getTest = async () => {
    const url = 'https://developer-lostark.game.onstove.com/auctions/options';

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`,
      },
    });

    const result = await response.json();
    console.log('getTest ', result);
  }

  // 경매장 상품 검색
  const test = async () => {
    const url = 'https://developer-lostark.game.onstove.com/auctions/items';
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ItemLevelMin: 0,
        ItemLevelMax: 0,
        ItemGradeQuality: null,
        SkillOptions: [
          {
            FirstOption: null,
            SecondOption: null,
            MinValue: null,
            MaxValue: null
          }
        ],
        EtcOptions: [
          {
            FirstOption: null,
            SecondOption: null,
            MinValue: null,
            MaxValue: null
          }
        ],
        Sort: 'BIDSTART_PRICE',
        // CategoryCode: 0,
        CategoryCode: 200040,
        // CharacterClass: 'string',
        CharacterClass: '',
        // ItemTier: null,
        ItemTier: 3,
        // ItemGrade: 'string',
        ItemGrade: '',
        // ItemName: 'string',
        ItemName: '',
        PageNo: 0,
        SortCondition: 'ASC'
      })
    });
    // console.log('test ', response);
    const result = await response.json();
    console.log('test ', result);
  }

  // useEffect(() => {
  //   getTest();
  //   test();
  // }, []);

  console.log('session ', session);
  if(session?.data === null) {
    return (
      <div className='flex items-center justify-between w-full bg-white dark:bg-[#2b2d31]' style={{height: 'calc(100vh - 70px)'}}>
        <div className='items-center self-center justify-center mx-auto text-center'>
          <Image alt="access-denied" loading="lazy" width="268" height="268" decoding="async" className="mx-auto" src={ImgAuctionEmpty} />
          <div className="text-lg font-semibold text-[#7d8395] my-7">
            아이템 거래는 로그인을 하셔야 이용이 가능합니다.<br />클로아 스토브 인증도 함께 진행해 주세요.
          </div>
          <button className="w-[120px] px-6 py-3 font-semibold text-lg bg-gradient-to-r from-[#5865f2] to-[#8045dd] transition-colors duration-300 ease-in-out text-white rounded-[10px]" onClick={() => {router.push('/auth/login')}}>로그인</button>
        </div>
      </div>
    )
  }

  return (
    <div>Sell</div>
  )
}
