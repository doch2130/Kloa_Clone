'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getGuildInfo } from './utils'
import { itemLevelBorderStyleFunction } from '../utils'

import { characterJobIconList, guildMaster } from '/public/images'

type GuildTabType = {
  characterName: string
  guildName: string
}

export default function GuildTab({ characterName, guildName }:GuildTabType) {

  const { data:guildInfoList, isLoading:isGuildInfoListLoading } = useQuery({ queryKey: ['guildInfoList', characterName, guildName], queryFn: () => getGuildInfo(guildName) });

  if(isGuildInfoListLoading) {
    return (
      <div className='w-full max-w-[700px] h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  // console.log('guildInfoList ', guildInfoList);

  return (
    <>
    {/* 길드 인원, 직업 정보 */}
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] rounded-xl border border-[#5865f2] box-border shadow-[2px_2px_14px_0_rgba(49,85,181,.1)] mt-6'>
      <div className='grid grid-cols-2 gap-x-3'>
      </div>
    </div>
      {/* 캐릭 정렬 */}
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
        <div className='grid grid-cols-2 gap-4'>
          {guildInfoList?.data?.map((guildInfo, index:number) => {
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
