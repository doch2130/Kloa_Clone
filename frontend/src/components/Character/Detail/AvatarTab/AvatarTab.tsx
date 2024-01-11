import React from 'react'
import { ArmoryAvatar, Tendency} from '@/types/characters'
import Image from 'next/image'
import AvatarTabLeft from './AvatarTabLeft'
import AvatarTabRight from './AvatarTabRight'

interface AvatarTabProps {
  characterTendencies?: Tendency[]
  characterName?: string
  characterImage?: string
  armoryAvatars?: ArmoryAvatar[]
}

export default function AvatarTab({ characterTendencies, characterName, characterImage, armoryAvatars }:AvatarTabProps) {
  return (
    <>
      <div className='px-[17px] py-4 w-full h-[58px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
        <div className='grid grid-cols-4 place-items-center text-base font-medium text-[#7d8395] dark:text-[#e6e8ec]'>
          {characterTendencies !== undefined && characterTendencies.map((tendency:Tendency, index:number) => {
            return (
              <p key={index}>
                {tendency.Type}
                <span className='ml-1.5 text-[#353945] dark:text-white font-semibold'>{tendency.Point}</span>
              </p>
            )
          })}
        </div>
      </div>
      <div className='px-[17px] py-4 w-full min-h-[360px] bg-[#15181d] text-white rounded-xl shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
        <div className='w-full p-3 relative flex justify-center items-center mx-auto'>
          {/* 캐릭터 이미지 */}
          <div className='w-[60%] my-6 relative'>
            <Image alt={characterName !== undefined ? characterName : ''} src={characterImage !== undefined ? characterImage : ''}
              loading='lazy' width={389} height={450} decoding='async' />
          </div>
          {/* 아바타 왼쪽, 무기, 상의, 하의 */}
          <AvatarTabLeft armoryAvatars={armoryAvatars} />
          {/* 아바타 나머지 */}
          <AvatarTabRight armoryAvatars={armoryAvatars} />
        </div>
      </div>
    </>
  )
}
