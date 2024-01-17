'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Disclosure } from '@headlessui/react'

import { getOwnedCharacter, itemLevelBorderStyleFunction } from '../utils'

import { dungeonLevelList } from '@/data/DungeonData'

import { CharacterInfo } from '@/types/siblings'

import { characterJobIconList } from '/public/images'
import UpArrowSvg from '@/components/UI/UpArrowSvg'
import GoldSelect from './GoldSelect'

export default function OwnedCharacterTab() {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;
  const [serverList, setServerList] = useState<string[]>([]);
  const [goldCharacterList, setGoldCharacterList] = useState<CharacterInfo[]>([]);
  const [totalGoldList, setTotalGoldList] = useState<Number[]>([]);

  const { data:haveCharacterList, isLoading:isHavaCharacterListLoading } = useQuery({ queryKey: ['havaCharacterList', name], queryFn: () => getOwnedCharacter(name) });

  useEffect(() => {
    if(haveCharacterList !== undefined) {
      const havaCharacterListData = haveCharacterList?.data;
      const findSearchCharacter = havaCharacterListData?.filter((characterInfo:CharacterInfo) => characterInfo.CharacterName === decodeURIComponent(name));

      const updateServerList:string[] = [];

      if(findSearchCharacter !== undefined && findSearchCharacter.length > 0) {
        havaCharacterListData?.forEach((characterInfo) => {
          if(updateServerList.indexOf(characterInfo.ServerName) < 0 && characterInfo.ServerName !== findSearchCharacter[0].ServerName) {
            updateServerList.push(characterInfo.ServerName);
          }
        });

        updateServerList.unshift(findSearchCharacter[0].ServerName);
        setServerList(updateServerList);

        const filterGoldCharacterList = (haveCharacterList.data || []).filter((characterInfo) => characterInfo.ServerName === findSearchCharacter[0].ServerName);
        const sortedFilterGoldCharacterList = filterGoldCharacterList?.sort((a: CharacterInfo, b: CharacterInfo) => {
          const itemAvgLevelA = parseFloat(a.ItemAvgLevel.replace(/,/g, '')) || 0;
          const itemAvgLevelB = parseFloat(b.ItemAvgLevel.replace(/,/g, '')) || 0;
        
          if (itemAvgLevelA > itemAvgLevelB) {
            return -1;
          } else if (itemAvgLevelA < itemAvgLevelB) {
            return 1;
          } else {
            return 0;
          }
        });

        if (sortedFilterGoldCharacterList.length > 6) {
          const slicedGoldCharacterList = sortedFilterGoldCharacterList.slice(0, 6);
          setGoldCharacterList(slicedGoldCharacterList);
        } else {
          setGoldCharacterList(sortedFilterGoldCharacterList);
        }

      }

    }
  }, [haveCharacterList, name]);
  
  if(isHavaCharacterListLoading) {
    return (
      <div className='w-full max-w-[700px] h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  // console.log('haveCharacterList ', haveCharacterList);
  // console.log('serverList ', serverList);
  // console.log('goldCharacterList ', goldCharacterList);

  return (
    <>
      {/* 주간 획득 골드량 */}
      <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
        <Disclosure as={Fragment}>
          {({ open }) => (
          <>
          <Disclosure.Button className='flex items-center justify-between w-full'>
            <p className="text-base font-semibold">주간 골드 획득량</p>
            <div className='flex items-center'>
              <p className='mr-1.5 text-[#d79412] font-semibold text-base'>{totalGoldList.reduce((acc, currentNumber) => acc.valueOf() + currentNumber.valueOf(), 0).toString()} G</p>
              <UpArrowSvg isOpen={open} classNameDefault={'w-5 h-5 transition-transform duration-100'} classNameOpen={'rotate-180'} classNameClose={'rotate-0'} />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="mt-4 transform scale-100 opacity-100">
            <div className='px-[17px] py-4 bg-[#f5f6f7] dark:bg-[#2b2d31] rounded-xl grid grid-cols-2 gap-x-8 gap-y-3'>
              {goldCharacterList?.map((characterInfo:CharacterInfo, index:number) => {
                const dungeonList = dungeonLevelList(Number(characterInfo.ItemAvgLevel.replace(/,/g, '')));
                return (
                  <div key={`${characterInfo.CharacterName}_${index}`}>
                    <div className='flex justify-between'>
                      <p className='text-sm font-semibold'>{characterInfo.CharacterName}</p>
                      <p className='text-sm font-semibold'>총골드</p>
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-xs text-[#7d8395]'>{`${parseInt(characterInfo.ItemAvgLevel.replace(/,/g, ''))} ${characterInfo.CharacterClassName}`}</p>
                      </div>
                      <div className='border-l-2 dark:border-l-[#4d4f55] mt-0.5 pl-2'>
                        <GoldSelect characterName={characterInfo.CharacterName} dungeonList={dungeonList} setTotalGoldList={setTotalGoldList} itemLevel={Number(characterInfo.ItemAvgLevel.replace(/,/g, ''))} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Disclosure.Panel>
          </>
          )}
        </Disclosure>
      </div>

      {haveCharacterList !== undefined && serverList.map((list:string, index:number) => {
        const filterHaveCharacterList = haveCharacterList.data?.filter((characterInfo) => characterInfo.ServerName === list);
        const sortedFilterHaveCharacterList = filterHaveCharacterList?.sort((a: CharacterInfo, b: CharacterInfo) => {
          const itemAvgLevelA = parseFloat(a.ItemAvgLevel.replace(/,/g, '')) || 0;
          const itemAvgLevelB = parseFloat(b.ItemAvgLevel.replace(/,/g, '')) || 0;
        
          if (itemAvgLevelA > itemAvgLevelB) {
            return -1;
          } else if (itemAvgLevelA < itemAvgLevelB) {
            return 1;
          } else {
            return 0;
          }
        });

        if(sortedFilterHaveCharacterList !== undefined && sortedFilterHaveCharacterList.length > 0) {
          return (
            // 서버 및 캐릭터 리스트
            <div key={`${list}_${index}`} className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
              <div className='flex items-end justify-between mb-4 font-semibold text-head dark:text-[#eaf0ec]'>
                <p className='text-xl'>{sortedFilterHaveCharacterList[0].ServerName}</p>
                <p>
                  <span className='text-[#7d8395]'>보유 캐릭터</span>&nbsp;{sortedFilterHaveCharacterList.length}
                </p>
              </div>
              {/* 캐릭 정렬 */}
              <div className='grid grid-cols-2 gap-4'>
                {sortedFilterHaveCharacterList.map((sortedFilterHaveCharacter, iindex:number) => {
                  const activeCharacterStyle = sortedFilterHaveCharacter.CharacterName === decodeURIComponent(name) ? 'border rounded-lg overflow-hidden border-[#7d8395]' : 'border rounded-lg overflow-hidden border-[#e6e8ec] dark:border-[#57585e]';
                  return (
                    <Link key={`${iindex}_${sortedFilterHaveCharacter.CharacterName}`} href={`/characters/${sortedFilterHaveCharacter.CharacterName}`} className={activeCharacterStyle}>
                    <div className={`border-l-[6px] px-3 py-2 flex items-center gap-x-3 ${itemLevelBorderStyleFunction(parseFloat(sortedFilterHaveCharacter.ItemAvgLevel.replace(/,/g, '')))}`}>
                      {/* 캐릭터 아이콘 */}
                      <div className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-full'>
                        <Image src={characterJobIconList[sortedFilterHaveCharacter.CharacterClassName]} alt={sortedFilterHaveCharacter.CharacterClassName} loading="lazy" width={44} height={44} decoding="async" />
                      </div>
                      {/* 캐릭터 정보 */}
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
                          {/* API 데이터에 길드이름은 포함되어 있지 않아서 삭제하기로 결정 */}
                          {/* <p className='text-sm text-placeholder'>길드 이름</p> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                  )
                })}
              </div>
            </div>
          )
        } else {
          <Fragment key={`${list}_${index}`}></Fragment>
        }
      })}
    </>
  )
}
