'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { AdventureIsland } from '@/type/adventureIsland'
import { changeMonth } from './scheduleUtils'

import ScheduleHeaderTime from './ScheduleHeaderTime'
import ScheduleCalendar from './ScheduleCalendar'
import DayOfWeekEventSchedule from './DayOfWeekEventSchedule'
import AdventureIslandSchedule from './AdventureIslandSchedule'

import styled from './Schedule.module.css'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'

type ScheduleProps = {
  adventureIslandData: AdventureIsland[];
}

const DayOfWeekEventCategory = ['필드보스', '카오스게이트', '태초의 섬'];
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function Schedule({ adventureIslandData }:ScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
    <div className={styled.subTitle}>
      {/* 모험 섬 시간 - Header */}
      <ScheduleHeaderTime today={today} currentDate={currentDate} />
      <div className={styled.scheduleDateChange}>
        <Image src={LeftArrow} alt='left arrow' onClick={() => changeMonth(currentDate, -1, setCurrentDate)}/>
        <p className='dark:text-[#eaf0ec]'>{`${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월`}</p>
        <Image src={RightArrow} alt='right arrow' onClick={() => changeMonth(currentDate, 1, setCurrentDate)} />
      </div>
    </div>
    <div className={`${styled.scheduleTable} border-2 border-[#e6e8ec] bg-[#fff] dark:bg-[#33353a] dark:border-[#42464D]`}>
      <div>
        <ScheduleCalendar today={today} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
      <hr className='dark:border-[#42464D]' />

      {/* DayOfWeekEventSchedule Start */}
      <div className={styled.scheduleEtc}>
        {DayOfWeekEventCategory.map((el:string) => {
          const categodyStyled = el === '필드보스' ? `${styled.fieldBoss}`
          : el === '카오스게이트' ? `${styled.chaosGate}`
          : el === '태초의 섬' ? `${styled.battleArena}` : '';
          return (
            <div className={`${styled.scheduleEtcRow} ${categodyStyled}`} key={el}>
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
    </>
  )
}
