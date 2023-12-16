'use client'
import React from 'react'

import { serverList } from '@/data/ServerListData'
import { characterJobList, characterJobSkillList } from '@/data/CharacterJobData'

import ListBoxSelect from '@/components/UI/ListBoxSelect'

import styled from './CharacterNavigator.module.css'

const buttonClass = 'w-full h-full border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] flex justify-between items-center text-placeholder';

export default function CharacterNavigator() {
  return (
    <div className='w-full h-[54px] bg-white dark:bg-[#33353a] dark:border-0 border-2 border-lightGrey rounded-[10px] flex justify-between items-center px-[10px] mt-[28px]'>
      <div className='flex items-center space-x-5'>
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={serverList} />
        </div>
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={characterJobList} />
        </div>
        {/* 데이터에 따른 밑에 UI 출력 */}
        {characterJobSkillList[characterJobList[0]].length > 0 &&
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={characterJobSkillList[characterJobList[0]]} />
        </div>
        }
      </div>
      <div className='flex items-center space-x-5'>
        <input type='number' defaultValue={0} 
        className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]' />
        
        <div className='w-[250px]'>
          <div className={`flex items-center justify-center ${styled.levelWrap}`}>
            <div className={`h-[8px] w-full rounded ${styled.levelBar}`}>
              <div className={`flex items-center justify-center w-6 h-6 bg-white rounded-full ${styled.levelLeftButton}`}>
                <div className='w-4 h-4 rounded-full'></div>
              </div>
              <div className={`flex items-center justify-center w-6 h-6 bg-white rounded-full ${styled.levelRightButton}`}>
                <div className='w-4 h-4 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>

        <input type='number' defaultValue={1655}
        className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]' />
      </div>
    </div>
  )
}
