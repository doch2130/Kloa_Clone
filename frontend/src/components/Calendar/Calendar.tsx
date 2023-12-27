'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { changeMonth } from '../Home/ScheduleSection/scheduleUtils'

import CalendarBody from './CalendarBody'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'

const date = ['일', '월', '화', '수', '목', '금', '토'];

type CalendarType = {
  showThema: boolean
  setShowThema: Function
  currentDate: Date
  setCurrentDate: Function
}

export default function Calendar({ showThema, setShowThema, currentDate, setCurrentDate }:CalendarType) {
  // const [currentDate, setCurrentDate] = useState(new Date());
  const onChangeDateHandler = (date:Date) => {
    setCurrentDate(date);
    setShowThema(false);
  }

  return (
    <>
    <div>
      <div className={showThema ? `opacity-100` : `transtion-opacity duration-150 ease-linear opacity-0`}>
        <div className={`fixed inset-0 h-screen bg-black/20 dark:bg-black/40 overscroll-none touch-none ${showThema ? 'z-[100]' : 'z-[-1]'}`} onClick={() => setShowThema(false)}></div>
      </div>
      <div className={`fixed bottom-0 overscroll-none ${showThema ? 'z-[101]' : 'z-[-1]'}`}>
        <div className={`transtion transform duration-150 ease-in ${showThema ? 'translate-y-0' : `translate-y-full`}`}>
          <div className='w-screen h-fit bg-white touch-none dark:bg-[#36393F] rounded-t-[30px] pt-[17px] pb-[24px]'>
            {/* 달력 제목, 월 변경 */}
            <div className='flex justify-between items-center pl-[28px] pr-[26px]'>
              <h2 className='text-xl font-bold'>날짜 선택</h2>
              <div className='flex items-center gap-x-[6px]'>
                <Image src={LeftArrow} width={24} height={24} alt='left arrow' className='cursor-pointer' onClick={() => changeMonth(currentDate, -1, setCurrentDate)}/>
                <p className='text-xl font-bold'>{`${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월`}</p>
                <Image src={RightArrow} width={24} height={24} alt='right arrow' className='cursor-pointer' onClick={() => changeMonth(currentDate, 1, setCurrentDate)} />
              </div>
            </div>
            {/* 달력 요일 */}
            <div className='mt-[36px] grid grid-cols-7 place-items-center'>
              {date.map((el:string) => (
                <p className='font-bold text-[13px] leading-[13px]' key={el}>{el}</p>
              ))}
            </div>
            {/* 달력 바디 */}
            <div className='grid grid-cols-7 mt-2 place-items-center'>
              <CalendarBody currentDate={currentDate} onChangeDateHandler={onChangeDateHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
