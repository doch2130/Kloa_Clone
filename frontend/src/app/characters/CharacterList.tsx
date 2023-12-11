import React from 'react'
import Link from 'next/link'

export default function CharacterList() {
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
      <ul className='w-full min-h-[812px] bg-white dark:bg-[#33353a] dark:border-0 border-2 border-lightGrey rounded-[10px] overflow-hidden [&>li]:px-5 [&>li]:first:pt-1 [&>li>div]:grid [&>li>div]:grid-cols-[76px_196px_110px_134px_112px_202px_140px_110px] [&>li>div]:grid-rows-1 [&>li>div]:h-12 [&>li>div]:items-center [&>li>div]:border-b [&>li>div]:border-basicGrey dark:[&>li>div]:border-[#4d4f55] text-head dark:text-[#eaf0ec] text-sm font-semibold select-text'>
        <li className='hover:bg-[#F9FBFB] dark:hover:bg-[#3a3b41]'>
          <div>
            <p>1</p>
            <Link href='./characters'>키토단</Link>
            <p>1621.10</p>
            <p>스카우터</p>
            <p>카제로스</p>
            <p>혈석길드</p>
            <p>6 환각</p>
            <p>1 진화의 유산</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
