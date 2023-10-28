'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import styled from './Schedule.module.css'
import LeftArrow from '/public/Icon/leftArrow.svg'
import RightArrow from '/public/Icon/rightArrow.svg'
import BossOn from '/public/Icon/boss_on.png'
import ChaosGateOn from '/public/Icon/chaosGate_on.png'
import BattleArenaOn from '/public/Icon/battleArena_on.png'
import DeathValley from '/public/Island/deathvalley.png'
import CardPack from '/public/Icon/Item/ico_island_cardpack.png'
import ScheduleCalendar from './ScheduleCalendar';

export default function Schedule() {
  const tempIsland = [1,2,3];
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
          {tempIsland.map((el:number) => {
            return (
              <div className={styled.scheduleIslandBox} key={el}>
                <Image src={DeathValley} alt='death valley' className={styled.scheduleIslandImage} />
                <div className={styled.scheduleIslandBoxWrap}>
                  <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandBoxTitle}>
                    <div className={styled.scheduleIslandCategory}>카드</div>
                    <div className={styled.scheduleIslandName}>죽음의 협곡</div>
                  </div>
                  <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandCompensationImage}>
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
                    <Image src={CardPack} alt='Island Card Pack' />
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
