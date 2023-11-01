'use client'
import React, { useState } from 'react'
import Image from 'next/image';

import LeftDoubleArrow from '@/assets/Icon/leftDoubleArrow.svg'
import RightDoubleArrow from '@/assets/Icon/rightDoubleArrow.svg'
import itemFilter from '@/data/AdventureIslandData';

type ScheduleItemListProps = {
  islandName: string;
  itemList: rewardItem[]
}

type rewardItem = {
  Name: string;
  Icon: string;
}

export default function ScheduleItemList(props:ScheduleItemListProps) {
  const { islandName, itemList } = props;
  const [ arrowIndex, setArrowIndex ] = useState(true);

  const itemListChange = () => {
    setArrowIndex(!arrowIndex);
  }

  return (
    <>
      {itemList.map((el: rewardItem, index: number) => {
        const itemSrc = itemFilter(el.Name, islandName);
        return (
        <div key={index}>
          {index < 6 ? (arrowIndex && <Image src={itemSrc} alt={el.Name} width={30} height={30} />)
          :
          index === 6 ? (
            arrowIndex ? (
              <Image src={RightDoubleArrow} alt='Island Item List Right Arrow' width={30} height={30} onClick={itemListChange} />
            ) : (
              <>
                <Image src={LeftDoubleArrow} alt='Island Item List Left Arrow' width={30} height={30} onClick={itemListChange} />
                <Image src={itemSrc} alt={el.Name} width={30} height={30} />
              </>
            )
          ) : index > 7 && (!arrowIndex && <Image src={itemSrc} alt={el.Name} width={30} height={30} />)}
        </div>
      )
      })}
    </>
  )
}
