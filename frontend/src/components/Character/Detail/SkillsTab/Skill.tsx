import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'

import { ArmorySkill, Gem } from '@/types/characters'
import { itemGradeStyleBackground } from '@/app/characters/[name]/utils'

type SkillProps = {
  skill: ArmorySkill
  Gem?: Gem[]
}

export default function Skill({ skill, Gem }:SkillProps) {
  let isSelectedCheck = false;
  let gemOfDestruction:Gem[] = [];
  let gemOfRedFlame:Gem[] = [];

  if(Gem !== undefined) {
    if(skill.SkillType === '싱크 스킬' || skill.SkillType === '악마 스킬') {
      gemOfDestruction = Gem?.filter((el) => el.SkilName === skill.SkillType && el.Type === '멸화');
      gemOfRedFlame = Gem?.filter((el) => el.SkilName === skill.SkillType && el.Type === '홍염');
    } else if(skill.SkillType === '포격 모드') {
      gemOfDestruction = Gem?.filter((el) => el.SkilName === '포격 스킬' && el.Type === '멸화');
      gemOfRedFlame = Gem?.filter((el) => el.SkilName === '포격 스킬' && el.Type === '홍염');
    } else {
      gemOfDestruction = Gem?.filter((el) => el.SkilName === skill.Name && el.Type === '멸화');
      gemOfRedFlame = Gem?.filter((el) => el.SkilName === skill.Name && el.Type === '홍염');
    }
  }

  return (
    <div className='py-3 first:pt-0 last:pb-0 border-b last:border-b-0 border-[#f5f6f7] dark:border-[#4d4f55]'>
      <div className='flex items-center'>
        <div className='w-[200px] flex items-center gap-x-1.5 text-left'>
          <Image alt={skill.Name} loading='lazy' width='40' height='40' decoding='async' className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-lg' src={skill.Icon} />
          <div className='grow pr-1'>
            <div className='flex items-center justify-between gap-x-1'>
              <p className='font-base text-[13px] leading-[13px] text-[#D9AB48]'>{skill.Level}레벨</p>
              <div className='flex gap-x-1 h-[19px]'>
                {skill.SkillAttributes?.['무력화'] !== '' && <p className='rounded-full px-1 py-[3px] font-semibold text-[10px] leading-[10px] border dark:border-[#cacdd4] dark:text-[#cacdd4]'>무력 {skill.SkillAttributes?.['무력화']}</p>}
                {skill.SkillAttributes?.['부위 파괴'] !== '' && <p className='rounded-full px-1 py-[3px] font-semibold text-[10px] leading-[10px] border dark:border-[#cacdd4] dark:text-[#cacdd4]'>부파 {skill.SkillAttributes?.['부위 파괴'].slice(-1)}</p>}
              </div>
            </div>
            <p className='mt-0.5 font-semibold text-sm text-[#353945] dark:text-white'>{skill.Name}</p>
          </div>
        </div>
        <div className='ml-1 mr-4'>
          <svg xmlns='http://www.w3.org/2000/svg' width='2' height='40' viewBox='0 0 2 40'>
            <line id='characters_skill_dash' y2='40' transform='translate(1)' fill='none' stroke='#e6e8ec' strokeWidth='2' strokeDasharray='2 4'></line>
          </svg>
        </div>
        <div className='grid grid-cols-3 gap-x-2.5 mr-2.5'>
          {skill.Tripods?.map((tripod, tripodIndex:number) => {
            if(tripod.IsSelected) {
              const tripodTierColor = ['before:bg-[#47ABD9]', 'before:bg-[#8DC80E]', 'before:bg-[#FFB000]'];
              isSelectedCheck = true;
              return (
                <div className='flex items-center gap-x-2 text-left w-[124px]' key={`${tripod.Name}_${tripodIndex}`}>
                  <div className='relative shrink-0'>
                    <Image alt={tripod.Name} loading='lazy' width='32' height='32' decoding='async' className='rounded-full drop-shadow w-8 h-8' src={tripod.Icon} />
                    <div className='absolute -bottom-1 -right-1 drop-shadow-lg'>
                      <div className={`w-5 h-5 relative flex items-center justify-center before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:m-auto before:w-[14px] before:h-[14px] before:rounded-[2px] before:rotate-45 ${tripodTierColor[tripod.Tier]}`}>
                        <p className='absolute text-[11px] text-white'>{tripod.Slot}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center shrink font-semibold text-[#353945] dark:text-white'>
                    <p className='text-[13px] truncate'>{tripod.Name}</p>
                    <p className='text-xs leading-3'>Lv.{tripod.Level}</p>
                  </div>
                </div>
              )
            } else {
              return <Fragment key={`${tripod.Name}_${tripodIndex}`}></Fragment>
            }
          })}
          {/* 트라이포드 없는 경우, 트라이포드 선택 안한 경우 */}
          {(skill.Tripods?.length === 0 || isSelectedCheck === false) && <div className="w-[124px]"></div>}
        </div>
        <div className='flex items-center gap-x-2'>
          <div>
            {/* 멸화 */}
            {gemOfDestruction[0] !== undefined ?
              <div className="flex items-center gap-x-1 w-[50px]">
                <div className='w-5 h-5 rounded-full' style={itemGradeStyleBackground[gemOfDestruction[0].Grade]}>
                  <Image alt={`${gemOfDestruction[0].Level}레벨 ${gemOfDestruction[0].Type}의 보석`} loading="lazy" width="20" height="20" decoding="async" className="rounded-full" src={gemOfDestruction[0].Icon} />
                </div>
                <p className="text-xs font-semibold">{gemOfDestruction[0].Level}멸</p>
              </div>
            :
              <div className='w-12'>
                <div className='w-5 h-5 rounded-full bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
              </div>
            }

            {/* 홍염 */}
            {gemOfRedFlame[0] !== undefined ?
              <div className="flex items-center gap-x-1 w-[50px] mt-1">
                <div className='w-5 h-5 rounded-full' style={itemGradeStyleBackground[gemOfRedFlame[0].Grade]}>
                  <Image alt={`${gemOfRedFlame[0].Level}레벨 ${gemOfRedFlame[0].Type}의 보석`} loading="lazy" width="20" height="20" decoding="async" className="rounded-full" src={gemOfRedFlame[0].Icon} />
                </div>
                <p className="text-xs font-semibold">{gemOfRedFlame[0].Level}홍</p>
              </div>
            :
              <div className='w-12 mt-1'>
                <div className='w-5 h-5 rounded-full bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
              </div>
            }
          </div>

          {/* 룬 */}
          {skill.Rune !== null ?
            <div className="flex flex-col items-center gap-y-1.5">
              <Image alt={skill.Rune.Name} loading="lazy" width="24" height="24" decoding="async" className="rounded-full w-6 h-6" src={skill.Rune.Icon} style={itemGradeStyleBackground[skill.Rune.Grade]} />
              <p className="w-[24px] text-[12px] leading-3 font-semibold">{skill.Rune.Name}</p>
            </div>
          :
            <div className='w-6 h-6 rounded-full bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
          }
        </div>
      </div>
    </div>
  )
}
