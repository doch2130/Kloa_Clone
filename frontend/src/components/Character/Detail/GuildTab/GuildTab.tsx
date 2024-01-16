'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { itemLevelBorderStyleFunction } from '../utils'
import { CharacterInfo } from '@/types/siblings'
import { characterJobIconList } from '/public/images'


// 길드 탭은 보류
// API에서는 길드 데이터를 가져오는 방법이 없음
// 서버별 길드 랭킹 데이터를 가져오는 것만 있음

const guildGetFunction = async () => {
  let serverName = '카제로스';
  const result = await fetch(`/api/lostark/guilds?serverName=${serverName}`);
  // const response = await fetch(`/api/lostark/siblings?characterName=${characterName}`);

  const guildJson = (await result.json()) as any;

  // console.log('guildJson ' , guildJson);
}

export default function GuildTab() {
  const temp = [1,2,3,4];
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;

  useEffect(() => {
    guildGetFunction();
  }, []);

  // const { data:guildData, isLoading:isGuildDataLoading } = useQuery({ queryKey: ['guildData', name], queryFn: () => getOwnedCharacter(name) });

  return (
    <>
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] rounded-xl border border-main1 box-border shadow-[2px_2px_14px_0_rgba(49,85,181,.1)]'></div>

      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
        <div className='grid grid-cols-2 gap-4'>
          {temp.map((el:number, index:number) => {
            return (
              <Fragment key={`${el}_${index}`}>
                {/* <Link href={`./characters/${sortedFilterHaveCharacter.CharacterName}`} className='border rounded-lg overflow-hidden border-basicGrey dark:border-[#57585e]'>
                    <div className={`border-l-[6px] px-3 py-2 flex items-center gap-x-3 ${itemLevelBorderStyleFunction(parseFloat(sortedFilterHaveCharacter.ItemAvgLevel.replace(/,/g, '')))}`}>
                      <div className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-full'>
                        <Image src={characterJobIconList[sortedFilterHaveCharacter.CharacterClassName]} alt={sortedFilterHaveCharacter.CharacterClassName} loading="lazy" width={44} height={44} decoding="async" />
                      </div>
                      <div className='grow space-y-[1px]'>
                        <p className='text-sm font-medium text-[#7d8395] dark:text-[#b6b9c2]'>Lv.{sortedFilterHaveCharacter.CharacterLevel} {sortedFilterHaveCharacter.CharacterClassName}</p>
                        <p className='text-base font-[650]'>{sortedFilterHaveCharacter.CharacterName}</p>
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
                            <p className='text-base font-semibold'>{sortedFilterHaveCharacter.ItemAvgLevel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link> */}
              </Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}
