'use client'
import React, { useState } from 'react'
import Image from 'next/image';

import CardPack from '@/assets/Icon/Item/ico_island_cardpack.png'
import LeftDoubleArrow from '@/assets/Icon/leftDoubleArrow.svg'
import RightDoubleArrow from '@/assets/Icon/rightDoubleArrow.svg'

type ScheduleItemListProps = {
  itemList: number[]
}

export default function ScheduleItemList(props:ScheduleItemListProps) {
  const { itemList } = props;
  const [ arrowIndex, setArrowIndex ] = useState(true);

  const itemListChange = () => {
    setArrowIndex(!arrowIndex);
  }

  return (
    <>
      {itemList.map((el: number, index: number) => (
        <div key={el}>
          {index < 6 && (arrowIndex && <Image src={CardPack} alt='Island Card Pack' />)}
          {index === 6 && (
            arrowIndex ? (
              <Image src={RightDoubleArrow} alt='Island Item List Right Arrow' width={30} height={30} onClick={itemListChange} />
            ) : (
              <>
                <Image src={LeftDoubleArrow} alt='Island Item List Left Arrow' width={30} height={30} onClick={itemListChange} />
                <Image src={CardPack} alt='Island Card Pack' />
              </>
            )
          )}
          {index > 6 && (!arrowIndex && <Image src={CardPack} alt='Island Card Pack' />)}
        </div>
      ))}
    </>
  )
}
