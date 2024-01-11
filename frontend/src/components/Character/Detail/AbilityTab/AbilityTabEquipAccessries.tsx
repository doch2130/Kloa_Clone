'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { ArmoryEquipment, ArmoryEquipmentPoint } from '@/types/characters'

import { itemQualityCheckFunction, itemGradeStyleBackground, itemGradeStyleColor } from '@/app/characters/[name]/utils'
import { characterJobStatus } from '@/data/CharacterJobData'
import { accessoriesBasicStatus } from '@/data/AccessoriesExportData'

interface AbilityTabEquipAccessriesProps {
  ArmoryEquipmentAccessrie:  ArmoryEquipment
  CharacterClassName: string
}

export default function AbilityTabEquipAccessries({ ArmoryEquipmentAccessrie, CharacterClassName }:AbilityTabEquipAccessriesProps) {
  if(ArmoryEquipmentAccessrie?.Type === undefined) {
    return (
      <div className='w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31] mt-3'></div>
    )
  }

  return (
    <div className={`flex items-center w-full gap-x-2 relative group/item mt-3`}>
      <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipmentAccessrie?.Grade]}>
        <Image src={ArmoryEquipmentAccessrie?.Icon} alt={ArmoryEquipmentAccessrie?.Name} width={50} height={50} loading="lazy" decoding="async" />
        <div className={`w-full h-4 text-center ${itemQualityCheckFunction(Number(ArmoryEquipmentAccessrie?.QualityValue),'background')}`}>
          <p className='text-xs font-semibold text-white'>{ArmoryEquipmentAccessrie?.QualityValue}</p>
        </div>
      </div>

      <div>
        <p className='truncate text-[0.9rem] leading-4 font-semibold' style={itemGradeStyleColor[ArmoryEquipmentAccessrie?.Grade]}>{ArmoryEquipmentAccessrie?.Name}</p>
        <p className='text-sm font-semibold mt-0.5'>
          <span>{ArmoryEquipmentAccessrie?.Effects?.[0]} {ArmoryEquipmentAccessrie?.Effects?.[1].toString().replace('+', '')}</span>
        </p>

        <p className='text-sm font-semibold mt-0.5'>
          {ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.map((armoryEquipmentPoint:ArmoryEquipmentPoint, index:number) => {
            let spanStyle = 'rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]';
            if (index > 0) {
              spanStyle += ' ml-[2px]';
            }

            if(armoryEquipmentPoint.Name === '') {
              return <Fragment key={`${armoryEquipmentPoint.Name}_${index}`} ></Fragment>
            }

            if (index === 2) {
              return (
                <span key={`${armoryEquipmentPoint.Name}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-[2px]'>{armoryEquipmentPoint.Name} {armoryEquipmentPoint.Value}</span>
              )
            }
            return (
              <span key={`${armoryEquipmentPoint.Name}_${index}`} className={spanStyle}>{armoryEquipmentPoint.Name} {armoryEquipmentPoint.Value}</span>
            )
          })}
        </p>
      </div>
      {/* 악세 Hover */}
      <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
        <p className={`truncate text-[0.95rem] font-semibold mb-2`} style={itemGradeStyleColor[ArmoryEquipmentAccessrie?.Grade]}>{ArmoryEquipmentAccessrie?.Name}</p>
        <div className='flex w-full'>
          <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
            <Image src={ArmoryEquipmentAccessrie?.Icon} alt={ArmoryEquipmentAccessrie?.Name} loading="lazy" width={44} height={44} decoding="async" />
          </div>
          <div className='ml-1 w-full h-auto flex flex-col justify-around'>
            <div className='text-xs font-semibold flex items-center'>
              <span style={itemGradeStyleColor[ArmoryEquipmentAccessrie?.Grade]}>{ArmoryEquipmentAccessrie?.Grade} {ArmoryEquipmentAccessrie?.Type}</span>
              <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
              <span className=''>{ArmoryEquipmentAccessrie?.Tear}</span>
            </div>

            <div className='flex items-center'>
              <span className={`text-[0.85rem] font-semibold mr-2 ${itemQualityCheckFunction(Number(ArmoryEquipmentAccessrie?.QualityValue),'font')}`}>{ArmoryEquipmentAccessrie?.QualityValue}</span>
              <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                <div className={`h-[9px] mt-[2px] absolute bottom-0 ${ArmoryEquipmentAccessrie?.QualityValue !== 100 ? 'rounded-r-sm' : ''} ${itemQualityCheckFunction(Number(ArmoryEquipmentAccessrie?.QualityValue),'background')}`} style={{width: `${ArmoryEquipmentAccessrie?.QualityValue}%`}}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 악세 Hover 기본 효과 */}
        <div className='mt-4 w-full'>
          <pre className='text-[0.78rem] leading-5 font-semibold'>{CharacterClassName && characterJobStatus[CharacterClassName]} {accessoriesBasicStatus[ArmoryEquipmentAccessrie?.Type]?.[ArmoryEquipmentAccessrie?.Grade]?.[0]}<br />{accessoriesBasicStatus[ArmoryEquipmentAccessrie?.Type]?.[ArmoryEquipmentAccessrie?.Grade]?.[1]}</pre>
        </div>
        {/* 악세 Hover 특성 효과 */}
        <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
        <div className='w-full'>
          <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipmentAccessrie?.Effects?.[0]} {ArmoryEquipmentAccessrie?.Effects?.[1]}</p>
        </div>
        {/* 악세 각인 효과 */}
        <div className='w-full mt-4'>
          {ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[0].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[0].Name} +{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[0].Value}</p>}
          {ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[1].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold my-[2px]'>{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[1].Name} +{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[1].Value}</p>}
          {ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[2].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold text-[#f95126]'>{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[2].Name} +{ArmoryEquipmentAccessrie?.ArmoryEquipmentPoint?.[2].Value}</p>}
        </div>
      </div>
    </div>
  )
}
