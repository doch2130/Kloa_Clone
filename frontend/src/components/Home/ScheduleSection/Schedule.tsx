'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleItemList from './ScheduleItemList';
import styled from './Schedule.module.css'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import BossOn from '@/assets/Icon/boss_on.png'
import ChaosGateOn from '@/assets/Icon/chaosGate_on.png'
import BattleArenaOn from '@/assets/Icon/battleArena_on.png'
import BossOff from '@/assets/Icon/boss_off.png'
import ChaosGateOff from '@/assets/Icon/chaosGate_off.png'
import BattleArenaOff from '@/assets/Icon/battleArena_off.png'
import DeathValley from '@/assets/Island/deathvalley.png'


type chaosgateTimeType = string | number;
type fieldbossTimeType = string | number;
type battlearenaTimeType = string | number;

export default function Schedule() {
  const tempIsland = [
    {
      id: 1,
      itemList: [1,2,3,4,5,6,7,8,9]
    },
    {
      id: 2,
      itemList: [1,2,3]
    },
    {
      id: 3,
      itemList: [1,2,3,4,5,6,7]
    }
  ];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [chaosgateDate, setChaosgateDate] = useState(new Date());
  const [fieldbossDate, setFieldbossDate] = useState(new Date());
  const [battleArenaDate, setBattleArenaDate] = useState(new Date());
  const [chaosgateTime, setChaosgateTime] = useState<chaosgateTimeType>('00:00:00');
  const [fieldbossTime, setFieldbossTime] = useState<fieldbossTimeType>('00:00:00');
  const [battleArenaTime, setBattleArenaTime] = useState<battlearenaTimeType>('00:00:00');

  function calculateTimeToNextHour() {
    const now:Date = new Date(); // 현재 시간을 얻습니다.
    const nextHour:Date = new Date(now); // 현재 시간을 복사하여 수정할 것입니다.
    nextHour.setHours(now.getHours() + 1, 0, 0, 0); // 다음 시(정각)을 설정합니다.

    // 타이머를 설정하여 1초마다 시간을 갱신합니다.
    const timer = setInterval(() => {
      const timeDifference: number = nextHour.getTime() - new Date().getTime();
      const minutes = String(Math.floor(timeDifference / (1000 * 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
      setChaosgateTime(`00:${minutes}:${seconds}`);
      setFieldbossTime(`00:${minutes}:${seconds}`);

      if (timeDifference <= 0) {
        clearInterval(timer); // 타이머를 멈춥니다.
        setChaosgateTime('출현'); // 시간이 종료되면 초기화합니다.
        setFieldbossTime('출현'); // 시간이 종료되면 초기화합니다.
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    };
  }

  function adventureCalculateTimeToNextHour() {
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

    // 타이머를 설정하여 1초마다 시간을 갱신합니다.
    const timer = setInterval(() => {
      const timeDifference: number = nextHour.getTime() - new Date().getTime();
      const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor(timeDifference / (1000 * 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(2, '0');
      setBattleArenaTime(`${hours}:${minutes}:${seconds}`)

      if (timeDifference <= 0) {
        clearInterval(timer); // 타이머를 멈춥니다.
        setBattleArenaTime('출현'); // 시간이 종료되면 초기화합니다.
      }
    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    };
  }

  useEffect(() => {
    const cleanup = calculateTimeToNextHour();
    const adventureCleanup = adventureCalculateTimeToNextHour();
    return () => {
      // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
      cleanup();
      adventureCleanup();
    };
  }, []);
  
  useEffect(() => {
    const clone = new Date(currentDate);
    clone.setHours(currentDate.getHours() - 6);
    setChaosgateDate(clone);
    setFieldbossDate(clone);
    setBattleArenaDate(currentDate);
  }, [currentDate]);

  const changeYear = (date:Date, year:number):Date => {
    const clone = new Date(date);
    clone.setFullYear(date.getFullYear() + year)
    return clone;
  }

  const changeMonth = (date:Date, month:number):void => {
    const clone = new Date(date);
    clone.setMonth(date.getMonth() + month)
    setCurrentDate(clone);
    return ;
  }

  const changeDays = (date:Date, days:number):Date => {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days)
    return clone;
  }

  const changeDate = (date:Date):void => {
    setCurrentDate(date);
    return ;
  }

  const isSameDate = (date1:Date, date2:Date):Boolean => {
    return date1.getFullYear() === date2.getFullYear()
     && date1.getMonth() === date2.getMonth()
     && date1.getDate() === date2.getDate();
  }

  return (
    <>
    <div className={styled.subTitle}>
      <div>모험 섬<p className={styled.scheduleTime}>00:00:00</p></div>
      <div className={styled.scheduleDateChange}>
        <Image src={LeftArrow} alt='left arrow' onClick={() => changeMonth(currentDate, -1)}/>
        <p>{`${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월`}</p>
        <Image src={RightArrow} alt='right arrow' onClick={() => changeMonth(currentDate, 1)} />
      </div>
    </div>
    <div className={styled.scheduleTable}>
      <div>
        <ScheduleCalendar today={today} currentDate={currentDate} changeDateHandler={changeDate} />
      </div>
      <hr />
      <div className={styled.scheduleEtc}>
        <div className={styled.scheduleEtcRow + ' ' + styled.fieldBoss}>
          <div className={styled.scheduleName}>
            <Image src={
              fieldbossDate.getDay() === 3 || fieldbossDate.getDay() === 2 || fieldbossDate.getDay() === 5
              ? BossOn : BossOff} alt='field boss icon' />
              {fieldbossDate.getDay() === 3 || fieldbossDate.getDay() === 2 || fieldbossDate.getDay() === 5 
              ? <span className={styled.scheduleAppearFont}>필드보스</span> : <span className={styled.scheduleLeaveFont}>필드보스</span>}
          </div>
          {/* 일 화 금 / 0 2 5 */}
          {/* 임시로 0 대신 3 입력 */}
          <div className={styled.scheduleTime}>
            {fieldbossDate.getDay() === 3 || fieldbossDate.getDay() === 3 || fieldbossDate.getDay() === 6 
            ? (isSameDate(today, currentDate) ?
            <p className={styled.scheduleAppearFont}>{fieldbossTime}</p>
              : <p className={styled.scheduleAppearFont}>등장 예정</p>)
            : <p className={styled.scheduleLeaveFont}>&lt;자리비움&gt;</p>}
          </div>
        </div>
        <div className={styled.scheduleEtcRow + ' ' + styled.chaosGate}>
          <div className={styled.scheduleName}>
            <Image src={
              chaosgateDate.getDay() === 3 || chaosgateDate.getDay() === 1 || chaosgateDate.getDay() === 4 || chaosgateDate.getDay() === 6 
              ? ChaosGateOn : ChaosGateOff} alt='chaos gate icon' />
              {chaosgateDate.getDay() === 3 || chaosgateDate.getDay() === 1 || chaosgateDate.getDay() === 4 || chaosgateDate.getDay() === 6 
              ? <span className={styled.scheduleAppearFont}>카오스게이트</span> : <span className={styled.scheduleLeaveFont}>카오스게이트</span>}
          </div>
          {/* 목 토 일 월 / 0 1 4 6 */}
          {/* 임시로 0 대신 3 입력 */}
          <div className={styled.scheduleTime}>
            {chaosgateDate.getDay() === 3 || chaosgateDate.getDay() === 1 || chaosgateDate.getDay() === 4 || chaosgateDate.getDay() === 6 
            ? (isSameDate(today, currentDate) ?
            <p className={styled.scheduleAppearFont}>{chaosgateTime}</p>
              : <p className={styled.scheduleAppearFont}>등장 예정</p>)
            : <p className={styled.scheduleLeaveFont}>&lt;자리비움&gt;</p>}
          </div>
        </div>
        <div className={styled.scheduleEtcRow + ' ' + styled.battleArena}>
          <div className={styled.scheduleName}>
            <Image src={
              battleArenaDate.getDay() === 3 || battleArenaDate.getDay() === 4 || battleArenaDate.getDay() === 6 
              ? BattleArenaOn : BattleArenaOff} alt='battle arena icon' 
              className={
                battleArenaDate.getDay() === 3 || battleArenaDate.getDay() === 4 || battleArenaDate.getDay() === 6 
                ? '' : styled.battleArenaOff}
              />
              {battleArenaDate.getDay() === 3 || battleArenaDate.getDay() === 4 || battleArenaDate.getDay() === 6 
              ? <span className={styled.scheduleAppearFont}>태초의 섬</span> : <span className={styled.scheduleLeaveFont}>태초의 섬</span>}
          </div>
          {/* 화 목 토 / 2 4 6 */}
          {/* 임시로 2 대신 3 입력 */}
          <div className={styled.scheduleTime}>
            {battleArenaDate.getDay() === 3 || battleArenaDate.getDay() === 4 || battleArenaDate.getDay() === 6 
            ? (isSameDate(today, currentDate) ?
            <p className={styled.scheduleAppearFont}>{battleArenaTime}</p>
              : <p className={styled.scheduleAppearFont}>등장 예정</p>)
            : <p className={styled.scheduleLeaveFont}>&lt;자리비움&gt;</p>}
          </div>
        </div>
      </div>
      <div className={styled.scheduleIsland}>
        <div className={styled.scheduleIslandRow}>
          {tempIsland.map((el:{id:number, itemList: number[]}) => {
            return (
              <div className={styled.scheduleIslandBox} key={el.id}>
                <Image src={DeathValley} alt='death valley' className={styled.scheduleIslandImage} />
                <div className={styled.scheduleIslandBoxWrap}>
                  <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandBoxTitle}>
                    <div className={styled.scheduleIslandCategory}>카드</div>
                    <div className={styled.scheduleIslandName}>죽음의 협곡</div>
                  </div>
                  <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandCompensationImage}>
                    {
                      <ScheduleItemList itemList={el.itemList} />
                    }
                  </div>
                </div>
              </div>
            )
          })}
          </div>
      </div>
    </div>
    </>
  )
}
