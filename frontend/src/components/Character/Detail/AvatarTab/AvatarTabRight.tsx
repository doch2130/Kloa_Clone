import React from 'react'
import { ArmoryAvatar } from '@/types/characters'
import Image from 'next/image'
import { itemGradeStyleBackground, itemGradeStyleColor } from '@/app/characters/[name]/utils'


interface AvatarTabRightProps {
  armoryAvatars?: ArmoryAvatar[]
}

const rightAvatarArray = ['얼굴1 아바타', '얼굴2 아바타', '변신 스킨', '악기 아바타', '이동 효과'];

export default function AvatarTabRight({ armoryAvatars }:AvatarTabRightProps) {
  const headArmorArray= armoryAvatars?.filter((avatar) => avatar.Type === '머리 아바타');
  const legendHeadArmorArray = headArmorArray?.filter((avatar) => avatar.Type === '머리 아바타' && avatar.Grade === '전설');
  const heroHeadArmorArray = headArmorArray?.filter((avatar) => avatar.Type === '머리 아바타' && avatar.Grade === '영웅');
  return (
    <div className='absolute right-3 top-10 bottom-10 flex flex-col justify-between gap-y-3'>
      {(armoryAvatars !== undefined && headArmorArray !== undefined && headArmorArray.length > 0) ?
      <div>
        {legendHeadArmorArray !== undefined && legendHeadArmorArray.length > 0 ? 
        // 전설 있는 경우
        <>
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right w-full'>
            <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[legendHeadArmorArray[0].Grade]}>
              <Image src={legendHeadArmorArray[0].Icon} alt={legendHeadArmorArray[0].Name} loading="lazy" width={50} height={50} decoding="async" />
            </div>
            <div>
              <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[legendHeadArmorArray[0].Grade]}>{legendHeadArmorArray[0].Name}</p>
              <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>머리 아바타</p>
            </div>
          </div>

          {heroHeadArmorArray !== undefined && heroHeadArmorArray.length > 0 ?
          // 전설 있음, 영웅 있는 경우
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right w-full mt-3'>
            <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[heroHeadArmorArray[0].Grade]}>
              <Image src={heroHeadArmorArray[0].Icon} alt={heroHeadArmorArray[0].Name} loading="lazy" width={50} height={50} decoding="async" />
            </div>
            <div>
              <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[heroHeadArmorArray[0].Grade]}>{heroHeadArmorArray[0].Name}</p>
              <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>머리 덧입기</p>
            </div>
          </div>
          :
          // 전설 있음, 영웅 없는 경우
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right mt-3'>
            <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
            <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 덧입기</p>
          </div>
          }
        </>
        :
        heroHeadArmorArray !== undefined && heroHeadArmorArray.length > 0 ?
        // 전설 없음, 영웅 있는 경우, 덧입기 없음 고정
        <>
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right w-full'>
            <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[heroHeadArmorArray[0].Grade]}>
              <Image src={heroHeadArmorArray[0].Icon} alt={heroHeadArmorArray[0].Name} loading="lazy" width={50} height={50} decoding="async" />
            </div>
            <div>
              <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[heroHeadArmorArray[0].Grade]}>{heroHeadArmorArray[0].Name}</p>
              <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>머리 아바타</p>
            </div>
          </div>
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right mt-3'>
            <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
            <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 덧입기</p>
          </div>
        </>
        :
        // 전설, 영웅 없는 경우
        <div>
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right'>
            <div className="w-[50px] h-[50px] rounded-md bg-[#2b2d31]"></div>
            <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 아바타</p>
          </div>
          <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right mt-3'>
            <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
            <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 덧입기</p>
          </div>
        </div>
        }
      </div>
      :
      // 장비 값이 없는 경우
      <div>
        <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right'>
          <div className="w-[50px] h-[50px] rounded-md bg-[#2b2d31]"></div>
          <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 아바타</p>
        </div>
        <div className='flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right mt-3'>
          <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
          <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>머리 덧입기</p>
        </div>
      </div>
      }

      {/* 나머지 아바타 */}
      <div>
        {rightAvatarArray.map((el:string, index:number) => {
          const AvatarArray = armoryAvatars?.filter((avatar) => avatar.Type === el);
          if(AvatarArray !== undefined && AvatarArray.length > 0) {
            return (
              <div key={`${el}_${index}`} className={`flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right w-full ${index > 0 && 'mt-3'}`}>
                <div className='w-[50px] h-[50px] rounded-md overflow-hidden flex items-center shrink-0' style={itemGradeStyleBackground[AvatarArray[0].Grade]}>
                  <Image src={AvatarArray[0].Icon} alt={AvatarArray[0].Name} loading="lazy" width={50} height={50} decoding="async" />
                </div>
                <div>
                  <p className='truncate drop-shadow text-sm font-semibold' style={itemGradeStyleColor[AvatarArray[0].Grade]}>{AvatarArray[0].Name}</p>
                  <p className='text-[0.85rem] leading-5 font-medium text-[#cacdd4] drop-shadow'>{el}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div key={`${el}_${index}`} className={`flex items-center gap-x-2.5 rounded-lg flex-row-reverse text-right w-full ${index > 0 && 'mt-3'}`}>
                <div className='w-[50px] h-[50px] rounded-md bg-[#2b2d31]'></div>
                <p className='text-sm font-medium text-[#cacdd4] drop-shadow'>{el}</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
