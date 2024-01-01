'use client'
import React, { useEffect } from 'react'
import { Tab } from '@headlessui/react'

import AbilitySection from './AbilitySection'
import { CharacterArmories } from './CharacterResponseType'

interface CharacterDetailRight {
  data?: CharacterArmories | null | undefined
}

export default function CharacterDetailRight({ data }:CharacterDetailRight) {
  if(data !== undefined && data !== null) {
    [data.ArmoryProfile.Stats[2], data.ArmoryProfile.Stats[3]] = [data?.ArmoryProfile.Stats[3], data?.ArmoryProfile.Stats[2]];
  }
  
  return (
    <section className='grow pb-[50px]'>
      <div className='pl-[60px] pt-[25px] h-full'>
        <div className='flex justify-end select-none'>
          <div className='flex justify-end items-center gap-x-1.5 mb-[10px] mr-[1px]'>
            {/* 갱신 2분 이후부터 활성화 되는 방식 */}
            {/* 1분 이내면 몇 초 전, 1분 이후부터는 X분전 */}
            <p className='text-sm'>14분전</p>
            {/* 임시로 disabled 즐겨찾기 변수 사용 */}
            <button type='button' disabled={false} className='w-16 h-6 bg-[#dadada] dark:bg-[#44474d] disabled:bg-[#ececec] dark:disabled:bg-[#33353a] disabled:text-[#7d8395] rounded-lg flex items-center justify-center select-none'>
              <p className='text-sm'>갱신하기</p>
            </button>
          </div>
        </div>
        {/* 탭에 따른 데이터 출력 위치 */}
        <Tab.Panels>
          <Tab.Panel>
            <AbilitySection ArmoryEquipment={data?.ArmoryEquipment} ArmoryProfileStats={data?.ArmoryProfile.Stats} ArmoryCard={data?.ArmoryCard} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
          <Tab.Panel>Content 5</Tab.Panel>
          <Tab.Panel>Content 6</Tab.Panel>
          <Tab.Panel>Content 7</Tab.Panel>
        </Tab.Panels>
      </div>
    </section>
  )
}
