'use client'
import React from 'react'
import Image from 'next/image'

import { AdventureIsland } from '@/type/adventureIsland'
import { isSameDate } from './scheduleUtils'

import AdventureIslandScheduleItem from './AdventureIslandScheduleItem'

import styled from './Schedule.module.css'

type AdventureIslandScheduleProps = {
  today: Date;
  currentDate: Date;
  adventureList: AdventureIsland[];
}

const RewardItemTypeClassMap: { [key: string]: string } = {
  '카드': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryCard}`,
  '주화': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryCoin}`,
  '골드': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryGold}`,
  '실링': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryShilling}`,
};

let ScheduleIslandBoxStyle = `${styled.scheduleIslandBox}`;

export default function AdventureIslandSchedule({ today, currentDate, adventureList }: AdventureIslandScheduleProps) {
  return (
    <>
    {
      adventureList?.map((el:AdventureIsland, index:number) => {
        if(adventureList.length > 3) {
          if (index < 3 && currentDate.getHours() < 13) {
            ScheduleIslandBoxStyle = `${styled.scheduleIslandBox}`;
          } else if (currentDate.getHours() < 13) {
            ScheduleIslandBoxStyle = `${styled.scheduleIslandBox} ${styled.scheduleIslandBoxOpacity}`;
          } else if (index < 3 && currentDate.getHours() >= 13) {
            ScheduleIslandBoxStyle = `${styled.scheduleIslandBox} ${styled.scheduleIslandBoxOpacity}`;
          } else if (currentDate.getHours() >= 13) {
            ScheduleIslandBoxStyle = `${styled.scheduleIslandBox}`;
          }
        }
        
        return (
          <div className={isSameDate(today, currentDate) ? ScheduleIslandBoxStyle
            : `${styled.scheduleIslandBox} ${styled.scheduleIslandBoxOpacity}`} key={el.ContentsName}>
    
            <Image src={el.ContentsIcon} alt={el.ContentsName} className={styled.scheduleIslandImage} width={64} height={64} />
            <div className={styled.scheduleIslandBoxWrap}>
              <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandBoxTitle}>
                <div className={RewardItemTypeClassMap[el.RewardItemType]}>{el.RewardItemType}</div>
                <div className={styled.scheduleIslandName}>{el.ContentsName}</div>
              </div>
              <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandCompensationImage}>
                {
                  <AdventureIslandScheduleItem itemList={el.RewardItems} islandName={el.ContentsName} />
                }
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  )
}
