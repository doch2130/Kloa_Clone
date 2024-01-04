'use client'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ArmoryCard, CardEffect, Effect } from './CharacterResponseType'

import UpArrowSvg from '@/components/UI/UpArrowSvg'
import CardGrade from '@/assets/Card/imgCardGrade.webp'
import CardAwake from '@/assets/Card/imgCardAwake.webp'

interface AbilityTapCardSectionProps {
  ArmoryCard?: ArmoryCard
}

const transformSetString = (input:string, isTitle:boolean) => {
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

export default function AbilityTapCardSection({ ArmoryCard }:AbilityTapCardSectionProps) {
  return (
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
              {[0,1,2,3,4,5].map((index:number) => {
                if(ArmoryCard !== undefined && ArmoryCard?.Cards[index]) {
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
  )
}
