import React from 'react'
import SkillPointCanvas from './SkillPointCanvas'
import Image from 'next/image'

type SkillsTabProps = {
}

export default function SkillsTab({}:SkillsTabProps) {

  return (
    <>
    <div className='flex gap-x-6'>
      <div className='grow'>
        {/* 특성, 각인, 세트 */}
        <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z'></path>
                <path d='M5 13l6 6'></path>
                <path d='M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365'></path>
                <path d='M10 5.5l-2 -2.5h-5v5l3 2.5'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>특화 1795 · 치명 654</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z'></path>
                <path d='M19 16h-12a2 2 0 0 0 -2 2'></path>
                <path d='M9 8h6'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>돌바아예원진</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>6 환각</p>
            </div>
          </div>
        </div>
        {/* 스킬 특성 종류 */}
        <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
          <div className='grid grid-cols-4 place-items-center text-lg font-semibold text-[#353945] dark:text-white'>
            <p>5렙 트포</p>
            <p>카운터</p>
            <p>무력화</p>
            <p>부위 파괴</p>
          </div>
          <div className='grid grid-cols-4 h-full place-items-center text-lg font-semibold text-[#8045dd] dark:text-[#a36bfc]'>
            <p>18개</p>
            <p>3개</p>
            <p>8개</p>
            <p>4개</p>
          </div>
        </div>
      </div>
      {/* 스킬 포인트 */}
      <div className='px-[17px] py-4 w-[146px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] flex flex-col justify-between'>
        <p className='text-lg font-semibold text-center'>스킬 포인트</p>
        <div className='w-28 h-28 relative'>
          <SkillPointCanvas usePoint={416} maxPoint={420} />
          <div className='absolute left-0 right-0 top-2 bottom-0 w-fit h-fit m-auto text-center'>
            <p className='text-2xl leading-6 font-bold'>416</p>
            <p className='mt-1 ml-2 text-lg leading-5 font-semibold text-[#7d8395]'>/ 420</p>
          </div>
        </div>
      </div>
    </div>

    {/* SKill */}
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
      <div className='py-3 first:pt-0 last:pb-0 border-b last:border-b-0 border-[#f5f6f7] dark:border-[#4d4f55]'>
        <div className='flex items-center'>
          <div className='w-[200px] flex items-center gap-x-1.5 text-left'>
            <Image alt='명령 : 플레어 빔' loading='lazy' width='40' height='40' decoding='async' className='bg-[#e6e8ec] dark:bg-[#2b2d31] rounded-lg' src='https://pica.korlark.com/efui_iconatlas/sc_skill/sc_skill_01_16.png' />
            <div className='grow pr-1'>
              <div className='flex items-center justify-between gap-x-1'>
                <p className='font-base text-[13px] leading-[13px] text-[#D9AB48]'>12레벨</p>
                <div className='flex gap-x-1 h-[19px]'>
                  <p className='rounded-full px-1.5 py-[3px] font-medium text-[11px] leading-[11px] border dark:border-[#cacdd4] dark:text-[#cacdd4]'>부파 2</p>
                </div>
              </div>
              <p className='mt-0.5 font-medium text-[15px] leading-5 text-[#353945] dark:text-white'>명령 : 플레어 빔</p>
            </div>
          </div>
          <div className='ml-1 mr-4'>
            <svg xmlns='http://www.w3.org/2000/svg' width='2' height='40' viewBox='0 0 2 40'>
              <line id='characters_skill_dash' y2='40' transform='translate(1)' fill='none' stroke='#e6e8ec' strokeWidth='2' strokeDasharray='2 4'></line>
            </svg>
          </div>
          <div className='grid grid-cols-3 gap-x-2.5 mr-2.5'>
            <div className='flex items-center gap-x-2 text-left w-[124px]'>
              <div className='relative shrink-0'>
                <Image alt='빠른 준비' loading='lazy' width='32' height='32' decoding='async' className='rounded-full drop-shadow w-8 h-8' src='https://pica.korlark.com/efui_iconatlas/tripod_tier/tripod_tier_1_56.png' />
                <div className='absolute -bottom-1 -right-1 drop-shadow-lg'>
                  <div className='w-5 h-5 relative flex items-center justify-center before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:m-auto before:w-[14px] before:h-[14px] before:rounded-[2px] before:rotate-45 before:bg-[#47ABD9]'>
                    <p className='absolute text-[11px] text-white'>3</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center shrink font-medium text-[#353945] dark:text-white'>
                <p className='text-[13px] truncate'>빠른 준비</p>
                <p className='text-xs leading-3'>Lv.5</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2 text-left w-[124px]'>
              <div className='relative shrink-0'>
                <Image alt='코어 에너지 충전' loading='lazy' width='32' height='32' decoding='async' className='rounded-full drop-shadow w-8 h-8' src='https://pica.korlark.com/efui_iconatlas/tripod_tier/tripod_tier_2_37.png' />
                <div className='absolute -bottom-1 -right-1 drop-shadow-lg'>
                  <div className='w-5 h-5 relative flex items-center justify-center before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:m-auto before:w-[14px] before:h-[14px] before:rounded-[2px] before:rotate-45 before:bg-[#8DC80E]'>
                    <p className='absolute text-[11px] text-white'>3</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center shrink font-medium text-[#353945] dark:text-white'>
                <p className='text-[13px] truncate'>코어 에너지 충전</p>
                <p className='text-xs leading-3'>Lv.5</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2 text-left w-[124px]'>
              <div className='relative shrink-0'>
                <Image alt='레이저 커팅' loading='lazy' width='32' height='32' decoding='async' className='rounded-full drop-shadow w-8 h-8' src='https://pica.korlark.com/efui_iconatlas/tripod_tier/tripod_tier_3_87.png' />
                <div className='absolute -bottom-1 -right-1 drop-shadow-lg'>
                  <div className='w-5 h-5 relative flex items-center justify-center before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:m-auto before:w-[14px] before:h-[14px] before:rounded-[2px] before:rotate-45 before:bg-[#FFB000]'>
                    <p className='absolute text-[11px] text-white'>2</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center shrink font-medium text-[#353945] dark:text-white'>
                <p className='text-[13px] truncate'>레이저 커팅</p>
                <p className='text-xs leading-3'>Lv.5</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='space-y-1'>
              <div className='w-12'>
                <div className='w-5 h-5 rounded-full bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
              </div>
              <div className='flex items-center gap-x-1 w-12'>
                <div className='w-5 h-5 rounded-full bg-gradient-to-135deg from-[#3c2201] to-[#a86200]'>
                  <Image alt='7레벨 홍염의 보석' loading='lazy' width='20' height='20' decoding='async' className='rounded-full' src='https://pica.korlark.com/efui_iconatlas/use/use_9_62.png' />
                </div>
                <p className='text-xs font-medium'>7홍</p>
              </div>
            </div>
            <div className='w-6 h-6 rounded-full bg-[#e6e8ec] dark:bg-[#2b2d31]'></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
