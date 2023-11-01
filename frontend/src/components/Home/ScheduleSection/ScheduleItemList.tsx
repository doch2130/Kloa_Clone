'use client'
import React, { useState } from 'react'
import Image from 'next/image';

import CardPack from '@/assets/Icon/Item/ico_island_cardpack.png'
import LeftDoubleArrow from '@/assets/Icon/leftDoubleArrow.svg'
import RightDoubleArrow from '@/assets/Icon/rightDoubleArrow.svg'

type ScheduleItemListProps = {
  itemList: rewardItem[]
}

type rewardItem = {
  Name: string;
  Icon: string;
}


export default function ScheduleItemList(props:ScheduleItemListProps) {
  const { itemList } = props;
  const [ arrowIndex, setArrowIndex ] = useState(true);

  const itemListChange = () => {
    setArrowIndex(!arrowIndex);
  }

  return (
    <>
      {itemList.map((el: rewardItem, index: number) => (
        <div key={index}>
          {index < 6 ? (arrowIndex && <Image src={el.Icon} alt={el.Name} width={30} height={30} />)
          :
          index === 6 ? (
            arrowIndex ? (
              <Image src={RightDoubleArrow} alt='Island Item List Right Arrow' width={30} height={30} onClick={itemListChange} />
            ) : (
              <>
                <Image src={LeftDoubleArrow} alt='Island Item List Left Arrow' width={30} height={30} onClick={itemListChange} />
                <Image src={el.Icon} alt={el.Name} width={30} height={30} />
              </>
            )
          ) : index > 7 && (!arrowIndex && <Image src={el.Icon} alt={el.Name} width={30} height={30} />)}
        </div>
      ))}
    </>
  )
}
