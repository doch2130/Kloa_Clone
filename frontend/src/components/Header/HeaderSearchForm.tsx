'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  
  // 인풋 창 데이터 변환, 값에 따른 팝업 창 출력 상태
  const textChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== '') {
      setIsInputFocus(false);
    } else {
      setIsInputFocus(true);
    }
    setSearchValue(e.target.value);
    return ;
  }

  // 최근검색, 즐겨찾기 전환 함수
  const popOverCategoryChangeHandler = useCallback((category:string) => {
    setPopOverCategory(category);
    return ;
  }, []);

  // 팝업 창 여는 함수
  const popOverOpenEvent = useCallback(() => {
    if(!isInputFocus) {
      setIsInputFocus(true);
    }
    return ;
  }, [isInputFocus]);

  

  useEffect(() => {
    // 팝업 창 닫는 함수
    const popOverCloseEvent = (e:any) => {
      if(searchWrap.current?.contains(e.target)) {
        setIsInputFocus(true);
      } else {
        setIsInputFocus(false);
      }
    }
    // 팝업 창 닫는 함수 등록
    document.addEventListener('mousedown', popOverCloseEvent);

    // 언마운트 등록
    return () => {
      document.removeEventListener('mousedown', popOverCloseEvent);
    }
  }, []);
  
  return (
    <div ref={searchWrap} className='nav-search-wrap'>
      <div className='nav-search'>
        <Image src={SearchIcon} alt='SearchIcon' width={24} height={24} />
        <form>
          <input id='characterName' ref={searchValueRef} className='bg-transparent dark:text-white placeholder:dark:text-[#656770]'
          type='text' placeholder='캐릭터명을 입력하세요' maxLength={12}
          onChange={(e) => textChange(e)} value={searchValue} onFocus={() => popOverOpenEvent()} />
        </form>
      </div>
      {isInputFocus &&
      <div className='nav-search-over bg-white dark:bg-[#33353a] rounded-[10px] rounded-t-none border dark:border-[#4d4f55]'>
        <div className='nav-search-over-header'>
          <button type='button' className={`h-10 ${popOverCategory === '최근검색' ? 'dark:text-[#eaf0ec] dark:bg-[#33353a]' : 'nav-search-over-header-unactive dark:bg-[#2c2f33]'}`}
          onClick={() => popOverCategoryChangeHandler('최근검색')}>최근검색</button>

          <button type='button' className={`h-10 ${popOverCategory === '즐겨찾기' ? 'dark:text-[#eaf0ec] dark:bg-[#33353a]' : 'nav-search-over-header-unactive dark:bg-[#2c2f33]'}`}
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


