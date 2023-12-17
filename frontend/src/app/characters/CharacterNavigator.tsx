'use client'
import React, { useEffect, useRef, useState } from 'react'

import { serverList } from '@/data/ServerListData'
import { characterJobList, characterJobSkillList } from '@/data/CharacterJobData'

import ListBoxSelect from '@/components/UI/ListBoxSelect'

import styled from './CharacterNavigator.module.css'

const buttonClass = 'w-full h-full border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] flex justify-between items-center text-[#7d8395]';

export default function CharacterNavigator() {
  const [rangeMinValue, setRangeMinValue] = useState<number>(0); 
  const [rangeMaxValue, setRangeMaxValue] = useState<number>(1655);
  const [rangeMinPercent, setRangeMinPercent] = useState<number>(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState<number>(0);

  const levelBar = useRef<HTMLDivElement>(null);

  const levelMinValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if(value <= rangeMaxValue) {
      setRangeMinValue(value);
    } else {
      setRangeMinValue(rangeMaxValue);
    }
    return;
  }

  const levelMaxValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if(value >= rangeMinValue) {
      setRangeMaxValue(value);
    } else {
      setRangeMaxValue(rangeMinValue);
    }
    return;
  }

  const rangeValueHandler = () => {
    setRangeMinPercent((rangeMinValue / 1655) * 100);
    setRangeMaxPercent(100 - (rangeMaxValue / 1655) * 100);
    return;
  }

  useEffect(() => {
    if(levelBar.current === null) {
      return;
    }

    levelBar.current.style.left = `${rangeMinPercent}%`;
    levelBar.current.style.right = `${rangeMaxPercent}%`;
    return ;

  }, [rangeMinPercent, rangeMaxPercent]);
  
  return (
    <div className='w-full h-[54px] bg-white dark:bg-[#33353a] rounded-[10px] flex justify-between items-center px-[10px] mt-[28px]'>
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
      {/* Level Range Option */}
      <div className='flex items-center space-x-5'>
        <input type='number' value={rangeMinValue}
          className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]'
          onChange={(e) => {
            levelMinValueHandler(e);
            rangeValueHandler();
          }}
        />

        <div className='w-[250px]'>
          <div className={`flex items-center justify-center h-[8px] w-full rounded ${styled.levelWrap}`}>
            <div ref={levelBar} className={`h-[8px] rounded absolute ${styled.levelBar}`}></div>
            <div className={`flex items-center h-[8px] w-full rounded relative`}>
              <input type='range' step={1} min={0} max={1655}
                value={rangeMinValue} className={`w-full h-6 absolute ${styled.levelBarInput} ${styled.levelBarInputLeft}`}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  levelMinValueHandler(e);
                  rangeValueHandler();
                }}
              />
              <input type='range' step={1} min={0} max={1655}
                value={rangeMaxValue} className={`w-full h-6 absolute ${styled.levelBarInput} ${styled.levelBarInputRight}`}
                onChange={(e) => {
                  levelMaxValueHandler(e);
                  rangeValueHandler();
                }}
              />
            </div>
          </div>
        </div>

        <input type='number' value={rangeMaxValue}
          className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]'
          onChange={(e) => {
            levelMaxValueHandler(e);
            rangeValueHandler();
          }}
        />
      </div>
    </div>
  )
}
