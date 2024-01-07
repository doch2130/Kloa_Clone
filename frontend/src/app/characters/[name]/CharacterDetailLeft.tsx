'use client'
import React from 'react'
import CharacterSummary from './CharacterSummary'
import { Tab } from '@headlessui/react'
import { ArmoryProfile } from '@/types/characters';

const categories:string[] = ['아바타', '히스토리', '수집형 포인트', '보유 캐릭터'];

interface CharacterDetailLeftProps {
  ArmoryProfile?: ArmoryProfile
}

export default function CharacterDetailLeft({ ArmoryProfile }:CharacterDetailLeftProps) {
  return (
    <section className='shrink-0 w-[400px] bg-white dark:bg-[#33353a] border-l dark:border-l-[#4d4f55] shadow-[5px_1px_8px_0_rgba(0,0,0,.06)] z-[1]'>
      <CharacterSummary ArmoryProfile={ArmoryProfile} />
      <div className='mx-10 mt-8 space-y-8'>
        <Tab.List className="space-y-3 [&>*]:py-1 select-none">
          <div className='flex items-center'>
            <Tab className='focus:outline-none focus-visible:ring-0'>
              {({ selected }) => (
                <p className={
                  selected ?
                  'text-lg font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                  : 'text-lg font-normal'
                  }
                >
                  능력치
                </p>
              )}
            </Tab>
            <div className='mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55]'></div>
            <Tab className='focus:outline-none focus-visible:ring-0'>
              {({ selected }) => (
                <p className={
                  selected ?
                  'text-lg font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                  : 'text-lg font-normal'
                  }
                >
                  스킬
                </p>
              )}
            </Tab>
          </div>

          {categories.map((category) => (
            <Tab key={category} className='block focus:outline-none focus-visible:ring-0'>
              {({ selected }) => (
                <p className={
                  selected ?
                  'text-xl font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                  : 'text-xl font-normal'
                  }
                >
                  {category}
                </p>
              )}
            </Tab>
          ))}

          {ArmoryProfile?.GuildName !== null ?
          <Tab className='focus:outline-none focus-visible:ring-0'>
            {({ selected }) => (
              <div className={
                selected ?
                'flex items-center font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                : 'flex items-center text-xl font-normal'
                }
              >
                <p className='text-xl'>길드</p>
                {ArmoryProfile?.GuildName && <div className={
                  selected ?
                  'mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55] bg-black'
                  : 'mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55]'
                  }
                ></div>}
                <div className='flex items-center gap-x-1.5'>
                  <p className={
                    selected ?
                    'text-xl font-[450] font-medium'
                    : 'text-xl font-[450]'
                    }
                  >
                    {ArmoryProfile?.GuildName}
                  </p>
                </div>
              </div>
            )}
          </Tab>
          :
          <Tab className='focus:outline-none focus-visible:ring-0' disabled>
            <div className='flex items-center text-xl font-normal cursor-not-allowed'>
              <p className='text-xl text-[#7d8395]'>길드</p>
            </div>
          </Tab>
          }
        </Tab.List>
        <hr className='w-full h-[1px] dark:border-[#4d4f55]' />
        <p className='text-xs font-light text-center text-[#7d8395] pb-5'>
          <span>TODAY : 12</span>
          <span className='inline-block mx-2 w-[1px] h-[9px] bg-[#e6e8ec] dark:bg-[#4d4f55]'></span>
          <span>TOTAL : 83</span>
        </p>
      </div>
    </section>
  )
}
