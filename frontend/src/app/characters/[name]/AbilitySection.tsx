'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ArmoryCard, ArmoryEquipment, Stat, CardEffect, Effect } from './CharacterResponseType'

import UpArrowSvg from '@/components/UI/UpArrowSvg'
import transcendance from '@/assets/Icon/transcendance.svg'
import elixir from '@/assets/Icon/elixir.svg'

import CardGrade from '@/assets/Card/imgCardGrade.webp'
import CardAwake from '@/assets/Card/imgCardAwake.webp'

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

type equipAccessorieBraceletType = {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  basicEffectArray: string[];
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
    name: '참혹한 파멸의 목걸이',
    tear: '티어 3',
    rating: '고대',
    equipmentType: '목걸이',
    quality: '92',
    basicEffect: '민첩 +12546\r\n체력 +3308',
    additionalEffectOne: '치명 +493',
    additionalEffectTwo: '특화 +491',
    gagInOne: '돌격대장 +6',
    gagInTwo: '바리케이드 +3',
    gagInDecrease: '공격력 감소 +2',
    imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_213.png',
  },
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

const equipAccessorieBracelet:equipAccessorieBraceletType = {
  name: '찬란한 영웅의 팔찌',
  tear: '티어 3',
  rating: '고대',
  equipmentType: '팔찌',
  basicEffectArray: ['치명 +100', '특화 +97', '민첩 +3400', '정밀 하'],
  imageSrc: 'https://pica.korlark.com/efui_iconatlas/acc/acc_304.png',
}

type accessorieBraceletDescriptionType = {
  [key:string]: string;
}

const accessorieBraceletDescription:accessorieBraceletDescriptionType = {
  '정밀': "몬스터에게 공격 적중 시 치명타 적중이 3% 증가한다. (60레벨 초과 몬스터에게는 효과 감소)",
  '습격': "몬스터에게 공격 적중 시 치명타 피해량이 6% 증가한다. (60레벨 초과 몬스터에게는 효과 감소)",
  '우월': "몬스터에게 공격 적중 시 주는 피해가 3% 증가한다. (60레벨 초과 몬스터에게는 효과 감소)",
  '열정': "자신의 생명력이 40% 이상일 경우 적에게 공격 적중 시 3초 동안 '열정' 효과를 획득한다. '냉정' 효과를 보유 중 일 때 '열정' 효과가 1% 추가 증가한다. 열정 : 몬스터에게 주는 피해가 3% 증가한다. (60레벨 초과 몬스터에게는 효과 감소)"
}


const transformSetString = (input:string, isTitle:boolean) => {
  // const regex = /(\d+)세트 \((\d+)각성합계\)/g;
  // const matches = input.match(regex);

  const regex = /(\d+)세트(?: \((\d+)각성합계\))?/g;
  const matches = input.match(regex);
  if(matches !== null) {
    if(isTitle) {
      return matches[0].replace(regex, (match, set, awakening) => {
        if (awakening) {
          return awakening + '각';
        } else {
          return set + '세트';
        }
      });
    } else {
      return matches[0].replace(regex, (match, set, awakening) => {
        if (awakening) {
          return awakening + '각성';
        } else {
          return set + '세트';
        }
      });
    }
  }
}

const findValueInText = (str:string) => {
  // 정규 표현식을 사용하여 숫자를 찾습니다.
  const regex = /<font color='#99ff99'>(\d+)<\/font>/;
  const match = str.match(regex);
  // 매치된 값이 있다면 반환하고, 없으면 null을 반환합니다.
  return match ? parseInt(match[1], 10).toLocaleString() : null;
}

interface AbilitySection {
  ArmoryEquipment?: ArmoryEquipment[]
  ArmoryProfileStats?: Stat[]
  ArmoryCard?: ArmoryCard
}

