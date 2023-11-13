'use client'
import React, { useState } from 'react'
import Image from 'next/image';

import { RewardItem } from '@/type/adventureIsland'

import LeftDoubleArrow from '@/assets/Icon/leftDoubleArrow.svg'
import RightDoubleArrow from '@/assets/Icon/rightDoubleArrow.svg'
import itemFilter from '@/data/AdventureIslandData'
import styled from './ScheduleItemList.module.css'

type ScheduleItemListProps = {
  islandName: string;
  itemList: RewardItem[]
}

export default function AdventureIslandScheduleItem({ islandName, itemList }:ScheduleItemListProps) {
  const [ arrowIndex, setArrowIndex ] = useState(true);

  const itemListChange = () => {
    setArrowIndex(!arrowIndex);
  }

  return (
    <>
      {itemList.map((el: RewardItem, index: number) => {
        const itemSrc = itemFilter(el.Name, islandName);
        let iconText = el.Name;
        if(el.Name === '전설 ~ 고급 카드 팩 III') {
          iconText = '카드팩';
        }
        return (
        <React.Fragment key={index}>
          {index < 6 && (arrowIndex &&
            <div className={styled.itemIconWrap}>
              <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
              <p className={styled.itemIconText}>{iconText}</p>
            </div>)
          }
          {index === 6 && (arrowIndex &&
            <div className={styled.itemIconWrap}>
              <Image src={RightDoubleArrow} alt='Island Item List Right Arrow'
              width={30} height={30} onClick={itemListChange} className={styled.arrowIcon} />
            </div>
          )}
          {index === 6 && (!arrowIndex &&
            <div className={styled.itemIconWrap}>
              <Image src={LeftDoubleArrow} alt='Island Item List Left Arrow'
              width={30} height={30} onClick={itemListChange} className={styled.arrowIcon} />
            </div>
          )}
          {index === 6 && (!arrowIndex &&
            <div className={styled.itemIconWrap}>
              <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
              <p className={styled.itemIconText}>{iconText}</p>
            </div>
          )}
          {index >= 7 && (!arrowIndex &&
            <div className={styled.itemIconWrap}>
              <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
              <p className={styled.itemIconText}>{iconText}</p>
            </div>
          )}
        </React.Fragment>
      )
      })}
    </>
  )
}
