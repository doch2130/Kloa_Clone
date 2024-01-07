'use client'
import React, { lazy, useState } from 'react'
import Image from 'next/image'

import { ArmoryProfile } from '@/types/characters'

import { IconStarEmpty, IconStarFull } from '/public/svgs'



interface CharacterSummaryProps {
  ArmoryProfile?: ArmoryProfile
}

// 무기 강화에 따른 효과 설정
// 23강
// bg-[#F25068]
const characterBackgroundColor = {
  maskImage: 'linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)',
  WebkitMaskImage: 'linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)'
};

// 24강
// bg-[#EAC072]" style="mask-image: linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)

// 25강
// bg-[#EAC072]" style="mask-image: linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%);

// 에스더
// bg-[#00FFFD]" style="mask-image: linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%);

export default function CharacterSummary({ ArmoryProfile }:CharacterSummaryProps) {
  const [isFavoriteCheck, setIsFavoriteCheck] = useState<boolean>(false);

  const favoriteCheckHandler = () => {
    setIsFavoriteCheck((prev) => !prev);
    return ;
  }

  return (
    <>
    <div className='w-full h-[300px] bg-[#15181d] relative overflow-hidden'>
      {/* 캐릭터 사진 */}
      <div className='absolute w-[612px] right-[-180px] top-[-60px]'>
        {ArmoryProfile?.CharacterImage && <Image src={ArmoryProfile.CharacterImage} alt='character Image' width={612} height={708} priority={true} />}
      </div>
      {/* 아이템 레벨에 따른 배경 색 다른 효과 */}
      <div className='absolute inset-0 mix-blend-lighten transition-colors duration-[2000ms] ease-out bg-[#EAC072]' style={characterBackgroundColor}></div>
      {/* 직업, 서버, 이름, 레벨 */}
      <div className='absolute text-white top-5 left-5 drop-shadow'>
        <p className='text-base drop-shadow'>{`Lv. ${ArmoryProfile?.CharacterLevel} ${ArmoryProfile?.CharacterClassName} @${ArmoryProfile?.ServerName}`}</p>
        <h1 className='text-xl font-semibold mt-1.5 drop-shadow flex items-center'>{ArmoryProfile?.CharacterName}</h1>
        <svg className="mt-2.5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="269" height="29" viewBox="0 0 269 29">
          <defs>
            <clipPath id="clip-path">
              <rect id="사각형_91" data-name="사각형 91" width="14" height="18" fill="none"></rect>
            </clipPath>
          </defs>
          <g id="ico_itemlevel" transform="translate(0 4.988)">
            <g id="그룹_141" data-name="그룹 141" transform="translate(0 0)" clipPath="url(#clip-path)">
              <path id="패스_94" data-name="패스 94" d="M13.517,4.68h-.378C12.193,2.4,9.36,1.644,9.36,1.644L7,0,4.641,1.644S1.805,2.4.861,4.68H.482A17.085,17.085,0,0,0,.011,9.4l.56-.4v3.737a1.566,1.566,0,0,0,.454,1.09L5.058,18V9.528l-.976.732c-1.183.878-1.4.191-1.434-.254V7.933a2.933,2.933,0,0,1,1.9.3L6.624,9.4v1.385l-.681.607L7,12.334l1.056-.94-.681-.607V9.4L9.453,8.235a2.935,2.935,0,0,1,1.9-.3v2.074c-.032.445-.248,1.132-1.432.254L8.94,9.528V18l4.034-4.169a1.566,1.566,0,0,0,.454-1.09V9.006l.562.4a17.13,17.13,0,0,0-.473-4.721" transform="translate(0 -0.001)" fill="#fff"></path>
            </g>
            <text id="_1_584.17" data-name="1,584.17" transform="translate(19 -4.988)" fill="#fff" fontSize="24" fontFamily="Pretendard Variable, Pretendard" fontWeight="600">
              <tspan x="0" y="23">{ArmoryProfile?.ItemAvgLevel}</tspan>
            </text>
          </g>
        </svg>
      </div>
      {/* 원정대, 칭호, PVP, 영지 */}
      <div className='absolute bottom-5 left-5 text-white space-y-1.5'>
        <div className='flex'>
          <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
            <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>원정대</p>
          </div>
          <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>
            <span className='text-[11px] leading-[11px]'>Lv.</span>{ArmoryProfile?.ExpeditionLevel}
          </p>
        </div>
        <div className='flex'>
          <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
            <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>칭호</p>
          </div>
          <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>{ArmoryProfile?.Title}</p>
        </div>
        <div className='flex'>
          <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
            <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>PVP</p>
          </div>
          <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>{ArmoryProfile?.PvpGradeName}</p>
        </div>
        <div className='flex'>
          <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
            <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>영지</p>
          </div>
          <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>
            <span className='text-[11px] leading-[11px]'>Lv.</span>{`${ArmoryProfile?.TownLevel} ${ArmoryProfile?.TownName}`}
          </p>
        </div>
      </div>
      {/* 관심 체크 */}
      <div className='absolute top-0 right-0'>
        <button type='button' className='p-5 h-full justify-self-end text-gray-100'>
          <Image src={isFavoriteCheck ? IconStarFull : IconStarEmpty} alt={isFavoriteCheck ? 'starFull' : 'starEmpty'} width={20} height={20} onClick={favoriteCheckHandler} />
        </button>
      </div>
    </div>
    <div className='relative opacity-100 h-[70px]'>
      {/* 서버, 순위 */}
      <div className='w-full h-[70px] pl-5 pr-3 py-3 flex justify-between gap-y-1 text-sm font-semibold dark:bg-[#3f4044]'>
        <div className='shrink-0 grid grid-rows-2'>
          <p className='text-[#8045dd] dark:text-[#a36bfc]'>전체 서버</p>
          <p className='text-[#5865f2] dark:text-[#8991ee]'>{ArmoryProfile?.ServerName} 서버</p>
        </div>
        <div className='flex gap-x-2'>
          <div className='grid grid-rows-2'>
            <p className='shrink-0 flex justify-end items-center gap-x-1'>
              <span className='text-[#353945] dark:text-inherit'>12422위</span>
              <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>8%</span>
            </p>
            <p className='shrink-0 flex justify-end items-center gap-x-1'>
              <span className='text-[#353945] dark:text-inherit'>124위</span>
              <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>8%</span>
            </p>
          </div>
          <div className='grid grid-rows-2'>
            <p className='shrink-0 flex justify-end items-center gap-x-1'>
              <span className='text-[#353945] dark:text-inherit'>클래스 1463위</span>
              <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>7%</span>
            </p>
            <p className='shrink-0 flex justify-end items-center gap-x-1'>
              <span className='text-[#353945] dark:text-inherit'>클래스 12422위</span>
              <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>7%</span>
            </p>
          </div>
        </div>
      </div>
      <div className='after:absolute after:top-full after:w-full after:h-5 after:from-[#0000000f] after:to-60% after:to-transparent after:bg-gradient-to-b'></div>
    </div>
    </>
  )
}