export default function AbilitySection({ ArmoryEquipment, ArmoryProfileStats, ArmoryCard }:AbilitySection) {
  const cardArrayCount = [0,1,2,3,4,5];
  const jewelCount = [0,1,2,3,4,5,6,7,8,9,10];
  const gagInCount = [0,1,2,3,4,5];
  const equipGagInCount = [0,1,2];
  const ArmoryProfileStatsCloenOne = ArmoryProfileStats !== undefined ? ArmoryProfileStats.slice(0, 3) : [];
  const ArmoryProfileStatsCloenTwo = ArmoryProfileStats !== undefined ? ArmoryProfileStats.slice(3, 6) : [];
  const [statusMaxValue, setStatusMaxValue] = useState(['치명', '치명']);
  const [statusSum, setStatusSum] = useState(0);

  useEffect(() => {
    if(ArmoryProfileStats !== undefined) {
      const sortedData = ArmoryProfileStats.slice(0, 6).sort((a, b) => parseInt(b.Value) - parseInt(a.Value));

      let sum = 0;
      sortedData.forEach((data) => {
        sum += Number(data.Value);
      });
      setStatusSum(sum);
      setStatusMaxValue([sortedData[0].Type, sortedData[1].Type]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
            <div key={equip.equipmentType} className={divWrapStyle}>
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
          {/* 각인 1 */}
          <div className='h-[50px] px-0.5 grid grid-cols-2 items-center mt-3'>
            <div className='relative group/item'>
              <div className='flex items-center text-left h-11 gap-x-3'>
                <Image src={'https://pica.korlark.com/efui_iconatlas/buff/buff_71.png'} alt='원한' width={44} height={44} decoding="async" className='rounded-full drop-shadow' />
                <div>
                  <p className='text-sm font-semibold'>원한</p>
                  <p className='text-[0.7rem] font-semibold mt-0.5'>활성 포인트 +12</p>
                </div>
              </div>
              {/* 각인 1 Hover */}
              <div className='absolute z-10 opacity-98 w-[260px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' >
                    <Image src={'https://pica.korlark.com/efui_iconatlas/buff/buff_71.png'} alt={'원한'} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='w-full ml-3'>
                    <p className='text-base font-bold'>원한</p>
                    <p className='text-[0.7rem] font-semibold text-[#7d8395] mt-0.5 pl-0.5'>활성 포인트 +12</p>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                {equipGagInCount.map((el:number) => (
                  <div key={el} className='w-full mt-3'>
                    <p className='text-[0.9rem] font-bold leading-6'>레벨 {el} (활설도 {el*5})</p>
                    <p className='text-[0.85rem] font-semibold leading-5'>보스 등급 이상 몬스터에게 주는 피해가 {el === 1 ? 4 : el === 2 ? 10 : 20}% 증가하지만, 받는 피해가 20% 증가한다.</p>
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* 각인 2 */}
            <div className='relative group/item'>
              <div className='flex items-center text-left h-11 gap-x-3'>
                <Image src={'https://pica.korlark.com/efui_iconatlas/achieve/achieve_03_40.png'} alt='예리한 둔기' width={44} height={44} decoding="async" className='rounded-full drop-shadow' />
                <div>
                  <p className='text-sm font-semibold'>예리한 둔기</p>
                  <p className='text-[0.7rem] font-semibold mt-0.5'>활성 포인트 +12</p>
                </div>
              </div>
              {/* 각인 2 Hover */}
              <div className='absolute z-10 opacity-98 w-[260px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' >
                    <Image src={'https://pica.korlark.com/efui_iconatlas/achieve/achieve_03_40.png'} alt='예리한 둔기' loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='w-full ml-3'>
                    <p className='text-base font-bold'>예리한 둔기</p>
                    <p className='text-[0.7rem] font-semibold text-[#7d8395] mt-0.5 pl-0.5'>활성 포인트 +12</p>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                {equipGagInCount.map((el:number) => (
                  <div key={el} className='w-full mt-3'>
                    <p className='text-[0.9rem] font-bold leading-6'>레벨 {el} (활설도 {el*5})</p>
                    <p className='text-[0.85rem] font-semibold leading-5'>치명타 피해량이 {el === 1 ? 10 : el === 2 ? 25 : 50}% 증가하지만, 공격시 일정 확률로 20% 감소된 피해를 준다.</p>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 장비 정보 - 악세 */}
        <div>
        {equipAccessoriesArray.map((accessorie:equipAccessoriesArrayType, index:number) => {
          let divWrapStyle = 'flex items-center w-full gap-x-2 relative group/item';
          if(index > 0) {
            divWrapStyle += ' mt-3'
          }
          return (
          <div key={index} className={divWrapStyle}>
            {/* 악세 사진 */}
            <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
              <Image src={accessorie.imageSrc} alt={accessorie.name} width={50} height={50} loading="lazy" decoding="async" />
              <div className='class="w-full h-4 text-center bg-[#8045dd]'>
                <p className='text-xs font-semibold text-white'>{accessorie.quality}</p>
              </div>
            </div>
            {/* 악세 정보 */}
            <div>
              <p className='truncate text-[0.9rem] leading-4 font-semibold text-[#D9AB48]'>{accessorie.name}</p>
              <p className='text-sm font-semibold mt-0.5'>
                <span>{accessorie.additionalEffectOne.replace('+', '')}</span>
                {accessorie.additionalEffectTwo && <span className='ml-1.5'>{accessorie.additionalEffectTwo.replace('+', '')}</span>}
              </p>
              <p className='text-sm font-semibold mt-0.5'>
                <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{accessorie.gagInOne.replace('+', '')}</span>
                <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] ml-1.5'>{accessorie.gagInTwo.replace('+', '')}</span>
                <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>{accessorie.gagInDecrease.replace('+', '')}</span>
              </p>
            </div>
            {/* 악세 Hover */}
            <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
              <p className='truncate text-[0.95rem] font-semibold text-[#D9AB48] mb-2'>{accessorie.name}</p>
              <div className='flex w-full'>
                <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                  <Image src={accessorie.imageSrc} alt={accessorie.name} loading="lazy" width={44} height={44} decoding="async" />
                </div>
                <div className='ml-1 w-full h-auto flex flex-col justify-around'>
                  <div className='text-xs font-semibold flex items-center'>
                    <span className='text-[#D9AB48]'>{accessorie.rating} {accessorie.equipmentType}</span>
                    <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                    <span className=''>{accessorie.tear}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-[0.85rem] font-semibold text-[#D9AB48] mr-2'>{accessorie.quality}</span>
                    <div className="w-full h-[9px] mt-[2px] bg-[#4d4f55] dark:bg-[#e6e8ec] relative">
                      <div className={`rounded-r-sm h-[9px] mt-[2px] bg-[#f9ae00] dark:bg-[#eba70c] absolute bottom-0`} style={{width: `${accessorie.quality}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 악세 Hover 기본 효과 */}
              <div className='mt-4 w-full'>
                <pre className='text-[0.78rem] leading-5 font-semibold'>{accessorie.basicEffect}</pre>
              </div>
              {/* 악세 Hover 특성 효과 */}
              <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
              <div className='w-full'>
                <p className='text-[0.8rem] leading-5 font-semibold'>{accessorie.additionalEffectOne}</p>
                {accessorie.additionalEffectTwo && <p className='text-[0.8rem] leading-5 font-semibold'>{accessorie.additionalEffectTwo}</p>}
              </div>
              {/* 악세 각인 효과 */}
              <div className='w-full mt-4'>
                <p className='text-[0.8rem] leading-5 font-semibold'>{accessorie.gagInOne}</p>
                <p className='text-[0.8rem] leading-5 font-semibold my-[2px]'>{accessorie.gagInTwo}</p>
                <p className='text-[0.8rem] leading-5 font-semibold text-[#f95126]'>{accessorie.gagInDecrease}</p>
              </div>
            </div>
          </div>
          )
          })}
          {/* 팔찌 */}
          <div className='flex items-center w-full gap-x-2 mt-3 relative group/item'>
            {/* 팔찌 사진 */}
            <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
              <Image src={equipAccessorieBracelet.imageSrc} alt={equipAccessorieBracelet.name} width={50} height={50} loading="lazy" decoding="async" />
              <div className='class="w-full h-4 text-center bg-[#8045dd]'>
                <p className='text-xs font-semibold text-white'>9.64%</p>
              </div>
            </div>
            {/* 팔찌 정보 */}
            <div>
              <p className='truncate text-[0.9rem] leading-4 font-semibold text-[#D9AB48]'>{equipAccessorieBracelet.name}</p>
              <p className='text-sm font-semibold mt-0.5'>
                <span>{equipAccessorieBracelet.basicEffectArray[0].replace('+', '')}</span>
                {equipAccessorieBracelet.basicEffectArray[1] && <span className='ml-1.5'>{equipAccessorieBracelet.basicEffectArray[1].replace('+', '')}</span>}
              </p>
              {/* 팔찌 특옵 */}
              <p className='text-sm font-semibold mt-0.5'>
                {equipAccessorieBracelet.basicEffectArray[2] && <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{equipAccessorieBracelet.basicEffectArray[2].slice(0, equipAccessorieBracelet.basicEffectArray[2].indexOf(' '))}</span>}
                {equipAccessorieBracelet.basicEffectArray[3] && <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] ml-1.5'>{equipAccessorieBracelet.basicEffectArray[3].slice(0, equipAccessorieBracelet.basicEffectArray[3].indexOf(' '))}</span>}
                {equipAccessorieBracelet.basicEffectArray[4] && <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>{equipAccessorieBracelet.basicEffectArray[4].slice(0, equipAccessorieBracelet.basicEffectArray[4].indexOf(' '))}</span>}
              </p>
            </div>
            {/* 팔찌 Hover */}
            <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
              <p className='truncate text-[0.95rem] font-semibold text-[#D9AB48] mb-2'>{equipAccessorieBracelet.name}</p>
              <div className='flex w-full'>
                <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                  <Image src={equipAccessorieBracelet.imageSrc} alt={'준엄한 비상의 돌 IV'} loading="lazy" width={44} height={44} decoding="async" />
                </div>
                <div className='ml-1 w-full h-auto flex flex-col justify-evenly'>
                  <div className='text-xs font-semibold flex items-center'>
                    <span className='text-[#D9AB48]'>{equipAccessorieBracelet.rating} {equipAccessorieBracelet.equipmentType}</span>
                    <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                    <span className=''>티어 3</span>
                  </div>
                  <div className='flex items-center ml-[2px]'>
                    <div className="w-full flex items-center font-semibold text-xs">
                      {equipAccessorieBracelet.basicEffectArray.map((basicEffect:string, index:number) => {
                        if(index === 0) {
                          return (
                            <Fragment key={index}>
                            <span>{basicEffect.slice(0, basicEffect.indexOf(' '))}</span>
                            </Fragment>
                          )
                        }
                        return (
                        <Fragment key={index}>
                        <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mx-[4px]'></div>
                        <span>{basicEffect.slice(0, basicEffect.indexOf(' '))}</span>
                        </Fragment>)
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* 팔찌 옵션 */}
              <div className='w-full mt-4'>
                {equipAccessorieBracelet.basicEffectArray.map((basicEffect:string, index:number) => (
                  <div key={index} className='flex flex-col my-[4px]'>
                    <div className='flex items-center'>
                      <span className='text-[0.8rem] leading-5 font-bold '>{basicEffect}</span>
                      <span className="text-[0.8rem] font-bold leading-5 ml-2 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center">2.68%</span>
                    </div>
                    {accessorieBraceletDescription[basicEffect.slice(0, basicEffect.indexOf(' '))] && <p className='text-[0.8rem] leading-5 font-bold my-[4px]'>{accessorieBraceletDescription[basicEffect.slice(0, basicEffect.indexOf(' '))]}</p>}
                  </div>
                )
                )}
              </div>
            </div>
          </div>
          {/* 어빌리티 스톤 (돌) */}
          <div className='flex'>
            <div className='flex items-center text-left gap-x-2 mt-3 relative group/item'>
              <div className='w-[50px] h-[50px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                <Image src={'https://pica.korlark.com/efui_iconatlas/ability/ability_257.png'} alt='준엄한 비상의 돌 IV' width={50} height={50} decoding="async" />
              </div>
              <div>
                <p className='text-[0.9rem] font-semibold leading-4 text-[#D9AB48]'>준엄한 비상의 돌 IV</p>
                <p className='mt-1'>
                  <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>바리케이드 4</span>
                  <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] ml-1.5'>아드레날린 9</span>
                  <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>공격속도 감소 3</span>
                </p>
              </div>
              {/* 어빌리티 스톤 (돌) Hover */}
              <div className='absolute top-0 z-10 opacity-98 w-[270px] flex flex-col justify-center items-center p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[20%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <p className='truncate text-[0.95rem] font-semibold text-[#D9AB48] mb-2'>준엄한 비상의 돌 IV</p>
                <div className='flex w-full'>
                  <div className='w-[45px] h-[45px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                    <Image src={'https://pica.korlark.com/efui_iconatlas/ability/ability_257.png'} alt={'준엄한 비상의 돌 IV'} loading="lazy" width={44} height={44} decoding="async" />
                  </div>
                  <div className='ml-1 w-full h-auto flex flex-col justify-evenly'>
                    <div className='text-xs font-semibold flex items-center'>
                      <span className='text-[#D9AB48]'>고대 어빌리티 스톤</span>
                      <div className="mx-1 w-[2px] h-[11px] bg-[#4d4f55] dark:bg-[#e6e8ec]"></div>
                      <span className=''>티어 3</span>
                    </div>
                    <div className='flex items-center ml-[2px]'>
                      <div className="w-full flex items-center">
                        <span className='text-[0.85rem] font-semibold'>4</span>
                        <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mt-[3px] mx-[6px]'></div>
                        <span className='text-[0.85rem] font-semibold'>9</span>
                        <div className='w-[3px] h-[3px] rounded-full bg-[#7d8395] mt-[3px] mx-[6px]'></div>
                        <span className='text-[0.85rem] font-semibold text-[#f95126]'>3</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 돌 체력 */}
                <div className='w-full mt-4'>
                  <p className='text-sm font-bold'>체력 +21326</p>
                </div>
                <hr className="w-full h-[1px] my-4 dark:border-[#4d4f55]" />
                {/* 돌 옵션 */}
                <div className='w-full'>
                  <p className='text-[0.8rem] leading-5 font-bold'>바리케이드 +4</p>
                  <p className='text-[0.8rem] leading-5 font-bold my-[2px]'>아드레날린 +9</p>
                  <p className='text-[0.8rem] leading-5 font-bold text-[#f95126]'>공격속도 감소 +3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* 보석 정보 */}
    <div className='px-[17px] pt-4 pb-2 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
      <div className='grid grid-cols-11 gap-x-4 place-items-center'>
        {jewelCount.map((jewel:number) => (
          <div key={jewel} className='relative w-[44px] h-[44px] rounded-md group/item' style={{background: `linear-gradient(135deg, #3b1303, #a23405)`}}>
            <Image src={'https://pica.korlark.com/efui_iconatlas/use/use_9_55.png'} alt='jewel' width={44} height={44} decoding='async' />
            <div className='absolute bottom-0 right-0 w-4 h-4 rounded-[4px] rounded-tr-md bg-white dark:bg-[#33353a] opacity-90 flex justify-center items-center'>
              <p className='text-[11px] text-[#FF6000] dark:text-[#ff9e63] font-medium'>10</p>
            </div>
            <div className='absolute mt-1 w-max flex flex-col justify-center items-center p-2 rounded-[8px] bg-white dark:bg-[#33353a] left-1/2 translate-x-[-50%] invisible group-hover/item:visible shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]' >
              <p className='font-bold text-[0.8rem]'>싱크 스킬</p>
              <p className='font-semibold text-[0.7rem] mt-1'>피해 40% 증가</p>
            </div>
          </div>
        )
        )}
      </div>
      <div className='grid grid-cols-11 mt-2 gap-x-4'>
        <div className='flex items-center px-2 gap-x-2 col-span-6'>
          <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
          <p className='text-sm font-semibold text-black shrink-0 dark:text-inherit'>멸화 6</p>
          <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
        </div>
        <div className='flex items-center px-2 gap-x-2 col-span-5'>
          <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
          <p className='text-sm font-semibold text-black shrink-0 dark:text-inherit'>홍염 5</p>
          <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
        </div>
      </div>
    </div>
    {/* 특성, 각인 정보 */}
    <div className='flex gap-x-6'>
      {/* 특성 */}
      <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
        <div className='class="flex flex-col justify-between'>
          {/* 기본 특성 */}
          <div>
            <div className='flex justify-between items-center'>
              <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                <p className='text-sm font-bold text-[#8045dd]'>기본 특성</p>
              </div>
              <hr className='grow ml-3 border-basicGrey dark:border-[#7d8395]' />
            </div>
            <div className='mt-4 text-sm leading-[17px] pl-1'>
              <div className='flex justify-between'>
                <p className='text-[#7d8395]'>공격력</p>
                <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && Number(ArmoryProfileStats[7].Value).toLocaleString()}</p>
              </div>
              <div className='flex justify-between text-sm mt-2.5'>
                <p className='text-[#7d8395]'>
                  <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1 border-[#7d8395]'></span>기본</>
                </p>
                <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && findValueInText(ArmoryProfileStats[7].Tooltip[1])}</p>
              </div>
              <div className='flex justify-between text-sm mt-0.5'>
                <p className='text-[#7d8395]'>
                  <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1  border-[#7d8395]'></span>효과</>
                </p>
                <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && findValueInText(ArmoryProfileStats[7].Tooltip[2])}</p>
              </div>
              <div className='flex justify-between mt-3'>
                <p className='text-[#7d8395]'>최대 생명력</p>
                <p className="font-semibold text-[#353945] dark:text-inherit">{ArmoryProfileStats !== undefined && Number(ArmoryProfileStats[6].Value).toLocaleString()}</p>
              </div>
            </div>
          </div>
          {/* 전투 특성 */}
          <div className='mt-7'>
            <div className='flex justify-between items-center'>
              <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                <p className='text-sm font-bold text-[#8045dd]'>전투 특성</p>
              </div>
              <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
              <p className='text-sm font-semibold'>합계 {statusSum}</p>
            </div>
            <div className='mt-4 pl-1'>
              <div className='space-y-2.5 text-[0.925rem] items-between'>
                {/* 가장 높은 값: #8045dd, 2번쨰 높은 값: 5865f2 */}
                {/* 치특신 */}
                <div className='flex justify-between'>
                  {ArmoryProfileStatsCloenOne.map((status:Stat, index:number) => {
                    const valueStyle = status.Type === statusMaxValue[0] ? 'font-semibold text-[#8045dd] dark:text-[#a36bfc]' : status.Type === statusMaxValue[1] ? 'font-semibold text-[#5865f2] dark:text-[#8991ee]' : 'font-semibold text-[#353945] dark:text-inherit';
                    return (
                      <div className='flex justify-between max-w-[75px] w-full' key={index}>
                        <p className='text-[#7d8395]'>{status.Type}</p>
                        <p className={valueStyle}>{status.Value}</p>
                      </div>
                      )
                  })}
                </div>
                {/* 제인숙 */}
                <div className='flex justify-between'>
                  {ArmoryProfileStatsCloenTwo.map((status:Stat, index:number) => {
                    const valueStyle = status.Type === statusMaxValue[0] ? 'font-semibold text-[#8045dd] dark:text-[#a36bfc]' : status.Type === statusMaxValue[1] ? 'font-semibold text-[#5865f2] dark:text-[#8991ee]' : 'font-semibold text-[#353945] dark:text-inherit';
                    return (
                      <div className='flex justify-between max-w-[75px] w-full' key={index}>
                        <p className='text-[#7d8395]'>{status.Type}</p>
                        <p className={valueStyle}>{status.Value}</p>
                      </div>
                      )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 각인 */}
      <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] flex flex-col'>
        <div className='shrink-0 flex justify-between items-center'>
          <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
            <p className='text-sm font-bold text-[#8045dd]'>각인</p>
          </div>
          <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
          <p className='font-semibold'>
            <span className='text-[#8045dd] dark:text-[#a36bfc]'>33333</span>
            <span className='text-[#5865f2] dark:text-[#8991ee]'>2</span>
            <span className='text-warning'></span>
          </p>
        </div>
        <div className='mt-4 pl-1 grow flex flex-col justify-between gap-y-2 overflow-y-auto'>
          {/* 각인 사진 */}
          {gagInCount.map((gagIn:number) => (
            <div key={gagIn} className='flex items-center gap-x-3 group/item'>
              <Image src={'https://pica.korlark.com/EFUI_IconAtlas/buff/buff_71.png'} alt='gagIn' decoding="async" className='rounded-full bg-[#e6e8ec]' width={31} height={31} />
              <p className='text-lg font-semibold'>
                <span className='text-[#7d8395]'>Lv.</span>
                <span>3 원한</span>
              </p>
              <div className='absolute z-1 opacity-95 w-max max-w-[260px] flex flex-col justify-center items-baseline p-4 rounded-[8px] bg-white dark:bg-[#33353a] translate-x-[18%] invisible group-hover/item:visible shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]'>
                <p className='font-bold text-[0.9rem]'>원한 Lv.3</p>
                <p className='font-semibold text-[0.8rem] mt-[12px]'>보스 등급 이상 몬스터에게 주는 피해가 20% 증가하지만, 받는 피해가 20% 증가한다.</p>
                {/* <p className='font-semibold text-[0.8rem] mt-[12px]'>하이퍼 싱크 모드 중 싱크 스킬이 적중했을 시 피해량이 2% 증가하는 효과를 획득하며 (최대 3중첩) 이동기 및 기상기를 제외한 다른 싱크 스킬들의 재사용 대기시간이 0.5초씩 감소한다.<br />또한 하이퍼 싱크 모드에 진입 시 싱크 스킬들의 재사용 대기시간이 초기화되며 하이퍼 싱크 모드가 해제될 시 소모한 코어 에너지의 40%를 돌려받는다.</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* 카드 정보 */}
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
      <Disclosure as={Fragment}>
        {({ open }) => (
          <>
          <Disclosure.Button className='w-full'>
            <div className='flex justify-between items-center'>
              <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                <p className='text-sm font-bold text-[#8045dd]'>카드</p>
              </div>
              <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
              <div className='flex items-center space-x-1.5'>
                <p className='font-semibold whitespace-pre overflow-hidden max-w-[500px] text-ellipsis'>
                  {ArmoryCard !== undefined && ArmoryCard?.Effects?.map((CardEffect:CardEffect, index:number) => {
                    return (
                    <Fragment key={index}>
                    {index > 0 && ' · '}
                    {CardEffect.Items[CardEffect.Items.length - 1].Name.replace(/\d세트(?: \(\d+각성합계\))?/g, '').trim()}&nbsp;
                    <span className='text-[#8045dd] dark:text-[#a36bfc]'>{transformSetString(CardEffect.Items[CardEffect.Items.length - 1].Name, true)}</span>
                    </Fragment>
                  )})}
                </p>
                <UpArrowSvg isOpen={open} classNameDefault={'w-5 h-5 transition-transform duration-100'} classNameOpen={'rotate-180'} classNameClose={'rotate-0'} />
              </div>
            </div>
            <div className='mt-3 grid grid-cols-6 gap-x-3'>
              {cardArrayCount.map((index:number) => {
                if(ArmoryCard !== undefined && ArmoryCard.Cards[index]) {
                  const positionXValue = ArmoryCard.Cards[index].Grade === '일반' ? '0%' : ArmoryCard.Cards[index].Grade === '고급' ? '20.1%' : ArmoryCard.Cards[index].Grade === '희귀' ? '40.2%' : ArmoryCard.Cards[index].Grade === '영웅' ? '60.29%' : '80.4%';
                  return (
                    <div className='w-full' key={index}>
                      <div className='relative aspect-[248/362] -mr-1'>
                        <div className='absolute inset-0 pl-[1.8%] pr-[4.2%] pt-[5.2%]'>
                          <Image alt={ArmoryCard.Cards[index].Name} width={248} height={362} decoding="async" data-nimg="1" src={ArmoryCard.Cards[index].Icon} />
                        </div>
                        {/* 카드 등급에 따라 bg postion 값이 달라짐 (X 값) */}
                        <div className={`absolute inset-0 bg-cover aspect-[248/362]`}
                          style={{backgroundPositionX: positionXValue, backgroundPositionY: 'top', backgroundImage: `url('${CardGrade.src}')`}}></div>
                        <div className='absolute bottom-[6.5%] left-[5%] right-[7.5%] overflow-hidden'>
                          {/* Left를 이용하여 1,2,3,4,5 각 그림 표시 */}
                          <div className='relative bg-cover aspect-[10/3] drop-shadow-xl' style={{backgroundImage: `url('${CardAwake.src}')`}}>
                            <div className={`absolute top-0 bottom-0 w-full bg-bottom bg-cover left-[${ArmoryCard.Cards[index].AwakeCount*20 -100}%]`} style={{backgroundImage: `url('${CardAwake.src}')`}}></div>
                          </div>
                        </div>
                      </div>
                      <p className='mt-[6px] -mb-2 px-1 w-full text-center text-xs font-semibold select-text break-keep'>{ArmoryCard.Cards[index].Name}</p>
                    </div>
                  )
                } else {
                  return (
                    <div key={index} className='w-full mt-0.5 aspect-[248/375] bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-md'></div>
                  )
                }
              })}
            </div>
          </Disclosure.Button>
            <Disclosure.Panel className="mt-4 transform scale-100 opacity-100">
              <div className={ArmoryCard === undefined ? 'grid gap-3 grid-cols-1' : ArmoryCard?.Effects?.length >= 2 ? 'grid gap-3 grid-cols-2' : 'grid gap-3 grid-cols-1'}>
                {/* 카드 종류에 따라 div 태그 추가 */}
                {ArmoryCard !== undefined && ArmoryCard?.Effects?.map((Effect:CardEffect, index:number) => (
                <div className='px-[17px] py-4 bg-[#f5f6f7] dark:bg-[#2b2d31] rounded-xl' key={index}>
                  <p className='font-semibold'>{Effect.Items[Effect.Items.length - 1].Name.replace(/\d세트(?: \(\d+각성합계\))?/g, '').trim()}</p>
                  <div className='mt-3 space-y-2'>
                    {/* 같은 종류 카드에서 효과 리스트 */}
                    {Effect.Items.map((item:Effect, index:number) => (
                      <div className='flex' key={`${index}_${item.Name}`}>
                        <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>{transformSetString(item.Name, false)}</span>
                        <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>{item.Description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
    </>
  )
}
