'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { AdventureIsland, OrganizeAdventureIslandList } from '@/type/adventureIsland'
import { changeMonth } from './scheduleUtils'

import ScheduleHeaderTime from './ScheduleHeaderTime'
import ScheduleCalendar from './ScheduleCalendar'
import DayOfWeekEventSchedule from './DayOfWeekEventSchedule'
import AdventureIslandSchedule from './AdventureIslandSchedule'

import styled from './Schedule.module.css'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'

type ScheduleProps = {
  adventureIslandList: OrganizeAdventureIslandList;
}

const DayOfWeekEventCategory = ['필드보스', '카오스게이트', '태초의 섬'];
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function Schedule({ adventureIslandList }:ScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [adventureList, setAdventureList] = useState<AdventureIsland[]>([]);

  useEffect(() => {
    // 선택날짜에 따른 모험섬 데이터 새로 저장하는 함수
    // console.log('adventureIslandList ', adventureIslandList);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const dateFormat = `${year}-${month}-${day}`;

    // 주말 오전, 오후 섬 시간대 별 정리를 위한 sort 함수
    if(adventureIslandList[dateFormat]?.length >= 6) {
      adventureIslandList[dateFormat].sort((a, b) => {
        const dateA = new Date(a.StartTimes[0]);
        const dateB = new Date(b.StartTimes[0]);
        return dateA.getTime() - dateB.getTime();
      });
    }
    setAdventureList(adventureIslandList[dateFormat]);
  }, [adventureIslandList, currentDate]);

  return (
    <>
    <div className={styled.subTitle}>
      {/* 모험 섬 시간 - Header */}
      <ScheduleHeaderTime today={today} currentDate={currentDate} />
      <div className={styled.scheduleDateChange}>
        <Image src={LeftArrow} alt='left arrow' onClick={() => changeMonth(currentDate, -1, setCurrentDate)}/>
        <p>{`${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월`}</p>
        <Image src={RightArrow} alt='right arrow' onClick={() => changeMonth(currentDate, 1, setCurrentDate)} />
      </div>
    </div>
    <div className={styled.scheduleTable}>
      <div>
        <ScheduleCalendar today={today} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
      <hr />

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
          <AdventureIslandSchedule today={today} currentDate={currentDate} adventureList={adventureList} />
        </div>
      </div>
      {/* AdventureIslandSchedule End */}
    </div>
    </>
  )
}
