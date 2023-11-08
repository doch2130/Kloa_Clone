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

export default function ScheduleItemList(props:ScheduleItemListProps) {
  const { islandName, itemList } = props;
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
        <div key={index} className={styled.itemIconWrap}>
          {index < 6 ? (arrowIndex && 
            <>
              <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
              <p className={styled.itemIconText}>{iconText}</p>
            </>)
          :
          index === 6 ? (
            arrowIndex ? (
              <Image src={RightDoubleArrow} alt='Island Item List Right Arrow' width={30} height={30} onClick={itemListChange} className={styled.arrowIcon} />
            ) : (
              <>
                <Image src={LeftDoubleArrow} alt='Island Item List Left Arrow' width={30} height={30} onClick={itemListChange} className={styled.arrowIcon} />
                <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
                <p className={`${styled.itemIconText} ${styled.itemIconText2}`}>{iconText}</p>
              </>
            )
          ) : index >= 7 && (!arrowIndex && 
          <>
            <Image src={itemSrc} alt={el.Name} width={30} height={30} className={styled.itemIcon} />
            <p className={styled.itemIconText}>{iconText}</p>
          </>
          )
          }
        </div>
      )
      })}
    </>
  )
}
