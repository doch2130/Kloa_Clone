'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { AdventureIsland } from '@/type/adventureIsland'
import { changeMonth, isSameDate } from './scheduleUtils'

import ScheduleHeaderTime from './ScheduleHeaderTime'
import ScheduleCalendar from './ScheduleCalendar'
import DayOfWeekEventSchedule from './DayOfWeekEventSchedule'
import AdventureIslandSchedule from './AdventureIslandSchedule'

import styled from './Schedule.module.css'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import Calendar from '@/components/Calendar/Calendar'

type ScheduleProps = {
  adventureIslandData: AdventureIsland[];
}

const DayOfWeekEventCategory = ['필드보스', '카오스게이트', '태초의 섬'];
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dayParsing = ['일', '월', '화', '수', '목', '금', '토'];

export default function Schedule({ adventureIslandData }:ScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showThema, setShowThema] = useState<boolean>(false);

  const toggleThemaPanel = () => {
    setShowThema((prev) => !prev);
  };

  return (
    <>
    <div className={`${styled.subTitle} mx-5 mb-3.5 md:m-0 md:bg-white md:dark:bg-[#33353a] md:px-[16px] md:pt-[25px] md:pb-0 relative z-10`}>
      {/* 모험 섬 시간 - Header */}
      <ScheduleHeaderTime today={today} currentDate={currentDate} />
      <div className={`${styled.scheduleDateChange} flex items-center md:hidden`}>
        <Image src={LeftArrow} alt='left arrow' onClick={() => changeMonth(currentDate, -1, setCurrentDate)}/>
        <p className='dark:text-[#eaf0ec]'>{`${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월`}</p>
        <Image src={RightArrow} alt='right arrow' onClick={() => changeMonth(currentDate, 1, setCurrentDate)} />
      </div>
      {/* 960px 이하에서는 보이는 UI */}
      <div className='md:block hidden'>
        <button type='button' className='transition-colors duration-100 ease-linear bg-transparent active:bg-[#f5f6f7] active:dark:bg-[#3a3b41] rounded' onClick={toggleThemaPanel}>
          <div className='text-[#7d8395] dark:text-[#B9BBBE] flex items-center gap-x-1 px-1 transition-transform duration-100 ease-linear active:scale-95'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="18" height="18">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
          </svg>
            <p className='text-[13px] leading-[13px] font-semibold'>{isSameDate(today, currentDate) ? '오늘' : `${currentDate.getMonth()+1}월 ${currentDate.getDate()}일 (${dayParsing[currentDate.getDay()]})`}</p>
          </div>
        </button>
      </div>

    </div>
    <div className={`${styled.scheduleTable} border-2 border-[#e6e8ec] bg-[#fff] dark:bg-[#33353a] dark:border-[#42464D] relative z-10`}>
      <div className='md:hidden'>
        <ScheduleCalendar today={today} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
      <hr className='dark:border-[#42464D] md:hidden' />

      {/* DayOfWeekEventSchedule Start */}
      <div className={styled.scheduleEtc}>
        {DayOfWeekEventCategory.map((el:string) => {
          const categodyStyled = el === '필드보스' ? `${styled.fieldBoss}`
          : el === '카오스게이트' ? `${styled.chaosGate}`
          : el === '태초의 섬' ? `${styled.battleArena}` : '';
          return (
            <div className={`${styled.scheduleEtcRow} ${categodyStyled} sm:justify-center`} key={el}>
              <DayOfWeekEventSchedule today={today} currentDate={currentDate} category={el} />
            </div>
          )
        })}
      </div>
      {/* DayOfWeekEventSchedule End */}

      {/* AdventureIslandSchedule Start */}
      <div className={styled.scheduleIsland}>
        <div className={styled.scheduleIslandRow}>
          <AdventureIslandSchedule today={today} currentDate={currentDate} adventureIslandData={adventureIslandData} />
        </div>
      </div>
      {/* AdventureIslandSchedule End */}
    </div>

    {/* 작은 화면에서 달력 클릭 시 컴포넌트 */}
    {/* 조건부 렌더링으로 하면 애니메이션이 작동하지 않음 */}
    {<Calendar showThema={showThema} setShowThema={setShowThema} currentDate={currentDate} setCurrentDate={setCurrentDate} />}
    </>
  )
}
