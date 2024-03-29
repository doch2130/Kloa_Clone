import React from 'react'
import Link from 'next/link'
import { rankListType } from '@/types/rank'

type CharacterListProps = {
  rankingList: rankListType[] | undefined | null
  rankFetchNextPage: Function
  rankIsFetchingNextPage: boolean
}


export default function CharacterList({ rankingList, rankFetchNextPage, rankIsFetchingNextPage }:CharacterListProps) {
  return (
    <div>
      <div className='w-full px-5 py-[7px] mt-[31px] text-xs text-[#7d8395] dark:text-[#c7c9d1] font-bold grid grid-rows-1 grid-cols-[76px_196px_110px_134px_112px_202px_140px_110px] mmlg:grid-cols-[35px_100px_70px_90px_90px_90px] mmlg:justify-between md:mt-3'>
        <p>순위</p>
        <p>캐릭터명</p>
        <p>아이템 레벨</p>
        <p>클래스</p>
        <p>서버명</p>
        <p className='mmlg:hidden'>길드명</p>
        <p className="text-center mmlg:hidden">장비</p>
        <p>직업 각인</p>
      </div>
      <ul className='w-full min-h-[812px] bg-white dark:bg-[#33353a] rounded-[10px] overflow-hidden [&>li]:px-5 [&>li]:first:pt-1 [&>li>div]:grid [&>li>div]:grid-cols-[76px_196px_110px_134px_112px_202px_140px_110px] [&>li>div]:grid-rows-1 [&>li>div]:h-12 [&>li>div]:items-center [&>li>div]:border-b [&>li>div]:border-[#e6e8ec] dark:[&>li>div]:border-[#4d4f55] text-head dark:text-[#eaf0ec] text-sm font-semibold select-text mmlg:[&>li>div]:grid-cols-[35px_100px_70px_90px_90px_90px]'>
        {rankingList?.map((list:rankListType, index:number) => {
          return (
            <li key={`${list.name}_${index}`} className='hover:bg-[#F9FBFB] dark:hover:bg-[#3a3b41]'>
              <div className='mmlg:justify-between'>
                <p>{index+1}</p>
                <Link href={`./characters/${list.name}`} as={`./characters/${list.name}`}>{list.name}</Link>
                <p>{list.itemLevel}</p>
                <p>{list.jobClass}</p>
                <p>{list.server}</p>
                <p className='mmlg:hidden'>{list.guildName}</p>
                <p className="text-center text-[#1AB9B6] mmlg:hidden">{list.setArmorEffect}</p>
                <p className='whitespace-pre'>{list.jobEngraving}</p>
              </div>
            </li>
          )
        })}
        {rankingList !== undefined && rankingList !== null && rankingList.length > 0 && rankingList.length % 100 === 0 &&
        <button type='button' onClick={() => rankFetchNextPage()} className='w-full h-[40px] flex justify-center items-center text-[#5865f2] dark:text-[#8991EE] select-none'>
          {
          rankIsFetchingNextPage ?
          <p className='font-bold text-[13px] leading-[16px]'>로딩 중...</p>
          :
          <p className='font-bold text-[13px] leading-[16px]'>더 보기</p>
          }
        </button>
        }
      </ul>
    </div>
  )
}
