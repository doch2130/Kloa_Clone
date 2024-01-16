'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getGuildInfo } from './utils'
import { itemLevelBorderStyleFunction } from '../utils'

import { characterEmblemList, characterJobIconList, guildMaster } from '/public/images'

type GuildTabProps = {
  characterName: string
  guildName: string
}

const jobArray = Object.keys(characterEmblemList);

export default function GuildTab({ characterName, guildName }:GuildTabProps) {
  const { data:guildInfoList, isLoading:isGuildInfoListLoading } = useQuery({ queryKey: ['guildInfoList', characterName, guildName], queryFn: () => getGuildInfo(guildName) });
  const [levelRange, setLevelRange] = useState<number[]>([0, 1655]);

  useEffect(() => {
    if(guildInfoList !== undefined) {
      let minLevel = 1655;
      let maxLevel = 0;
      guildInfoList.data?.guildList.forEach((list) => {
        if(list.itemLevel < minLevel) {
          minLevel = list.itemLevel;
        }
        if(list.itemLevel > maxLevel) {
          maxLevel = list.itemLevel;
        }
      });

      if(minLevel > maxLevel) {
        maxLevel = minLevel;
      }

      setLevelRange([minLevel, maxLevel]);
    }

  }, [guildInfoList]);

  if(isGuildInfoListLoading) {
    return (
      <div className='w-full max-w-[700px] h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  return (
    <>
    {/* 길드 인원, 직업 정보 */}
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] rounded-xl border border-[#5865f2] box-border shadow-[2px_2px_14px_0_rgba(49,85,181,.1)]'>
      <div className='grid grid-cols-2 gap-x-3'>
        <div className='flex flex-col items-center justify-between'>
          <div className='flex flex-col items-center'>
            <p className='text-[0.85rem] leading-5 font-semibold text-[#7d8395]'>{`${guildInfoList?.data?.guildList?.[0].server} 서버`}</p>
            <p className='text-xl font-bold'>{guildName}</p>
            <div className='flex mt-3 gap-x-5'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {/* 전체 인원 */}
                <p className='text-base font-medium'>{guildInfoList?.data?.guildList?.length}</p>
              </div>
              <div className='flex gap-x-1.5 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z"></path>
                  <path d="M5 13l6 6"></path><path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365"></path>
                  <path d="M10 5.5l-2 -2.5h-5v5l3 2.5"></path>
                </svg>
                {/* 서폿 제외 */}
                <p className='text-base font-medium'>{guildInfoList?.data?.jobClassListCount['dealer']}</p>
              </div>
              <div className='flex gap-x-1.5 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 21a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12.01 12.01 0 0 1 .378 5"></path>
                <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"></path>
              </svg>
                {/* 서폿 */}
                <p className='text-base font-medium'>{guildInfoList?.data?.jobClassListCount['supporter']}</p>
              </div>
            </div>
          </div>
          {/* 레벨 범위 그래프 */}
          <div className='w-[320px] flex flex-col items-between gap-y-2'>
            <div className='w-[270px] h-[3px] bg-[#5865f2] relative mx-auto'>
              {guildInfoList?.data?.guildList?.map((list, index:number) => {
                const levelPercent = 100 / (levelRange[1] - levelRange[0]);
                const levelPositionStyle = (list.itemLevel - levelRange[0]) * levelPercent;
                return (
                  <div key={`${list.name}_${index}`} className='w-2.5 h-2.5 rounded-full bg-white border-2 border-[#5865f2] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow' style={{left: `${levelPositionStyle}%`}}></div>
                )
              })}
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <p className="w-14 text-center">{levelRange[0]}</p>
              <p className="w-14 text-center">{levelRange[1]}</p>
            </div>
          </div>
        </div>
        {/* 엠블럼 */}
        <div className='px-[17px] py-4 bg-[#f5f6f7] dark:bg-[#2b2d31] rounded-xl grid grid-cols-5 place-items-stretch gap-y-1'>
          {
            jobArray.map((el:string, index:number) => (
              <div key={`${el}_${index}`} className='flex items-center justify-center gap-x-1'>
                <Image className='brightness-[70%]' alt={el} src={characterEmblemList[el]} loading={'lazy'} width={20} height={20} decoding={'async'} />
                <p className="w-5 text-base">{guildInfoList?.data?.jobClassListCount[el]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
      {/* 캐릭 정렬 */}
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
        <div className='grid grid-cols-2 gap-4'>
          {guildInfoList?.data?.guildList?.map((guildInfo, index:number) => {
              const activeCharacterStyle = guildInfo.name === characterName ? 'border rounded-lg overflow-hidden border-[#7d8395]' : 'border rounded-lg overflow-hidden border-[#e6e8ec] dark:border-[#57585e]';
            return (
              <Link key={`${index}_${guildInfo.name}`} href={`/characters/${guildInfo.name}`} className={activeCharacterStyle}>
                <div className={`border-l-[6px] px-3 py-2 flex items-center gap-x-3 ${itemLevelBorderStyleFunction(guildInfo.itemLevel)}`}>
                  {/* 캐릭터 아이콘 */}
                  <div className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-full'>
                    <Image src={characterJobIconList[guildInfo.jobClass]} alt={guildInfo.jobClass} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  {/* 캐릭터 정보 */}
                  <div className='grow space-y-[1px]'>
                    <p className='text-sm font-medium text-[#7d8395] dark:text-[#b6b9c2]'>Lv.{guildInfo.battleLevel} {guildInfo.jobClass}</p>
                    {
                    guildInfo.guildMaster ?
                      <div className='flex items-center gap-x-1.5'>
                        <p className='text-base font-[650]'>{guildInfo.name}</p>
                        <Image src={guildMaster} alt='길드장' loading="lazy" width="18" height="18" decoding="async" />
                      </div>
                    : <p className='text-base font-[650]'>{guildInfo.name}</p>
                    }
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
                        <p className='text-base font-semibold'>{guildInfo.itemLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
