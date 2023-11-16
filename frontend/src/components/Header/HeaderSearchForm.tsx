'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import SearchIcon from '@/assets/Icon/search.svg'
import AlertIcon from '@/assets/Icon/alertIcon.svg'
import SearchListEmptyIcon from '@/assets/Mococo/img_auction_empty2.png'

export default function HeaderSearchForm() {
  const searchWrap = useRef<HTMLDivElement>(null);
  const searchValueRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  // 최근검색, 즐겨찾기
  const [popOverCategory, setPopOverCategory] = useState<string>('최근검색');
  
  const textChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const popOverCategoryChangeHandler = (category:string) => {
    setPopOverCategory(category);
    return ;
  }

  const popOverOpenEvent = () => {
    if(searchValue !== '') {
      return ;
    }
    console.log('popover');
    setIsInputFocus(true);
  }

  const popOverCloseEvent = (e:any) => {
    console.log('e.currentTarget.contains ', e.target);
    console.log('searchWrap ', searchWrap.current?.contains(e.target));
    // setIsInputFocus(false);
  }
  
  return (
    <div ref={searchWrap} className='nav-search-wrap'>
      <div className='nav-search'>
        <Image src={SearchIcon} alt='SearchIcon' width={24} height={24} />
        <form>
          <input id='characterName' ref={searchValueRef} className='bg-transparent dark:text-white placeholder:dark:text-[#656770]'
          type='text' placeholder='캐릭터명을 입력하세요' maxLength={12}
          onChange={(e) => textChange(e)} value={searchValue} onFocus={() => popOverOpenEvent()}/>
        </form>
      </div>
      {isInputFocus &&
      <div className='nav-search-over bg-white dark:bg-[#33353a] rounded-[10px] rounded-t-none border dark:border-[#4d4f55]'>
        <div className='nav-search-over-header'>
          <button type='button' className={`h-10 dark:bg-[#2c2f33] ${popOverCategory === '최근검색' ? 'dark:text-[#eaf0ec]' : 'nav-search-over-header-unactive'}`}
          onClick={() => popOverCategoryChangeHandler('최근검색')}>최근검색</button>

          <button type='button' className={`h-10 dark:bg-[#2c2f33] ${popOverCategory === '즐겨찾기' ? 'dark:text-[#eaf0ec]' : 'nav-search-over-header-unactive'}`}
          onClick={() => popOverCategoryChangeHandler('즐겨찾기')}>즐겨찾기</button>
        </div>
        <div className='nav-search-over-body'>
          {popOverCategory === '최근검색' ?
          <div className='nav-search-over-body-empty'>
            <Image src={AlertIcon} alt='alertIcon' width={24} height={24} />
            <p className='dark:text-[#eaf0ec]'>최근 검색한 캐릭터가 없습니다.</p>
          </div>
          : 
          <div className='nav-search-over-body-empty'>
            <Image src={SearchListEmptyIcon} alt='SearchListEmptyIcon' width={55} height={64} />
            <p className='dark:text-[#eaf0ec]'>즐겨찾기한 캐릭터가 없습니다.
            <br />캐릭터를 검색한 후 즐겨찾기 해보세요!</p>
          </div>
          }
        </div>
      </div>
      }
    </div>
  )
}


