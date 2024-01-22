'use client'
import React, { useEffect } from 'react'

export default function Sell() {

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

  return (
    <div>Sell</div>
  )
}
