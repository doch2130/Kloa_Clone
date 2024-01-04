'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { ArmoryEquipment, ArmoryEngraving, ArmoryEquipmentPoint } from './CharacterResponseType'

import transcendance from '@/assets/Icon/transcendance.svg'
import elixir from '@/assets/Icon/elixir.svg'

import { allEngravingDescriptionList } from '@/data/EngravingsData'
import { itemGradeStyleBackground, itemGradeStyleColor } from '../ItemGradeStyle'
import { accessoriesBasicStatus } from './AccessoriesExport'
import { characterJobStatus } from '@/data/CharacterJobData'
import { itemQualityCheckFunction } from '../ItemQualityStyle'
import AbilityTabEquipAccessries from './AbilityTabEquipAccessries'

interface AbilityTabEquipSectionProps {
  ArmoryEquipment?: ArmoryEquipment[]
  ArmoryEngraving?: ArmoryEngraving
  CharacterClassName?: string
}

const findValueInEngravingPoint = (str: string) => {
  const startIndex = str.indexOf('각인 활성 포인트 ')+10;
  const endIndex = str.indexOf('<\/FONT>', startIndex);

  return str.slice(startIndex, endIndex);
}

// 임시 값
type equipArrayType = {
  reinforcementLevel: string;
  name: string;
  itemLevel: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  setEffect: string;
  basicEffect: string;
  additionalEffects: string;
  imageSrc: string;
}

type equipAccessoriesArrayType = {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  basicEffect: string;
  additionalEffectOne: string,
  additionalEffectTwo?: string,
  gagInOne: string,
  gagInTwo: string,
  gagInDecrease: string,
  imageSrc: string;
}

const equipArray:equipArrayType[] = [
  {
    reinforcementLevel: '+19',
    name: '차오른 몽환의 환각 모자',
    itemLevel: '1620',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '모자',
    quality: '95',
    setEffect: '환각 Lv.3',
    basicEffect: '물리 방어력 +5435\r\n마법 방어력+6039\r\n민첩 +35394\r\n체력 +5081',
    additionalEffects: '생명 활성력 +1264',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_160.png',
  },
  {
    reinforcementLevel: '+19',
    name: '차오른 몽환의 환각 견갑',
    itemLevel: '1620',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '어깨장식',
    quality: '90',
    setEffect: '환각 Lv.3',
    basicEffect: '물리 방어력 +6039\r\n마법 방어력+5435\r\n민첩 +37669\r\n체력 +4404',
    additionalEffects: '생명 활성력 +1134',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_161.png',
  },
  {
    reinforcementLevel: '+19',
    name: '차오른 몽환의 환각 상의',
    itemLevel: '1620',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '상의',
    quality: '82',
    setEffect: '환각 Lv.3',
    basicEffect: '물리 방어력 +7247\r\n마법 방어력+6643\r\n민첩 +28315\r\n체력 +6775',
    additionalEffects: '생명 활성력 +942',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_163.png',
  },
  {
    reinforcementLevel: '+19',
    name: '차오른 몽환의 환각 하의',
    itemLevel: '1620',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '하의',
    quality: '99',
    setEffect: '환각 Lv.3',
    basicEffect: '물리 방어력 +6643\r\n마법 방어력+7247\r\n민첩 +30591\r\n체력 +5758',
    additionalEffects: '생명 활성력 +1373',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_164.png',
  },
  {
    reinforcementLevel: '+19',
    name: '차오른 몽환의 환각 장갑',
    itemLevel: '1620',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '장갑',
    quality: '90',
    setEffect: '환각 Lv.3',
    basicEffect: '물리 방어력 +4831\r\n마법 방어력+4831\r\n민첩 +42473\r\n체력 +3388',
    additionalEffects: '생명 활성력 +1134',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_162.png',
  },
  {
    reinforcementLevel: '+23',
    name: '차오른 몽환의 환각 서브 머신건',
    itemLevel: '1640',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '무기',
    quality: '96',
    setEffect: '환각 Lv.3',
    basicEffect: '무기 공격력 +70036',
    additionalEffects: '추가 피해 +28%',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_165.png',
  }
];


