'use client'
import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import { isSameDate } from './scheduleUtils'
import { StringOrNumber } from '@/type/adventureIsland'

import styled from './Schedule.module.css'

import BossOn from '@/assets/Icon/boss_on.png'
import ChaosGateOn from '@/assets/Icon/chaosGate_on.png'
import BattleArenaOn from '@/assets/Icon/battleArena_on.png'
import BossOff from '@/assets/Icon/boss_off.png'
import ChaosGateOff from '@/assets/Icon/chaosGate_off.png'
import BattleArenaOff from '@/assets/Icon/battleArena_off.png'

type DayOfWeekEventScheduleProps = {
  today: Date;
  currentDate: Date;
  category: string;
}

export default function DayOfWeekEventSchedule({ today, currentDate, category }:DayOfWeekEventScheduleProps) {
  const [dayEventScheduleDate, setDayEventScheduleDate] = useState(new Date());
  const [dayEventScheduleTime, setDayEventScheduleTime] = useState<StringOrNumber>('00:00:00');

  // 필드보스 / 일 화 금 / 0 2 5
  // 카오스게이트 / 목 토 일 월 / 0 1 4 6
  // 태초의 섬 / 화 목 토 / 2 4 6
  const appearanceDate: {[key:string]:number[]} = {
    '필드보스': [0, 2, 5],
    '카오스게이트': [0, 1, 4, 6],
    '태초의 섬': [2, 4, 6]
  };

  const dayEventScheduleIcon: { [key:string]:StaticImageData[] } = {
    '필드보스': [BossOn, BossOff],
    '카오스게이트': [ChaosGateOn, ChaosGateOff],
    '태초의 섬': [BattleArenaOn, BattleArenaOff]
  };

  function calculateTimeToNextHour() {
    const now:Date = new Date(); // 현재 시간을 얻습니다.
    const nextHour:Date = new Date(now); // 현재 시간을 복사하여 수정할 것입니다.
    nextHour.setHours(now.getHours() + 1, 0, 0, 0); // 다음 시(정각)을 설정합니다.

    let timer: NodeJS.Timeout;

    if(appearanceDate[category].includes(dayEventScheduleDate.getDay())) {
      // console.log('category ',category);
      // 타이머를 설정하여 1초마다 시간을 갱신합니다.
      timer = setInterval(() => {
        const timeDifference: number = nextHour.getTime() - new Date().getTime();
        const minutes = String(Math.floor(timeDifference / (1000 * 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
        setDayEventScheduleTime(`00:${minutes}:${seconds}`);

        if (timeDifference <= 0) {
          clearInterval(timer); // 타이머를 멈춥니다.
          setDayEventScheduleTime('출현'); // 시간이 종료되면 초기화합니다.
        }
      }, 1000); // 1초마다 실행
    }

    return () => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    };
  }

  // function adventureCalculateTimeToNextHour() {
  function battleArenaCalculateTimeToNextHour() {
    const now:Date = new Date(); // 현재 시간을 얻습니다.
    const nextHour:Date = new Date(now); // 현재 시간을 복사하여 수정할 것입니다.

    // 다음 출현 시(정각)을 설정합니다.
    // 토요일인 경우 9시 추가
    if(nextHour.getDay() === 6) {
      if(nextHour.getHours() < 9) {
        nextHour.setHours(9, 0, 0, 0);
      } else if(nextHour.getHours() < 11) {
        nextHour.setHours(11, 0, 0, 0);
      } else if(nextHour.getHours() < 13) {
        nextHour.setHours(13, 0, 0, 0);
      } else if(nextHour.getHours() < 19) {
        nextHour.setHours(19, 0, 0, 0);
      } else if(nextHour.getHours() < 21) {
        nextHour.setHours(21, 0, 0, 0);
      } else if(nextHour.getHours() < 23) {
        nextHour.setHours(23, 0, 0, 0);
      }
    } else {
      if(nextHour.getHours() < 11) {
        nextHour.setHours(11, 0, 0, 0);
      } else if(nextHour.getHours() < 13) {
        nextHour.setHours(13, 0, 0, 0);
      } else if(nextHour.getHours() < 19) {
        nextHour.setHours(19, 0, 0, 0);
      } else if(nextHour.getHours() < 21) {
        nextHour.setHours(21, 0, 0, 0);
      } else if(nextHour.getHours() < 23) {
        nextHour.setHours(23, 0, 0, 0);
      }
    }

    let timer: NodeJS.Timeout;
    if(category === '태초의 섬') {
      // 타이머를 설정하여 1초마다 시간을 갱신합니다.
      timer = setInterval(() => {
        const timeDifference: number = nextHour.getTime() - new Date().getTime();
        const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor(timeDifference / (1000 * 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
        setDayEventScheduleTime(`${hours}:${minutes}:${seconds}`);

        if (timeDifference <= 0) {
          clearInterval(timer); // 타이머를 멈춥니다.
          setDayEventScheduleTime('출현'); // 시간이 종료되면 초기화합니다.
        }
      }, 1000); // 1초마다 실행
    }
    
    return () => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    };
  }


  useEffect(() => {
    const clone = new Date(currentDate);
    if(category === '태초의 섬') {
      setDayEventScheduleDate(currentDate);
    } else {
      clone.setHours(currentDate.getHours() - 6);
      setDayEventScheduleDate(clone);
    }
    // setChaosgateDate(clone);
    // setFieldbossDate(clone);
    // setBattleArenaDate(currentDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  useEffect(() => {
    const cleanup = calculateTimeToNextHour();
    const adventureCleanup = battleArenaCalculateTimeToNextHour();
    return () => {
      // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
      cleanup();
      adventureCleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styled.scheduleName}>
        <Image src={ appearanceDate[category].includes(dayEventScheduleDate.getDay()) ? 
          dayEventScheduleIcon[category][0] : dayEventScheduleIcon[category][1] }
          alt={`${category} ICON`}
          className={
            category === '태초의 섬' ? appearanceDate[category].includes(dayEventScheduleDate.getDay()) ?
            '' : styled.battleArenaOff : ''
          }
        />
        {
          appearanceDate[category].includes(dayEventScheduleDate.getDay()) ? 
          <span className={`{styled.scheduleAppearFont} dark:text-[#eaf0ec]`}>{category}</span> : 
          <span className={`{styled.scheduleLeaveFont} dark:text-[#eaf0ec]`}>{category}</span>
        }
      </div>
      <div className={styled.scheduleTime}>
        {
          appearanceDate[category].includes(dayEventScheduleDate.getDay()) ? 
            (isSameDate(today, currentDate) ?
              <p className={styled.scheduleAppearFont}>{dayEventScheduleTime}</p>
            : <p className={styled.scheduleAppearFont}>등장 예정</p>)
          : <p className={styled.scheduleLeaveFont}>&lt;자리비움&gt;</p>
        }
      </div>
    </>
  )
}
