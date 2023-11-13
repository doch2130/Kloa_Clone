'use client'
import React, { useEffect, useState } from 'react'
import { StringOrNumber } from '@/type/adventureIsland'
import { isSameDate } from './scheduleUtils'

import styled from './Schedule.module.css'

type ScheduleHeaderTimeProps = {
  today: Date;
  currentDate: Date;
}

export default function ScheduleHeaderTime({ today, currentDate }:ScheduleHeaderTimeProps) {
  const [adventureTime, setAdventureTime] = useState<StringOrNumber>('00:00:00');

  function adventureCalculateTimeToNextHour() {
    // 다음 모험 섬 시간 출력 설정 함수
    const now:Date = new Date(); // 현재 시간을 얻습니다.
    const nextHour:Date = new Date(now); // 현재 시간을 복사하여 수정할 것입니다.

    // 다음 출현 시(정각)을 설정합니다.
    // 토요일, 일요일인 경우 오전 9시 추가
    if(nextHour.getDay() === 6 || nextHour.getDay() === 0) {
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

    // 타이머를 설정하여 1초마다 시간을 갱신합니다.
    const timer = setInterval(() => {
      const timeDifference: number = nextHour.getTime() - new Date().getTime();
      const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor(timeDifference / (1000 * 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
      setAdventureTime(`${hours}:${minutes}:${seconds}`);

      if (timeDifference <= 0) {
        clearInterval(timer); // 타이머를 멈춥니다.
        setAdventureTime('출현'); // 시간이 종료되면 초기화합니다.
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    };
  }

  useEffect(() => {
    const adventureCleanup = adventureCalculateTimeToNextHour();
    return () => {
      // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
      adventureCleanup();
    };
  }, []);

  return (
    <div>
      <span className='dark:text-[#eaf0ec]'>모험 섬</span>
      {isSameDate(today, currentDate) ?
        <p className={styled.scheduleTime}>{adventureTime}</p>
      : <p className={styled.scheduleTime}>등장 예정</p>
      }
    </div>
  )
}
