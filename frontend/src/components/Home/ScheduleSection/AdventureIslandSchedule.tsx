'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import { AdventureIsland, AdventureIslandResp } from '@/types/adventureIsland'
import { isSameDate } from './scheduleUtils'

import AdventureIslandScheduleItem from './AdventureIslandScheduleItem'

import styled from '@/styles/Schedule.module.css'

type AdventureIslandScheduleProps = {
  today: Date;
  currentDate: Date;
  adventureIslandData: AdventureIsland[];
}

const RewardItemTypeClassMap: { [key: string]: string } = {
  '카드': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryCard}`,
  '주화': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryCoin}`,
  '골드': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryGold}`,
  '실링': `${styled.scheduleIslandCategory} ${styled.scheduleIslandCategoryShilling}`,
};

let ScheduleIslandBoxStyle = `${styled.scheduleIslandBox}`;

export default function AdventureIslandSchedule({ today, currentDate, adventureIslandData }: AdventureIslandScheduleProps) {
  const [adventureList, setAdventureList] = useState<AdventureIsland[]>([]);

  const fetchData = useCallback(async () => {
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = today.getDate().toString().padStart(2, '0');
    const todayDateFormat = `${todayYear}-${todayMonth}-${todayDay}`;

    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    const currentDateFormat = `${currentYear}-${currentMonth}-${currentDay}`;

    if (todayDateFormat === currentDateFormat) {
      setAdventureList(adventureIslandData);
    }
    else {
      try {
        const advetureResp = await fetch(`/api/lostark?category=adventure&currentDate=${currentDateFormat}`);
        const advetureData:AdventureIslandResp = await advetureResp.json();
        // console.log('Data: ', advetureData);
        setAdventureList(advetureData.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

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
        } else {
          ScheduleIslandBoxStyle = `${styled.scheduleIslandBox}`;
        }
        
        return (
          <div className={isSameDate(today, currentDate) ? `${ScheduleIslandBoxStyle} bg-[#f5f6f7] border-2 border-[#f5f6f7] dark:bg-[#2b2d31] dark:border-[0]`
            : `${styled.scheduleIslandBox} ${styled.scheduleIslandBoxOpacity} bg-[#f5f6f7] border-2 border-[#f5f6f7] dark:bg-[#2b2d31] dark:border-[0]`} key={el.ContentsName}>
    
            <Image src={el.ContentsIcon} alt={el.ContentsName} className={styled.scheduleIslandImage} width={64} height={64} />
            <div className={styled.scheduleIslandBoxWrap}>
              <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandBoxTitle}>
                <div className={RewardItemTypeClassMap[el.RewardItemType]}>{el.RewardItemType}</div>
                <div className={`${styled.scheduleIslandName} dark:text-[#eaf0ec]`}>{el.ContentsName}</div>
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
