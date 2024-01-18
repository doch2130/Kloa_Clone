import React from 'react'
import { ArmoryAvatar } from '@/types/characters'
import Image from 'next/image'
import { itemGradeStyleBackground, itemGradeStyleColor } from '@/app/characters/[name]/utils'


interface AvatarTabLeftProps {
  armoryAvatars?: ArmoryAvatar[]
}

const leftAvatarArray = ['무기 아바타', '상의 아바타', '하의 아바타'];

export default function AvatarTabLeft({ armoryAvatars }:AvatarTabLeftProps) {
  return (
    // {/* 아바타 왼쪽, 무기, 상의, 하의 */}
    <div className='absolute left-3 top-10 bottom-10 flex flex-col justify-between gap-y-3'>
      {leftAvatarArray.map((el:string, index:number) => {
        if(armoryAvatars !== undefined && armoryAvatars !== null ) {
          const armoryAvatarValue = armoryAvatars?.filter((avatar) => avatar.Type === el);
          const legendAvatar:ArmoryAvatar[] = armoryAvatarValue?.filter((avatar) => avatar.Grade === '전설');
          const heroAvatar:ArmoryAvatar[] = armoryAvatarValue?.filter((avatar) => avatar.Grade === '영웅');

          if(legendAvatar?.length > 0) {
            // 전설 아바타 있는 경우
            return (
              <div key={`${el}_${index}`}>
                <div className='flex items-center gap-x-2.5 rounded-lg text-left'>
                  <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[legendAvatar?.[0].Grade]}>
                    <Image src={legendAvatar?.[0].Icon} alt={legendAvatar?.[0].Name}
                      loading={'lazy'} width={50} height={50} decoding="async" />
                  </div>
                  <div>
                    <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[legendAvatar?.[0].Grade]}>{legendAvatar?.[0].Name}</p>
                    <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>{el}</p>
                  </div>
                </div>
                <div className='flex items-center gap-x-2.5 rounded-lg mt-3'>
                  {heroAvatar?.length === 0 ? 
                  <>
                  <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
                  <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el.replace('아바타', '덧입기')}</p>
                  </>
                  :
                  <>
                  <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[heroAvatar?.[0].Grade]}>
                    <Image src={heroAvatar?.[0].Icon} alt={heroAvatar?.[0].Name}
                      loading={'lazy'} width={50} height={50} decoding="async" />
                  </div>
                  <div>
                    <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[heroAvatar?.[0].Grade]}>{heroAvatar?.[0].Name}</p>
                    <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>{el.replace('아바타', '덧입기')}</p>
                  </div>
                  </>
                  }
                </div>
              </div>
            )
          } else {
            // 전설 아바타 없는 경우
            // 영웅 아바타 체크, 덧입기는 없음 고정
            return (
              <div key={`${el}_${index}`}>
                <div className='flex items-center gap-x-2.5 rounded-lg text-left'>
                  {heroAvatar?.length === 0 ? 
                  <>
                    <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
                    <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el}</p>
                  </>
                  :
                  <>
                    <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[heroAvatar?.[0].Grade]}>
                      <Image src={heroAvatar?.[0].Icon} alt={heroAvatar?.[0].Name}
                        loading={'lazy'} width={50} height={50} decoding="async" />
                    </div>
                    <div>
                      <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[heroAvatar?.[0].Grade]}>{heroAvatar?.[0].Name}</p>
                      <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>{el}</p>
                    </div>
                  </>
                  }
                </div>
                <div className='flex items-center gap-x-2.5 rounded-lg mt-3'>
                  <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
                  <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el.replace('아바타', '덧입기')}</p>
                </div>
              </div>
            )
          }
        } else {
          // 아바타 값이 없는 경우
          return (
            <div key={`${el}_${index}`}>
              <div className='flex items-center gap-x-2.5 rounded-lg text-left'>
                <div className="w-[50px] h-[50px] rounded-md bg-[#2b2d31]"></div>
                <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el}</p>
              </div>
              <div className='flex items-center gap-x-2.5 rounded-lg mt-3'>
                <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
                <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el.replace('아바타', '덧입기')}</p>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