const equipAccessoriesArray:equipAccessoriesArrayType[] = [
  {
    name: '참혹한 몰락의 귀걸이',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '귀걸이',
    quality: '91',
    basicEffect: '민첩 +9758\r\n체력 +2363',
    additionalEffectOne: '특화 +295',
    gagInOne: '아드레날린 +6',
    gagInTwo: '원한 +3',
    gagInDecrease: '공격속도 감소 +1',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_113.png',
  },
  {
    name: '거룩한 예언자의 귀걸이',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '귀걸이',
    quality: '81',
    basicEffect: '민첩 +9758\r\n체력 +2363',
    additionalEffectOne: '특화 +289',
    gagInOne: '진화의 유산 +6',
    gagInTwo: '돌격대장 +3',
    gagInDecrease: '이동속도 감소 +1',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_104.png',
  },
  {
    name: '참혹한 종말의 반지',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '반지',
    quality: '92',
    basicEffect: '민첩 +9061\r\n체력 +1890',
    additionalEffectOne: '특화 +197',
    gagInOne: '바리케이드 +6',
    gagInTwo: '예리한 둔기 +3',
    gagInDecrease: '방어력 감소 +1',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_20.png',
  },
  {
    name: '참혹한 종말의 반지',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '반지',
    quality: '90',
    basicEffect: '민첩 +9061\r\n체력 +1890',
    additionalEffectOne: '특화 +196',
    gagInOne: '돌격대장 +6',
    gagInTwo: '바리케이드 +3',
    gagInDecrease: '공격력 감소 +1',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_20.png',
  },
];
// 임시 값 종료


