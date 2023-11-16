'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'

import SearchIcon from '@/assets/Icon/search.svg'

export default function HeaderSearchForm() {
  const searchWrap = useRef<HTMLDivElement>(null);
  const searchValueRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const [isInputFocus, setIsInputFocus] = useState(false);

  // 최근검색, 즐겨찾기
  const [popOverCategory, setPopOverCategory] = useState('최근검색');
  
  const textChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const popOverCategoryChangeHandler = (category:string) => {
    setPopOverCategory(category);
    return ;
  }

  const popOverEvent = () => {
    if(searchValue !== '') {
      return ;
    }
    console.log('popover');
    setIsInputFocus(true);
  }
  
  return (
    <div style={{position: 'relative'}}>
      <div ref={searchWrap} className='nav-search'>
        <Image src={SearchIcon} alt='SearchIcon' width={24} height={24} />
        <form style={{display: 'inline-block'}}>
          <input id='characterName' ref={searchValueRef} className='bg-transparent dark:text-white placeholder:dark:text-[#656770]'
          type='text' placeholder='캐릭터명을 입력하세요' maxLength={12}
          onChange={(e) => textChange(e)} value={searchValue} onFocus={() => popOverEvent()}/>
        </form>
      </div>
      {isInputFocus &&
      <div className='nav-search-over bg-white dark:bg-[#33353a] rounded-[10px] rounded-t-none border dark:border-[#4d4f55]'>
        <div className='nav-search-over-header'>
          <button type='button' className='h-10 dark:bg-[#2c2f33]'
          onClick={() => popOverCategoryChangeHandler('최근검색')}>최근검색</button>

          <button type='button' className='h-10 dark:bg-[#2c2f33]'
          onClick={() => popOverCategoryChangeHandler('최근검색')}>즐겨찾기</button>
        </div>
        <div className='nav-search-over-body'>
          <p style={{textAlign: 'center', height: '100px'}}>본문</p>
        </div>
      </div>
      }
    </div>
  )
}


