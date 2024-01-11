'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { getOwnedCharacter, itemLevelBorderStyleFunction } from '../utils'
import Link from 'next/link'
import Image from 'next/image'
import { CharacterInfo } from '@/types/siblings'

export default function OwnedCharacterTab() {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;

  const { data:havaCharacterList, isLoading:isHavaCharacterListLoading } = useQuery({ queryKey: ['havaCharacterList', name], queryFn: () => getOwnedCharacter(name) });

  useEffect(() => {
    if(havaCharacterList !== undefined) {
      const havaCharacterListData = havaCharacterList?.data;
      const findSearchCharacter = havaCharacterListData?.filter((characterInfo:CharacterInfo) => characterInfo.CharacterName === name);
      
      // const updateHavaCharacterList:CharacterInfo[] = havaCharacterList.data.map((list:CharacterInfo) => )
    }
  }, []);
  
  if(isHavaCharacterListLoading) {
    return (
      <div className='w-full h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  console.log('havaCharacterList ', havaCharacterList);
  // console.log('havaCharacterList.ServerName ', havaCharacterList?.data?.[0]?.ServerName);

  return (
    <>
      {/* 주간 획득 골드량 */}
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'></div>

      {/* 서버 및 캐릭터 리스트 */}
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
        <div className='flex items-end justify-between mb-4 font-semibold text-head dark:text-[#eaf0ec]'>
          <p className='text-xl'>카제로스</p>
          <p>
            <span className='text-[#7d8395]'>보유 캐릭터</span>&nbsp;7
          </p>
        </div>
        {/* 캐릭 정렬 */}
        <div className='grid grid-cols-2 gap-4'>
          {/* 액티브 일때 border 설정 다름 */}
          {/* 액티브 아닐때 border-[#e6e8ec] dark:border-[#57585e] */}
          <Link href={`./characters/${'키토단'}`} className='border rounded-lg overflow-hidden border-[#7d8395]'>
            {/* 레벨에 따른 border-l- 설정 다름, itemLevelBorderStyleFunction 함수 사용 */}
            <div className='border-l-[6px] px-3 py-2 flex items-center gap-x-3 border-l-[#D9AB48]'>
              {/* 캐릭터 아이콘 */}
              <div className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-full'>
                <Image src="https://cdn.korlark.com/lostark/avatars/scouter.png" alt="스카우터" loading="lazy" width={44} height={44} decoding="async" />
              </div>
              {/* 캐릭터 정보 */}
              <div className='grow space-y-[1px]'>
                <p className='text-sm font-medium text-[#7d8395] dark:text-[#b6b9c2]'>Lv.60 스카우터</p>
                <p className='text-base font-[650]'>키토단</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-1'>
                    <svg className="fill-[#353945] dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="12.444" height="16" viewBox="0 0 12.444 16">
                      <defs>
                        <clipPath id="clip-path">
                          <rect id="사각형_91" data-name="사각형 91" width="12.444" height="16"></rect>
                        </clipPath>
                      </defs>
                      <g id="ico_itemlevel_black" clipPath="url(#clip-path)">
                        <path id="패스_94" data-name="패스 94" d="M12.015,4.16h-.336a5.472,5.472,0,0,0-3.359-2.7L6.221,0l-2.1,1.462A5.468,5.468,0,0,0,.766,4.16H.428a15.187,15.187,0,0,0-.419,4.2l.5-.352v3.322a1.392,1.392,0,0,0,.4.969L4.5,16V8.469l-.867.651c-1.052.78-1.246.17-1.274-.225V7.051A2.607,2.607,0,0,1,4.04,7.32L5.888,8.357V9.588l-.605.54.939.836.939-.836-.605-.54V8.357L8.4,7.32a2.609,2.609,0,0,1,1.685-.269V8.895c-.028.4-.221,1.006-1.273.225l-.869-.651V16L11.532,12.3a1.392,1.392,0,0,0,.4-.969V8.005l.5.352a15.226,15.226,0,0,0-.42-4.2" transform="translate(0 -0.001)"></path>
                      </g>
                    </svg>
                    <p className='text-base font-semibold'>1627.50</p>
                  </div>
                  <p className='text-sm text-placeholder'>길드 이름</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
