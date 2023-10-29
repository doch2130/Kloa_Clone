'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleItemList from './ScheduleItemList';
import styled from './Schedule.module.css'

import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import BossOn from '@/assets/Icon/boss_on.png'
import ChaosGateOn from '@/assets/Icon/chaosGate_on.png'
import BattleArenaOn from '@/assets/Icon/battleArena_on.png'
import DeathValley from '@/assets/Island/deathvalley.png'


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
  const [currentDate, setCurrentDate] = useState(new Date());

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
            <Image src={BossOn} alt='field boss icon on' />
            <span>필드보스</span>
          </div>
          <div className={styled.scheduleTime}>
            00:00:00
          </div>
        </div>
        <div className={styled.scheduleEtcRow + ' ' + styled.chaosGate}>
          <div className={styled.scheduleName}>
            <Image src={ChaosGateOn} alt='chaos gate icon on' />
            <span>카오스게이트</span>
          </div>
          <div className={styled.scheduleTime}>
            00:00:00
          </div>
        </div>
        <div className={styled.scheduleEtcRow + ' ' + styled.battleArena}>
          <div className={styled.scheduleName}>
            <Image src={BattleArenaOn} alt='battle arena icon on' />
            <span>태초의 섬</span>
          </div>
          <div className={styled.scheduleTime}>
            00:00:00
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
