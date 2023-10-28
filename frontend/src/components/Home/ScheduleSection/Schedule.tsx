import React from 'react'
import Image from 'next/image';
import styled from './Schedule.module.css'
import Calendar from '@/components/Calendar';
import LeftArrow from '/public/Icon/leftArrow.svg'
import RightArrow from '/public/Icon/rightArrow.svg'
import BossOn from '/public/Icon/boss_on.png'
import ChaosGateOn from '/public/Icon/chaosGate_on.png'
import BattleArenaOn from '/public/Icon/battleArena_on.png'
import DeathValley from '/public/Island/deathvalley.png'
import CardPack from '/public/Icon/Item/ico_island_cardpack.png'

export default function Schedule() {
  const tempIsland = [1,2,3];
  return (
    <>
    <div className={styled.subTitle}>
      <div>모험 섬<p className={styled.scheduleTime}>00:00:00</p></div>
      <div className={styled.scheduleDateChange}>
        <Image src={LeftArrow} alt='left arrow' />
        <p>2023년 10월</p>
        <Image src={RightArrow} alt='right arrow' />
      </div>
    </div>
    <div className={styled.scheduleTable}>
      <div>
        <Calendar />
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
