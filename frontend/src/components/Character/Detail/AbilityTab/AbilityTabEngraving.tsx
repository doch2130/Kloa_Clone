'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArmoryEngraving, EngravingEffect } from '@/types/characters'
import { findArmoryEngravingValue } from './utils'

interface AbilityTabEngravingProps {
  ArmoryEngraving?: ArmoryEngraving
}

export default function AbilityTabEngraving({ ArmoryEngraving }:AbilityTabEngravingProps) {
  const [armoryEngravingList, setArmoryEngravingList] = useState<string[][]>([[], []]);

  useEffect(() => {
    if(ArmoryEngraving !== undefined) {
      const result = findArmoryEngravingValue(ArmoryEngraving?.Effects);
      setArmoryEngravingList(result);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const armoryEngravingViewHelp = () => {
    if (ArmoryEngraving !== undefined && ArmoryEngraving !== null) {
      let temp = [];
      let armoryEngravingLength = ArmoryEngraving?.Effects.length;
  
      while (armoryEngravingLength < 5) {
        temp.push(<div key={`h-6-${armoryEngravingLength}`} className="h-6"></div>);
        armoryEngravingLength++;
      }
  
      return <React.Fragment>{temp}</React.Fragment>;
    }
  
    return null;
  };

  return (
    <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] flex flex-col'>
      <div className='shrink-0 flex justify-between items-center'>
        <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
          <p className='text-sm font-bold text-[#8045dd]'>각인</p>
        </div>
        <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
        <p className='font-semibold'>
          {armoryEngravingList[0].map((armoryEngraving, index:number) => (
            <span key={index} className={armoryEngravingList[1][index]}>{armoryEngraving}</span>
          ))}
        </p>
      </div>
      <div className='mt-4 pl-1 grow flex flex-col justify-between gap-y-2 overflow-y-auto'>
        {/* 각인 리스트 사진 */}
        {ArmoryEngraving?.Effects.map((engraving:EngravingEffect, index:number) => (
          <div key={index} className='flex items-center gap-x-3 group/item'>
            {engraving !== null && <Image src={engraving.Icon} alt={engraving.Name} decoding="async" className='rounded-full bg-[#e6e8ec]' width={31} height={31} />}
            <p className='text-lg font-semibold'>
              <span className='text-[#7d8395]'>Lv.</span>
              <span className={engraving.Name.includes('감소') ? 'text-[#f95126]' : ''}>{engraving.Name.slice(engraving.Name.indexOf('Lv. ')+4, engraving.Name.indexOf('Lv. ')+5)} {engraving.Name.slice(0, engraving.Name.indexOf(' Lv.'))}</span>
            </p>
            <div className='absolute z-1 opacity-95 w-max max-w-[260px] flex flex-col justify-center items-baseline p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[18%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
              <p className='font-bold text-[0.9rem]'>{`${engraving.Name.slice(0, engraving.Name.indexOf(' Lv.'))} ${engraving.Name.slice(engraving.Name.indexOf('Lv.')).replace(' ', '')}`}</p>
              <p className='font-semibold text-[0.8rem] mt-[12px]'>{engraving.Description}</p>
            </div>
          </div>
        ))}
        {/* Layout을 맞추기 위한 함수 최소 5개 고정 */}
        {ArmoryEngraving !== undefined && ArmoryEngraving?.Effects.length < 5 && armoryEngravingViewHelp()}
      </div>
    </div>
  )
}
