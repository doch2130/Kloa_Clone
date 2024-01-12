import React from 'react'
import Link from 'next/link'
import { rankListType } from '@/types/rank'

type CharacterListProps = {
  rankingList: rankListType[] | undefined | null
}

export default function CharacterList({ rankingList }:CharacterListProps) {
  return (
    <div>
      <div className='w-full px-5 py-[7px] mt-[31px] grid grid-cols-[76px_196px_110px_134px_112px_202px_140px_110px] grid-rows-1 text-xs text-[#7d8395] dark:text-[#c7c9d1] font-bold'>
        <p>순위</p>
        <p>캐릭터명</p>
        <p>아이템 레벨</p>
        <p>클래스</p>
        <p>서버명</p>
        <p>길드명</p>
        <p className="text-center">장비</p>
        <p>직업 각인</p>
      </div>
      <ul className='w-full min-h-[812px] bg-white dark:bg-[#33353a] rounded-[10px] overflow-hidden [&>li]:px-5 [&>li]:first:pt-1 [&>li>div]:grid [&>li>div]:grid-cols-[76px_196px_110px_134px_112px_202px_140px_110px] [&>li>div]:grid-rows-1 [&>li>div]:h-12 [&>li>div]:items-center [&>li>div]:border-b [&>li>div]:border-basicGrey dark:[&>li>div]:border-[#4d4f55] text-head dark:text-[#eaf0ec] text-sm font-semibold select-text'>
        {rankingList?.map((list:rankListType, index:number) => {
          return (
            <li key={`${list.name}_${index}`} className='hover:bg-[#F9FBFB] dark:hover:bg-[#3a3b41]'>
              <div>
                <p>{index+1}</p>
                <Link href={`./characters/${list.name}`} as={`./characters/${list.name}`}>{list.name}</Link>
                <p>{list.itemLevel}</p>
                <p>{list.jobClass}</p>
                <p>{list.server}</p>
                <p>{list.guildName}</p>
                <p>{list.setArmorEffect}</p>
                <p className='whitespace-pre'>{list.jobEngraving}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