export default function AbilityTabEquipSection({ ArmoryEquipment, ArmoryEngraving, CharacterClassName }:AbilityTabEquipSectionProps) {
  const necklaceIndex = ArmoryEquipment?.findIndex(item => item.Type === '목걸이');
  const earringOneIndex = ArmoryEquipment?.findIndex(item => item.Type === '귀걸이');
  // const earringTwoIndex = ArmoryEquipment?.findIndex(item => item.Type === '귀걸이');
  let earringTwoIndex: number | undefined = undefined;
  if(earringOneIndex) {
    earringTwoIndex = ArmoryEquipment?.findIndex((item, index) => index > earringOneIndex && item.Type === '귀걸이');
  }
  const ringOneIndex = ArmoryEquipment?.findIndex(item => item.Type === '반지');
  // const ringTwoIndex = ArmoryEquipment?.findIndex(item => item.Type === '반지');
  let ringTwoIndex: number | undefined = undefined;
  if(ringOneIndex) {
    ringTwoIndex = ArmoryEquipment?.findIndex((item, index) => index > ringOneIndex && item.Type === '반지');
  }
  const braceletIndex = ArmoryEquipment?.findIndex(item => item.Type === '팔찌');
  const abilityStoneIndex = ArmoryEquipment?.findIndex(item => item.Type === '어빌리티 스톤');

  return (
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
      <div className='grid grid-cols-2 gap-x-3'>
        {/* 장비 정보 - 장비 */}
        <div>
          {equipArray.map((equip:equipArrayType, index:number) => {
            let divWrapStyle = 'relative flex items-center w-full gap-x-2 z-1 group/item';
            if(index > 0) {
              divWrapStyle += ' mt-3'
            }
            return (
            <div key={`${equip.equipmentType}_${index}`} className={divWrapStyle}>
              {/* 장비 이미지, 품질 */}
              <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                <Image src={equip.imageSrc} alt={equip.name} loading="lazy" width={50} height={50} decoding="async" />
                <div className="w-full h-4 text-center bg-[#f9ae00] dark:bg-[#eba70c]">
                  {/* 품질 */}
                  <p className='text-xs font-semibold text-white'>{equip.quality}</p>
                </div>
              </div>
              {/* 장비 정보 */}
              <div>
                {/* 초월 */}
                {index !== 5 &&
                <div className='flex items-center'>
                  <Image src={transcendance} alt='초월' width={16} height={16} />
                  <p className='text-sm font-semibold text-yellow-500 ml-0.5'>21</p>
                  <p className='text-[0.8rem] font-semibold ml-1'>7단계</p>
                </div>
                }
                {/* 강화, 장비이름 */}
                <p className='truncate text-[0.9rem] font-semibold text-[#D9AB48]'><span className='text-base'>{equip.reinforcementLevel}</span> {equip.name}</p>
                {/* 세트, 엘릭서 */}
                <div className='flex items-center'>
                  <p className='text-[0.7rem] leading-3 py-0.5 text-center font-semibold bg-[#e6e8ec] dark:bg-[#4b4e58] rounded-sm px-1.5'>{equip.setEffect.slice(0, 2)}<span className='text-[0.75rem]'>{equip.setEffect.slice(2)}</span></p>
                  <div className='gap-x-1.5 font-semibold ml-1.5 flex items-center'>
                    {index !== 5 ?
                    <>
                    <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>회심 (질서) <span className='text-[0.75rem]'>Lv.5</span></span>
                    <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>무력화 <span className='text-[0.75rem]'>Lv.3</span></span>
                    </>
                    :
                    <div className='flex items-center gap-x-1.5'>
                      <div className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>달인 2단계</div>
                      <div className='font-semibold text-white rounded-sm pl-0.5 pr-1 py-0.5 flex justify-center items-center gap-x-0.5 rounded-r-none last:rounded-r-sm text-xs leading-3 bg-[#2AB1F6]'>
                        <Image src={elixir} alt='엘릭서' width={12} height={12} />
                        <p className='flex items-end drop-shadow'>20.15%</p>
                      </div>
                    </div>
                    }
                  </div>
                </div>
                {/* 무기, 초월 합계 및 초월 증가 수치 */}
                {index === 5 &&
                <div className='flex items-center mt-1 w-fit font-semibold text-[0.75rem] leading-3 rounded-full px-1.5 py-0.5 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>
                  <Image src={transcendance} alt='초월' width={14} height={14} />
                  <p className='ml-1 font-semibold text-yellow-500'>합계 45</p>
                  <p className='ml-1.5 font-semibold dark:text-[#cacdd4]'>평균 3.0단계</p>
                  <p className='ml-1 font-semibold dark:text-[#cacdd4]'>+4.92%</p>
                </div>
                }
              </div>
              {/* 장비 Hover */}
              <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <p className='truncate text-[0.9rem] font-semibold text-[#D9AB48] mb-2'><span className='text-base'>{equip.reinforcementLevel}</span> {equip.name}</p>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                    <Image src={equip.imageSrc} alt={equip.name} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='ml-1 w-full h-auto flex flex-col justify-around'>
                    <div className='text-xs font-semibold flex items-center'>
                      <span className='text-[#D9AB48]'>{equip.rating} {equip.equipmentType}</span>
                      <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                      <span className='pb-[1px]'>{equip.itemLevel}</span>
                      <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                      <span className=''>{equip.tear}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-[0.85rem] font-semibold text-[#D9AB48] mr-2'>{equip.quality}</span>
                      <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                        <div className={`rounded-r-sm h-[9px] mt-[2px] bg-[#f9ae00] dark:bg-[#eba70c] absolute bottom-0`} style={{width: `${equip.quality}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 장비 Hover 기본 효과 */}
                <div className='mt-4 w-full'>
                  <pre className='text-[0.75rem] leading-5 font-semibold'>{equip.basicEffect}</pre>
                </div>
                {/* 장비 Hover 추가 효과 */}
                <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
                <div className='w-full'>
                  <p className='text-[0.8rem] leading-5 font-semibold'>{equip.additionalEffects}</p>
                </div>
                {/* 장비 세트 효과 */}
                <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
                <div className='w-full'>
                  <p className='text-[0.8rem] leading-5 font-semibold'>{equip.setEffect}</p>
                </div>
              </div>
            </div>
          )})}
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
          {ArmoryEquipment !== undefined && necklaceIndex !== undefined && necklaceIndex > 0 ?
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
          {ArmoryEquipment !== undefined && braceletIndex !== undefined && braceletIndex > 0 ?
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
                    <span key={`${effect[0]}_${index}`} className={'rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] mr-1.5'}>{`${effect[0]}`}</span>
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
            {ArmoryEquipment !== undefined && abilityStoneIndex !== undefined && abilityStoneIndex > 0 ?
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
                        return <span key={`${armoryEquipmentPoint.Name}_${index}`} className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>{`${armoryEquipmentPoint.Name} ${armoryEquipmentPoint.Value}`}</span>
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
