'use client'
import React, { useEffect, useState } from 'react'
import { refetchFunction } from './utils'

type RefetchButtonType = {
  characterRefetch: Function
  countRefetch: Function
}

export default function RefetchButton({ characterRefetch, countRefetch }:RefetchButtonType) {
  const [time, setTime] = useState(0);
  const [viewText, setViewText] = useState('1분전');

  useEffect(() => {
    const timeIntervel = setInterval(() => {
      setTime((prev) => prev+1);
    }, 1000);

    return () => {
      clearInterval(timeIntervel);
    }
  }, []);

  useEffect(() => {
    if(time < 60) {
      const updateText = '1분전';
      setViewText(updateText);
    } else if(time >= 60) {
      const timeCheck = Math.floor(time / 60) + 1;
      const updateText = `${timeCheck}분전`;
      setViewText(updateText);
    }
  }, [time]);
  
  return (
    <div className='flex justify-end items-center gap-x-1.5 mb-[10px] mr-[1px]'>
      {/* 갱신 2분 이후부터 활성화 되는 방식 */}
      {/* 1분 이내면 몇 초 전, 1분 이후부터는 X분전 */}
      <p className='text-sm'>{viewText}</p>
      <button type='button' disabled={time >= 120 ? false : true} onClick={() => refetchFunction(characterRefetch, countRefetch, setTime)}
        className='w-16 h-6 bg-[#dadada] dark:bg-[#44474d] disabled:bg-[#ececec] dark:disabled:bg-[#33353a] disabled:text-[#7d8395] disabled:cursor-no-drop rounded-lg flex items-center justify-center select-none'>
        <p className='text-sm'>갱신하기</p>
      </button>
    </div>
  )
}
