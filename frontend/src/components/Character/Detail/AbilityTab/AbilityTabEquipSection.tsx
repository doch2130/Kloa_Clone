'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArmoryEquipment, ArmoryEngraving, ArmoryEquipmentPoint } from '@/types/characters'

import { characterJobStatus } from '@/data/CharacterJobData'
import { allEngravingDescriptionList } from '@/data/EngravingsData'
import { accessoriesBasicStatus } from '@/data/AccessoriesExportData'

import { itemGradeStyleBackground, itemGradeStyleColor, itemQualityCheckFunction } from '@/app/characters/[name]/utils'
import { elixirSpecialEffectCheck, findValueInEngravingPoint } from './utils'

import AbilityTabEquipAccessries from './AbilityTabEquipAccessries'
import AbilityTabEquipArmor from './AbilityTabEquipArmor'

import { IconTranscendance, IconElixir } from '/public/svgs'

interface AbilityTabEquipSectionProps {
  ArmoryEquipment?: ArmoryEquipment[]
  ArmoryEngraving?: ArmoryEngraving
  CharacterClassName?: string
  transcendanceTotal?: number
  transcendanceAverage?: number
}

export default function AbilityTabEquipSection({ ArmoryEquipment, ArmoryEngraving, CharacterClassName, transcendanceTotal, transcendanceAverage }:AbilityTabEquipSectionProps) {
  const weaponIndex = ArmoryEquipment?.findIndex(item => item.Type === '무기');
  const headArmorIndex = ArmoryEquipment?.findIndex(item => item.Type === '투구');
  const necklaceIndex = ArmoryEquipment?.findIndex(item => item.Type === '목걸이');
  const earringOneIndex = ArmoryEquipment?.findIndex(item => item.Type === '귀걸이');
  let earringTwoIndex: number | undefined = undefined;
  if(earringOneIndex) {
    earringTwoIndex = ArmoryEquipment?.findIndex((item, index) => index > earringOneIndex && item.Type === '귀걸이');
  }
  const ringOneIndex = ArmoryEquipment?.findIndex(item => item.Type === '반지');
  let ringTwoIndex: number | undefined = undefined;
  if(ringOneIndex) {
    ringTwoIndex = ArmoryEquipment?.findIndex((item, index) => index > ringOneIndex && item.Type === '반지');
  }
  const braceletIndex = ArmoryEquipment?.findIndex(item => item.Type === '팔찌');
  const abilityStoneIndex = ArmoryEquipment?.findIndex(item => item.Type === '어빌리티 스톤');

  const [elixirSpecialEffectDescription, setElixirSpecialEffectDescription] = useState<string[]>(['']);

  useEffect(() => {
    if(ArmoryEquipment !== undefined) {
      const result:string[] = elixirSpecialEffectCheck(ArmoryEquipment);
      setElixirSpecialEffectDescription(result);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArmoryEquipment]);

  return (
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
      <div className='grid grid-cols-2 gap-x-3'>
        {/* 장비 정보 - 장비 */}
        <div>
          <>
          {['투구', '어깨', '상의', '하의', '장갑'].map((el:string, index:number) => {
            return (
              <Fragment key={`${el}_${index}`}>
                <AbilityTabEquipArmor ArmoryEquipment={ArmoryEquipment} armorType={el} elixirSpecialEffectDescription={elixirSpecialEffectDescription} />
              </Fragment>
            )
          })}

          {/* 무기 */}
          {ArmoryEquipment !== undefined && weaponIndex !== undefined && weaponIndex >= 0 ?
          <div className={'relative flex items-center w-full gap-x-2 z-1 group/item mt-3'}>
            {/* 무기 이미지, 품질 */}
            <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[weaponIndex]?.Grade]}>
              <Image src={ArmoryEquipment?.[weaponIndex]?.Icon} alt={ArmoryEquipment?.[weaponIndex]?.Name} loading="lazy" width={50} height={50} decoding="async" />
              <div className={`w-full h-4 text-center ${itemQualityCheckFunction(Number(ArmoryEquipment?.[weaponIndex]?.QualityValue),'background')}`}>
                {/* 품질 */}
                <p className='text-xs font-semibold text-white'>{ArmoryEquipment?.[weaponIndex]?.QualityValue}</p>
              </div>
            </div>
            {/* 무기 정보 */}
            <div>
              {/* 강화, 장비이름 */}
              <p className={`truncate text-[0.9rem] font-semibold`} style={itemGradeStyleColor[ArmoryEquipment?.[weaponIndex]?.Grade]}><span className='text-base'>{ArmoryEquipment?.[weaponIndex]?.Name.slice(0, ArmoryEquipment?.[weaponIndex]?.Name.indexOf(' '))}</span>{ArmoryEquipment?.[weaponIndex]?.Name.slice(ArmoryEquipment?.[weaponIndex]?.Name.indexOf(' '))}</p>
              
              <div className='flex items-center'>
                {/* 세트 */}
                {ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setName !== '' && <p className='text-[0.7rem] leading-3 py-0.5 text-center font-semibold bg-[#e6e8ec] dark:bg-[#4b4e58] rounded-sm px-1.5'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setName} <span className='text-[0.75rem]'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setLevel}</span></p>}
                
                {/* 엘릭서 */}
                {(ArmoryEquipment !== undefined && headArmorIndex !== undefined && ArmoryEquipment?.[headArmorIndex]?.ArmoryAttribute?.elixirTotal! !== undefined && ArmoryEquipment?.[headArmorIndex]?.ArmoryAttribute?.elixirTotal! > 0) &&
                <div className='gap-x-1.5 font-semibold ml-1.5 flex items-center'>
                  <div className='flex items-center gap-x-1.5'>
                    {elixirSpecialEffectDescription[0] !== '' && <div className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{ArmoryEquipment?.[headArmorIndex]?.ArmoryAttribute?.elixirSpecialOption} {ArmoryEquipment?.[headArmorIndex]?.ArmoryAttribute?.elixirTotal! >= 40 ? '2단계' : '1단계'}</div>}
                    <div className='font-semibold text-white rounded-sm pl-0.5 pr-1 py-0.5 flex justify-center items-center gap-x-0.5 rounded-r-none last:rounded-r-sm text-xs leading-3 bg-[#2AB1F6]'>
                      <Image src={IconElixir} alt='엘릭서' width={12} height={12} />
                      <p className='flex items-end drop-shadow'>20.15%</p>
                    </div>
                  </div>
                </div>
                }
              </div>
              {/* 무기, 초월 합계 및 초월 증가 수치 */}
              {transcendanceTotal !== undefined && transcendanceTotal > 0 &&
              <div className='flex items-center mt-1 w-fit font-semibold text-[0.75rem] leading-3 rounded-full px-1.5 py-0.5 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>
                <Image src={IconTranscendance} alt='초월' width={14} height={14} />
                <p className='ml-1 font-semibold text-yellow-500'>합계 {transcendanceTotal}</p>
                <p className='ml-1.5 font-semibold dark:text-[#cacdd4]'>평균 {transcendanceAverage}단계</p>
                <p className='ml-1 font-semibold dark:text-[#cacdd4]'>+4.92%</p>
              </div>
              }
              
            </div>
            {/* 무기 Hover */}
            <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
              <p className='truncate text-[0.9rem] font-semibold mb-2' style={itemGradeStyleColor[ArmoryEquipment?.[weaponIndex]?.Grade]}><span className='text-base'>{ArmoryEquipment?.[weaponIndex]?.Name.slice(0, ArmoryEquipment?.[weaponIndex]?.Name.indexOf(' '))}</span>{ArmoryEquipment?.[weaponIndex]?.Name.slice(ArmoryEquipment?.[weaponIndex]?.Name.indexOf(' '))}</p>
              <div className='flex w-full'>
                <div className={`w-[45px] h-[45px] rounded-md overflow-hidden shrink-0`} style={itemGradeStyleBackground[ArmoryEquipment?.[weaponIndex]?.Grade]}>
                  <Image src={ArmoryEquipment?.[weaponIndex]?.Icon} alt={ArmoryEquipment?.[weaponIndex]?.Name} loading="lazy" width={44} height={44} decoding="async" />
                </div>
                <div className='ml-1 w-full h-auto flex flex-col justify-around'>
                  <div className='text-xs font-semibold flex items-center'>
                    <span style={itemGradeStyleColor[ArmoryEquipment?.[weaponIndex]?.Grade]}>{ArmoryEquipment?.[weaponIndex]?.Grade} {ArmoryEquipment?.[weaponIndex]?.Type}</span>
                    <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                    <span className='pb-[1px]'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.itemLevel}</span>
                    <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                    <span className=''>{ArmoryEquipment?.[weaponIndex]?.Tear}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className={`text-[0.85rem] font-semibold mr-2 ${itemQualityCheckFunction(Number(ArmoryEquipment?.[weaponIndex]?.QualityValue),'font')}`}>{ArmoryEquipment?.[weaponIndex]?.QualityValue}</span>
                    <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                      <div className={`h-[9px] mt-[2px] absolute bottom-0 ${ArmoryEquipment?.[weaponIndex]?.QualityValue !== 100 ? 'rounded-r-sm' : ''} ${itemQualityCheckFunction(Number(ArmoryEquipment?.[weaponIndex]?.QualityValue),'background')}`} style={{width: `${ArmoryEquipment?.[weaponIndex]?.QualityValue}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 무기 Hover 기본 효과 */}
              <div className='mt-4 w-full'>
                <pre className='text-[0.75rem] leading-5 font-semibold'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.basicEffect}</pre>
              </div>
              {/* 무기 Hover 추가 효과 */}
              {ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.addEffect !== undefined &&
              <>
              <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
              <div className='w-full'>
                <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.addEffect}</p>
              </div>
              </>
              }
              {/* 무기 세트 효과 */}
              {ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setName !== '' &&
              <>
              <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
              <div className='w-full'>
                <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setName} {ArmoryEquipment?.[weaponIndex]?.WeaponAttribute?.setEffectName.setLevel}</p>
              </div>
              </>
              }
            </div>
          </div>
          :
          <div className='w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31] mt-3'></div>
          }
          </>

          {/* 장착 각인 */}
          <div className='h-[50px] px-0.5 grid grid-cols-2 items-center mt-3'>
            {[1,2].map((count:number, index:number) => {
              if(ArmoryEngraving?.Engravings) {
                return (
                <div key={index} className='relative group/item'>
                  <div className='flex items-center text-left h-11 gap-x-3'>
                    <Image src={ArmoryEngraving?.Engravings[index].Icon} alt={ArmoryEngraving?.Engravings[index].Name} width={44} height={44} decoding="async" className='rounded-full drop-shadow' />
                    <div>
                      <p className='text-sm font-semibold'>{ArmoryEngraving?.Engravings[index].Name}</p>
                      <p className='text-[0.7rem] font-semibold mt-0.5'>활성 포인트 {findValueInEngravingPoint(ArmoryEngraving?.Engravings[index].Tooltip)}</p>
                    </div>
                  </div>
                  {/* 장착 각인 Hover */}
                  <div className='absolute z-10 opacity-98 w-[260px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                    <div className='flex w-full'>
                      <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' >
                        <Image src={ArmoryEngraving?.Engravings[index].Icon} alt={ArmoryEngraving?.Engravings[index].Name} loading="lazy" width={44} height={44} decoding="async" />
                      </div>
                      <div className='w-full ml-3'>
                        <p className='text-base font-bold'>{ArmoryEngraving?.Engravings[index].Name}</p>
                        <p className='text-[0.7rem] font-semibold text-[#7d8395] mt-0.5 pl-0.5'>활성 포인트 {findValueInEngravingPoint(ArmoryEngraving?.Engravings[index].Tooltip)}</p>
                      </div>
                    </div>
                    <div className='flex flex-col w-full'>
                    {[1,2,3].map((el:number) => (
                      <div key={el} className='w-full mt-3'>
                        <p className='text-[0.9rem] font-bold leading-6'>레벨 {el} (활성도 {el*5})</p>
                        <p className='text-[0.85rem] font-semibold leading-5'>{allEngravingDescriptionList[ArmoryEngraving?.Engravings[index].Name][el-1]}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-full w-11 h-11'></div>
              )
            }
            })}
          </div>
        </div>
        {/* 장비 정보 - 악세 */}
        <div>
          <>
          {/* 목걸이 */}
          {ArmoryEquipment !== undefined && necklaceIndex !== undefined && necklaceIndex >= 0 ?
            <div className={'flex items-center w-full gap-x-2 relative group/item'}>
              {/* 목걸이 사진 */}
              <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[necklaceIndex]?.Grade]}>
                <Image src={ArmoryEquipment?.[necklaceIndex].Icon} alt={ArmoryEquipment?.[necklaceIndex]?.Name} width={50} height={50} loading="lazy" decoding="async" />
                <div className={`w-full h-4 text-center ${itemQualityCheckFunction(Number(ArmoryEquipment?.[necklaceIndex]?.QualityValue),'background')}`}>
                  <p className='text-xs font-semibold text-white'>{ArmoryEquipment?.[necklaceIndex]?.QualityValue}</p>
                </div>
              </div>
              {/* 목걸이 정보 */}
              <div>
                <p className='truncate text-[0.9rem] leading-4 font-semibold' style={itemGradeStyleColor[ArmoryEquipment?.[necklaceIndex]?.Grade]}>{ArmoryEquipment?.[necklaceIndex]?.Name}</p>
                <p className='text-sm font-semibold mt-0.5'>
                  {ArmoryEquipment?.[necklaceIndex]?.Effects?.map((effect:string[], index:number) => {
                    let marginStyle = '';
                    if(index > 0) {
                      marginStyle = 'ml-1.5';
                    }
                    return (
                    <Fragment key={index}>
                      <span className={marginStyle}>{effect[0]} {effect[1].replace('+', '')}</span>
                    </Fragment>
                  )})}
                </p>
                <p className='text-sm font-semibold mt-0.5'>
                  {ArmoryEquipment?.[necklaceIndex].ArmoryEquipmentPoint?.map((armoryEquipmentPoint:ArmoryEquipmentPoint, index:number) => {
                    let spanStyle = 'rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]';
                    if (index > 0) {
                      spanStyle += ' ml-1.5';
                    }

                    if(armoryEquipmentPoint.Name === '') {
                      return <Fragment key={`${armoryEquipmentPoint?.Name}_${index}`} ></Fragment>
                    }

                    if (index === 2) {
                      return (
                        <span key={`${armoryEquipmentPoint?.Name}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>{armoryEquipmentPoint?.Name} {armoryEquipmentPoint?.Value}</span>
                      )
                    }
                    return (
                      <span key={`${armoryEquipmentPoint?.Name}_${index}`} className={spanStyle}>{armoryEquipmentPoint?.Name} {armoryEquipmentPoint?.Value}</span>
                    )
                  })}
                </p>
              </div>
              {/* 목걸이 Hover */}
              <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <p className={`truncate text-[0.95rem] font-semibold mb-2`} style={itemGradeStyleColor[ArmoryEquipment?.[necklaceIndex]?.Grade]}>{ArmoryEquipment?.[necklaceIndex]?.Name}</p>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[necklaceIndex]?.Grade]}>
                    <Image src={ArmoryEquipment?.[necklaceIndex]?.Icon} alt={ArmoryEquipment?.[necklaceIndex]?.Name} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='ml-1 w-full h-auto flex flex-col justify-around'>
                    <div className='text-xs font-semibold flex items-center'>
                      <span style={itemGradeStyleColor[ArmoryEquipment?.[necklaceIndex]?.Grade]}>{ArmoryEquipment?.[necklaceIndex]?.Grade} {ArmoryEquipment?.[necklaceIndex]?.Type}</span>
                      <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                      <span className=''>{ArmoryEquipment?.[necklaceIndex].Tear}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className={`text-[0.85rem] font-semibold mr-2 ${itemQualityCheckFunction(Number(ArmoryEquipment?.[necklaceIndex]?.QualityValue),'font')}`}>{ArmoryEquipment?.[necklaceIndex]?.QualityValue}</span>
                      <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                        <div className={`h-[9px] mt-[2px] absolute bottom-0 ${ArmoryEquipment?.[necklaceIndex]?.QualityValue !== 100 ? 'rounded-r-sm' : ''} ${itemQualityCheckFunction(Number(ArmoryEquipment?.[necklaceIndex]?.QualityValue),'background')}`} style={{width: `${ArmoryEquipment?.[necklaceIndex]?.QualityValue}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 목걸이 Hover 기본 효과 */}
                <div className='mt-4 w-full'>
                  <pre className='text-[0.78rem] leading-5 font-semibold'>{CharacterClassName && characterJobStatus[CharacterClassName]} {accessoriesBasicStatus[ArmoryEquipment?.[necklaceIndex]?.Type]?.[ArmoryEquipment?.[necklaceIndex]?.Grade]?.[0]}<br />{accessoriesBasicStatus[ArmoryEquipment?.[necklaceIndex]?.Type]?.[ArmoryEquipment?.[necklaceIndex]?.Grade]?.[1]}</pre>
                </div>
                {/* 목걸이 Hover 특성 효과 */}
                <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
                <div className='w-full'>
                  <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[necklaceIndex]?.Effects?.[0][0]} {ArmoryEquipment?.[necklaceIndex]?.Effects?.[0][1]}</p>
                  <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[necklaceIndex]?.Effects?.[1][0]} {ArmoryEquipment?.[necklaceIndex]?.Effects?.[1][1]}</p>
                </div>
                {/* 목걸이 각인 효과 */}
                <div className='w-full mt-4'>
                  {ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[0].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold'>{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[0].Name} +{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[0].Value}</p>}
                  {ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[1].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold my-[2px]'>{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[1].Name} +{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[1].Value}</p>}
                  {ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[2].Name !== '' && <p className='text-[0.8rem] leading-5 font-semibold text-[#f95126]'>{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[2].Name} +{ArmoryEquipment?.[necklaceIndex]?.ArmoryEquipmentPoint?.[2].Value}</p>}
                </div>
              </div>
            </div>
          :
          <div className='w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
          }

          {[0,0,1,1].map((el:number, index:number) => {
            if(el === 0 && ArmoryEquipment !== undefined) {
              if(earringOneIndex !== undefined && index === 0) {
                // 귀걸이1
                return (
                  <Fragment key={`${el}_${index}`}>
                    <AbilityTabEquipAccessries ArmoryEquipmentAccessrie={ArmoryEquipment[earringOneIndex]} CharacterClassName={CharacterClassName !== undefined ? CharacterClassName : ''} />
                  </Fragment>
                )
              } else if(earringTwoIndex !== undefined) {
                // 귀걸이2
                return (
                  <Fragment key={`${el}_${index}`}>
                    <AbilityTabEquipAccessries ArmoryEquipmentAccessrie={ArmoryEquipment[earringTwoIndex]} CharacterClassName={CharacterClassName !== undefined ? CharacterClassName : ''} />
                  </Fragment>
                )
              }
            } else if(el === 1 && ArmoryEquipment !== undefined) {
              if(ringOneIndex !== undefined && index === 2) {
                // 반지1
                return (
                  <Fragment key={`${el}_${index}`}>
                    <AbilityTabEquipAccessries ArmoryEquipmentAccessrie={ArmoryEquipment[ringOneIndex]} CharacterClassName={CharacterClassName !== undefined ? CharacterClassName : ''} />
                  </Fragment>
                )
              } else if(ringTwoIndex !== undefined) {
                // 반지2
                return (
                  <Fragment key={`${el}_${index}`}>
                    <AbilityTabEquipAccessries ArmoryEquipmentAccessrie={ArmoryEquipment[ringTwoIndex]} CharacterClassName={CharacterClassName !== undefined ? CharacterClassName : ''} />
                  </Fragment>
                )
              }
            }

            return (
              <div key={`${el}_${index}`} className='w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
            )
          })}
          </>

          {/* 팔찌 */}
          {ArmoryEquipment !== undefined && braceletIndex !== undefined && braceletIndex >= 0 ?
          <div className='flex items-center w-full gap-x-2 mt-3 relative group/item'>
            {/* 팔찌 사진 */}
            <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[braceletIndex].Grade]}>
              <Image src={ArmoryEquipment?.[braceletIndex].Icon} alt={ArmoryEquipment?.[braceletIndex].Name} width={50} height={50} loading="lazy" decoding="async" />
              <div className='class="w-full h-4 text-center bg-[#8045dd]'>
                {/* 팔찌 계산기는 적용 안함, 고정 값 */}
                <p className='text-xs font-semibold text-white'>9.64%</p>
              </div>
            </div>
            {/* 팔찌 정보 */}
            <div>
              <p className='truncate text-[0.9rem] leading-4 font-semibold' style={itemGradeStyleColor[ArmoryEquipment?.[braceletIndex].Grade]}>{ArmoryEquipment?.[braceletIndex].Name}</p>
              <p className='text-sm font-semibold mt-0.5'>
                {ArmoryEquipment?.[braceletIndex].Effects?.map((effect:string[], index:number) => {
                  const order = ['치명', '신속', '특화', '제압', '숙련', '인내'];
                  if(order.findIndex(str => effect[0].includes(str)) >= 0) {
                    return (
                    <span key={`${effect[0]}_${index}`} className={index === 1 ? 'ml-1.5' : ''}>{`${effect[0]} ${effect[1].replace('+', '')}`}</span>
                    )
                  } else {
                  return (
                    <Fragment key={`${effect[0]}_${index}`}></Fragment>
                    )
                  }
                })}
              </p>
              {/* 팔찌 특옵 */}
              <p className='text-sm font-semibold mt-0.5'>
                {ArmoryEquipment?.[braceletIndex].Effects?.map((effect:string[], index:number) => {
                  const order = ['치명', '신속', '특화', '제압', '숙련', '인내'];
                  if(order.findIndex(str => effect[0].includes(str)) === -1) {
                    return (
                    <span key={`${effect[0]}_${index}`} className={'rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] mr-[2px]'}>{`${effect[0]}`}</span>
                    )
                  } else {
                  return (
                    <Fragment key={`${effect[0]}_${index}`}></Fragment>
                    )
                  }
                })}
              </p>
            </div>
            {/* 팔찌 Hover */}
            <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
              <p className='truncate text-[0.95rem] font-semibold text-[#D9AB48] mb-2'>{ArmoryEquipment?.[braceletIndex].Name}</p>
              <div className='flex w-full'>
                <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment?.[braceletIndex].Grade]}>
                  <Image src={ArmoryEquipment?.[braceletIndex].Icon} alt={ArmoryEquipment?.[braceletIndex].Name} loading="lazy" width={44} height={44} decoding="async" />
                </div>
                <div className='ml-1 w-full h-auto flex flex-col justify-evenly'>
                  <div className='text-xs font-semibold flex items-center'>
                    <span style={itemGradeStyleColor[ArmoryEquipment?.[braceletIndex].Grade]}>{ArmoryEquipment?.[braceletIndex].Grade} {ArmoryEquipment?.[braceletIndex].Type}</span>
                    <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                    <span className=''>{ArmoryEquipment?.[braceletIndex].Tear}</span>
                  </div>
                  <div className='flex items-center ml-[2px]'>
                    <div className="w-full flex items-center font-semibold text-xs whitespace-pre">
                      {ArmoryEquipment?.[braceletIndex].Effects !== undefined && ArmoryEquipment?.[braceletIndex]?.Effects?.map((effect:string[], index:number) => {
                        if(index === 0) {
                          return <span key={`${effect[0]}_${index}`}>{effect[0]}</span>
                        }
                        return (
                          <Fragment key={`${effect[0]}_${index}`}>
                          <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mx-[4px]'></div>
                          <span>{effect[0]}</span>
                          </Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* 팔찌 옵션 */}
              <div className='w-full mt-4'>
                {ArmoryEquipment?.[braceletIndex].Effects !== undefined && ArmoryEquipment?.[braceletIndex]?.Effects?.map((effect:string[], index:number) => {
                  const order = ['치명', '신속', '특화', '제압', '숙련', '인내', '마법 방어력', '물리 방어력', '전투 중 생명력 회복량', '최대 마나', '최대 생명력', '체력' , '힘', '민첩', '지능'];
                  const findValue = order.findIndex(str => effect[0].includes(str));
                  return (
                  <div key={`${effect[0]}_${index}`} className='flex flex-col my-[4px]'>
                    <div className='flex items-center'>
                      <span className='text-[0.8rem] leading-5 font-bold'>{findValue >= 0 ? `${effect[0]} ${effect[1]}` : effect[0]}</span>
                      <span className="text-[0.8rem] font-bold leading-5 ml-2 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center">2.77%</span>
                    </div>
                    {findValue < 0 && <p className='text-[0.8rem] leading-5 font-bold my-[4px]'>{effect[1]}</p>}
                  </div>
                )})}
              </div>
            </div>
          </div>
          : <div className="w-[50px] h-[66px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31] mt-3"></div>
          }

          {/* 어빌리티 스톤 (돌) */}
          <div className='flex'>
            {ArmoryEquipment !== undefined && abilityStoneIndex !== undefined && abilityStoneIndex >= 0 ?
            <div className='flex items-center text-left gap-x-2 mt-3 relative group/item'>
              <div className='w-[50px] h-[50px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment[abilityStoneIndex].Grade]}>
                <Image src={ArmoryEquipment[abilityStoneIndex].Icon} alt={ArmoryEquipment[abilityStoneIndex].Name} width={50} height={50} decoding="async" />
              </div>
              <div>
                <p className='text-[0.9rem] font-semibold leading-4' style={itemGradeStyleColor[ArmoryEquipment[abilityStoneIndex].Grade]}>{ArmoryEquipment[abilityStoneIndex].Name}</p>
                <p className='mt-1'>
                  {ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint !== undefined &&
                  ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.map((armoryEquipmentPoint:ArmoryEquipmentPoint, index:number) => {
                    if(armoryEquipmentPoint.Name !== '') {
                      if(index === 2) {
                        return <span key={`${armoryEquipmentPoint.Name}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-[2px]'>{`${armoryEquipmentPoint.Name} ${armoryEquipmentPoint.Value}`}</span>
                      } else {
                        return <span key={`${armoryEquipmentPoint.Name}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{`${armoryEquipmentPoint.Name} ${armoryEquipmentPoint.Value}`}</span>
                      }
                    } else {
                      return <Fragment key={`${armoryEquipmentPoint.Name}_${index}`}></Fragment>
                    }
                  })
                  }
                </p>
              </div>
              {/* 어빌리티 스톤 (돌) Hover */}
              <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <p className='truncate text-[0.95rem] font-semibold mb-2' style={itemGradeStyleColor[ArmoryEquipment[abilityStoneIndex].Grade]}>{ArmoryEquipment[abilityStoneIndex].Name}</p>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={itemGradeStyleBackground[ArmoryEquipment[abilityStoneIndex].Grade]}>
                    <Image src={ArmoryEquipment[abilityStoneIndex].Icon} alt={ArmoryEquipment[abilityStoneIndex].Name} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='ml-1 w-full h-auto flex flex-col justify-evenly'>
                    <div className='text-xs font-semibold flex items-center'>
                      <span style={itemGradeStyleColor[ArmoryEquipment[abilityStoneIndex].Grade]}>{`${ArmoryEquipment[abilityStoneIndex].Grade} ${ArmoryEquipment[abilityStoneIndex].Type}`}</span>
                      <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                      <span className=''>{ArmoryEquipment[abilityStoneIndex].Tear}</span>
                    </div>
                    <div className='flex items-center ml-[2px]'>
                      <div className="w-full flex items-center">
                        <span className='text-[0.85rem] font-semibold'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[0].Value}</span>
                        <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mt-[3px] mx-[6px]'></div>
                        <span className='text-[0.85rem] font-semibold'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[1].Value}</span>
                        <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mt-[3px] mx-[6px]'></div>
                        <span className='text-[0.85rem] font-semibold text-[#f95126]'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[2].Value}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 돌 체력 */}
                <div className='w-full mt-4'>
                  <p className='text-sm font-bold'>{ArmoryEquipment[abilityStoneIndex].Healthy}</p>
                </div>
                <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
                {/* 돌 옵션 */}
                <div className='w-full'>
                  {ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[0].Name !== '' && 
                    <p className='text-[0.8rem] leading-5 font-bold'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[0].Name} +{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[0].Value}</p>
                  }
                  {ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[1].Name !== '' && 
                    <p className='text-[0.8rem] leading-5 font-bold my-[2px]'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[1].Name} +{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[1].Value}</p>
                  }
                  {ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[2].Name !== '' && 
                    <p className='text-[0.8rem] leading-5 font-bold text-[#f95126]'>{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[2].Name} +{ArmoryEquipment[abilityStoneIndex].ArmoryEquipmentPoint?.[2].Value}</p>
                  }
                </div>
              </div>
            </div>
            : <div className="w-[50px] h-[50px] rounded-md bg-[#e6e8ec] dark:bg-[#2b2d31] mt-3"></div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
