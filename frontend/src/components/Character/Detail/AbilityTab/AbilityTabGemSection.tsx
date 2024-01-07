'use client'
import React from 'react'
import Image from 'next/image'
import { itemGradeStyleBackground } from '@/app/characters/[name]/utils'
import { ArmoryGem } from '@/types/characters'

interface AbilityTabGemSectionProps {
  ArmoryGem?: ArmoryGem
}

export default function AbilityTabGemSection({ ArmoryGem }:AbilityTabGemSectionProps) {
  return (
    <div className='px-[17px] pt-4 pb-2 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
      <div className='grid grid-cols-11 gap-x-4 place-items-center'>
        {[0,1,2,3,4,5,6,7,8,9,10].map((jewel:number) => {
          if(ArmoryGem?.Gems[jewel] !== undefined) {
            return (
              <div key={jewel} className='relative w-[44px] h-[44px] rounded-md group/item' style={itemGradeStyleBackground[ArmoryGem?.Gems[jewel].Grade]}>
                <Image src={ArmoryGem?.Gems[jewel].Icon} alt='jewel' width={44} height={44} decoding='async' />
                <div className='absolute bottom-0 right-0 w-4 h-4 rounded-[4px] rounded-tr-md bg-white dark:bg-[#33353a] opacity-90 flex justify-center items-center'>
                  <p className='text-[11px] text-[#FF6000] dark:text-[#ff9e63] font-medium'>{ArmoryGem?.Gems[jewel] !== undefined && ArmoryGem?.Gems[jewel].Level}</p>
                </div>
                <div className='absolute mt-1 w-max flex flex-col justify-center items-center p-2 rounded-[8px] bg-white dark:bg-[#33353a] left-1/2 translate-x-[-50%] invisible group-hover/item:visible shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]' >
                  <p className='font-bold text-[0.8rem]'>{ArmoryGem?.Gems[jewel].SkilName}</p>
                  <p className='font-semibold text-[0.7rem] mt-1'>{ArmoryGem?.Gems[jewel].SkilEffect}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div key={jewel} className='relative w-[44px] aspect-square h-full rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
            )
          }
        })}
      </div>
      {ArmoryGem?.Total &&
        <div className='grid grid-cols-11 mt-2 gap-x-4'>
          {ArmoryGem?.Total[0] > 0 &&
          <div className={`flex items-center px-2 gap-x-2`} style={{gridColumn: `span ${ArmoryGem?.Total[0]} / span ${ArmoryGem?.Total[0]}`}}>
            <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
            <p className='text-sm font-semibold text-black shrink-0 dark:text-inherit'>멸화 {ArmoryGem?.Total[0]}</p>
            <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
          </div>
          }
          {ArmoryGem?.Total[1] > 0 &&
          <div className={`flex items-center px-2 gap-x-2`} style={{gridColumn: `span ${ArmoryGem?.Total[1]} / span ${ArmoryGem?.Total[1]}`}}>
            <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
            <p className='text-sm font-semibold text-black shrink-0 dark:text-inherit'>홍염 {ArmoryGem?.Total[1]}</p>
            <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
          </div>
          }
        </div>
      }
    </div>
  )
}
