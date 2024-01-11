'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { ArmoryEquipment, ElixirEffect } from '@/types/characters'

import { transcendanceDescript } from '@/data/TranscendanceDescript'

import { itemQualityCheckFunction, itemGradeStyleBackground, itemGradeStyleColor } from '@/app/characters/[name]/utils'

import { IconTranscendance } from '/public/svgs'

interface AbilityTabEquipArmorProps {
  ArmoryEquipment?: ArmoryEquipment[]
  armorType: string
  elixirSpecialEffectDescription: string[]
}

export default function AbilityTabEquipArmor({ ArmoryEquipment, armorType, elixirSpecialEffectDescription }:AbilityTabEquipArmorProps) {
  const armorIndex = ArmoryEquipment?.findIndex(item => item.Type === armorType);

  // {/* 투구, 어깨, 상의, 하의, 장갑 */}
  // {[0,1,2,3,4]
  
  if(armorIndex === undefined || armorIndex < 0 || ArmoryEquipment === undefined) {
    const divWrapStyle = armorType === '투구' ? 'w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31]' : 'w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31] mt-3';
    return (
      <div className={divWrapStyle}></div>
      )
  }

  const divWrapStyle = armorType === '투구' ? 'relative flex items-center w-full gap-x-2 z-1 group/item' : 'relative flex items-center w-full gap-x-2 z-1 group/item mt-3';

  return (
    <div className={divWrapStyle}>
      {/* 장비 이미지, 품질 */}
      <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[armorIndex]?.Grade]}>
        <Image src={ArmoryEquipment?.[armorIndex]?.Icon} alt={ArmoryEquipment?.[armorIndex]?.Name} loading="lazy" width={50} height={50} decoding="async" />
        <div className={`w-full h-4 text-center ${itemQualityCheckFunction(Number(ArmoryEquipment?.[armorIndex]?.QualityValue),'background')}`}>
          {/* 품질 */}
          <p className='text-xs font-semibold text-white'>{ArmoryEquipment?.[armorIndex]?.QualityValue}</p>
        </div>
      </div>

      {/* 장비 정보 */}
      <div>
        {/* 초월 */}
        {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance.length !== 0 &&
        <div className='flex items-center'>
          <Image src={IconTranscendance} alt='초월' width={16} height={16} />
          <p className='text-sm font-semibold text-yellow-500 ml-0.5'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[1]}</p>
          <p className='text-[0.8rem] font-semibold ml-1'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[0]}</p>
        </div>
        }
        {/* 강화, 장비이름 */}
        <p className={`truncate text-[0.9rem] font-semibold`} style={itemGradeStyleColor[ArmoryEquipment?.[armorIndex]?.Grade]}><span className='text-base'>{ArmoryEquipment?.[armorIndex]?.Name.slice(0, ArmoryEquipment?.[armorIndex]?.Name.indexOf(' '))}</span>{ArmoryEquipment?.[armorIndex]?.Name.slice(ArmoryEquipment?.[armorIndex]?.Name.indexOf(' '))}</p>

        <div className='flex items-center'>
          {/* 세트 */}
          {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setName !== '' && <p className='text-[0.7rem] leading-3 py-0.5 text-center font-semibold bg-[#e6e8ec] dark:bg-[#4b4e58] rounded-sm px-1.5'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setName} <span className='text-[0.75rem]'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setLevel}</span></p>}
          
          {/* 엘릭서 */}
          {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirEffect?.length !== 0 &&
          <div className='gap-x-1.5 font-semibold ml-1.5 flex items-center'>
            {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirEffect.map((effect:ElixirEffect, index:number) => 
              <span key={`${effect}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{effect.elixirEffectName} <span className='text-[0.75rem]'>Lv.{effect.elixirEffectLevel}</span></span>
            )}
          </div>
          }
        </div>
      </div>

      {/* 장비 Hover */}
      <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
        <p className='truncate text-[0.9rem] font-semibold mb-2' style={itemGradeStyleColor[ArmoryEquipment?.[armorIndex]?.Grade]}><span className='text-base'>{ArmoryEquipment?.[armorIndex]?.Name.slice(0, ArmoryEquipment?.[armorIndex]?.Name.indexOf(' '))}</span>{ArmoryEquipment?.[armorIndex]?.Name.slice(ArmoryEquipment?.[armorIndex]?.Name.indexOf(' '))}</p>
        <div className='flex w-full'>
          <div className={`w-[45px] h-[45px] rounded-md overflow-hidden shrink-0}`} style={itemGradeStyleBackground[ArmoryEquipment?.[armorIndex]?.Grade]}>
            <Image src={ArmoryEquipment?.[armorIndex]?.Icon} alt={ArmoryEquipment?.[armorIndex]?.Name} loading="lazy" width={44} height={44} decoding="async" />
          </div>
          <div className='ml-1 w-full h-auto flex flex-col justify-around'>
            <div className='text-xs font-semibold flex items-center'>
              <span style={itemGradeStyleColor[ArmoryEquipment?.[armorIndex]?.Grade]}>{ArmoryEquipment?.[armorIndex]?.Grade} {ArmoryEquipment?.[armorIndex]?.Type}</span>
              <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
              <span className='pb-[1px]'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.itemLevel}</span>
              <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
              <span className=''>{ArmoryEquipment?.[armorIndex]?.Tear}</span>
            </div>
            <div className='flex items-center'>
              <span className={`text-[0.85rem] font-semibold mr-2 ${itemQualityCheckFunction(Number(ArmoryEquipment?.[armorIndex]?.QualityValue),'font')}`}>{ArmoryEquipment?.[armorIndex]?.QualityValue}</span>
              <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                <div className={`h-[9px] mt-[2px] absolute bottom-0 ${ArmoryEquipment?.[armorIndex]?.QualityValue !== 100 ? 'rounded-r-sm' : ''} ${itemQualityCheckFunction(Number(ArmoryEquipment?.[armorIndex]?.QualityValue),'background')}`} style={{width: `${ArmoryEquipment?.[armorIndex]?.QualityValue}%`}}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 장비 Hover 기본 효과 */}
        <div className='mt-4 w-full'>
          <pre className='text-[0.75rem] leading-5 font-semibold'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.basicEffect.join('\n')}</pre>
        </div>
        {/* 장비 Hover 추가 효과 */}
        {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.addEffect !== undefined &&
        <>
          <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
          <div className='w-full'>
            <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.addEffect}</p>
          </div>
        </>
        }
        {/* 장비 초월 효과 */}
        {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance.length !== 0 &&
        <>
          <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
          <div className='w-full flex'>
            <p className='text-[0.8rem] leading-5 font-semibold'>초월</p>
            <p className='text-[0.8rem] font-semibold mx-1'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[0]} </p>
            <Image src={IconTranscendance} alt='초월' width={16} height={16} />
            <p className='text-[0.8rem] font-semibold ml-0.5'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[1]}</p>
          </div>
          <p className='text-[0.8rem] leading-5 font-semibold w-full mt-0.5'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[2]}</p>
          <div className='w-full'>
            {[5,10,15,20].map((el:number, index:number) => {
              if((Number(ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.transcendance?.[1]) | 0) >= el) {
                return (
                  <Fragment key={`${el}_${index}`}>
                    <div className='w-full flex mt-2'>
                      <Image src={IconTranscendance} alt='초월' width={16} height={16} />
                      <span className='text-sm leading-5 font-semibold mx-1'>{el}</span>
                      <span className='text-sm leading-5 font-semibold'>추가 효과</span>
                    </div>
                    <p className='text-xs leading-5 font-semibold w-full mt-0.5'>{transcendanceDescript[ArmoryEquipment?.[armorIndex]?.Type][index]}</p>
                  </Fragment>
                )
              }
              return (
                <Fragment key={`${el}_${index}`}></Fragment>
              )
              
            })}
          </div>
        </>
        }
        {/* 장비 엘릭서 효과 */}
        {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirEffect?.length !== 0 &&
          <>
            <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
            {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirEffect.map((effect:ElixirEffect, index:number) =>
              <Fragment key={`${index}`}>
                <div className={`w-full flex ${index > 0 && 'mt-2'}`}>
                  <span className='text-sm leading-5 font-semibold'>{effect.elixirEffectName} <span className={Number(effect.elixirEffectLevel) < 5 ? 'text-[#5865f2] dark:text-[#8991ee]' : 'text-[#8045dd] dark:text-[#a36bfc]'}>Lv.{effect.elixirEffectLevel}</span></span>
                  <span className="text-[0.8rem] font-bold leading-5 ml-2 w-[55px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center">0.97%</span>
                </div>
                <pre className='text-xs leading-5 font-semibold w-full ml-0.5 whitespace-pre-line'>{effect.additionalEffects.join('\r\n')}</pre>
              </Fragment>
            )
          }

          {(elixirSpecialEffectDescription[0] !== '' && (armorType === '투구' || armorType === '장갑')) &&
            <>
              {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirTotal !== undefined && ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirTotal! >= 40 ?
                <>
                  <div className={`w-full flex mt-2`}>
                    <span className='text-sm leading-5 font-semibold text-[#8045dd] dark:text-[#a36bfc]'>{`${ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirSpecialOption} (2단계)`}</span>
                    <span className="text-[0.8rem] font-bold leading-5 ml-2 w-[55px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center">11.55%</span>
                  </div>
                  <div>
                    <span className="text-[0.8rem] font-bold leading-5">1단계 : 지혜의 엘릭서 레벨 합 35</span>
                    <pre className='text-xs leading-5 font-semibold w-full ml-0.5 whitespace-pre-line'>{elixirSpecialEffectDescription[0]}</pre>
                  </div>
                  <div>
                    <span className="text-[0.8rem] font-bold leading-5">2단계 : 지혜의 엘릭서 레벨 합 40</span>
                    <pre className='text-xs leading-5 font-semibold w-full ml-0.5 whitespace-pre-line'>{elixirSpecialEffectDescription[1]}</pre>
                  </div>
                </>
              :
                <>
                  <div className={`w-full flex mt-2`}>
                    <span className='text-sm leading-5 font-semibold text-[#5865f2] dark:text-[#8991ee]'>{`${ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirSpecialOption} (1단계)`}</span>
                    <span className="text-[0.8rem] font-bold leading-5 ml-2 w-[55px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center">5.18%</span>
                  </div>
                  <div>
                    <span className="text-[0.8rem] font-bold leading-5">1단계 : 지혜의 엘릭서 레벨 합 35</span>
                    <pre className='text-xs leading-5 font-semibold w-full ml-0.5 whitespace-pre-line'>{elixirSpecialEffectDescription[0]}</pre>
                  </div>
                </>
              }
            </>
          }

          
          </>
        }

        {/* 장비 세트 효과 */}
        {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setName !== '' &&
        <>
        <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
        <div className='w-full'>
          <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setName} {ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.setEffectName.setLevel}</p>
        </div>
        </>
        }
      </div>

    </div>
  )
}
