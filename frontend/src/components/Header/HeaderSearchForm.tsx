'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import HeaderSearchFormRecently from './HeaderSearchFormRecently'
import HeaderSearchFormFavorite from './HeaderSearchFormFavorite'

import { Character } from '@/type/characters'

import SearchIcon from '@/assets/Icon/search.svg'
import { useRouter } from 'next/navigation'

export default function HeaderSearchForm() {
  const searchWrap = useRef<HTMLDivElement>(null);
  const searchValueRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  // Input Focus에 따른 pop 출력
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  // 최근검색, 즐겨찾기 카테고리 변경
  const [popOverCategory, setPopOverCategory] = useState<string>('최근검색');
  // 최근검색 데이터
  const [recentlyData, setRecentlyData] = useState<Character[]>([]);

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

  // form 제출 이벤트 함수
  const onSubmit = async (e:React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>):Promise<void> => {
    e.stopPropagation();
    if(!searchValueRef.current) {
      return ;
    }
    const searchValue = searchValueRef.current.value.trim();
    if(searchValue === '') {
      alert('캐릭터명을 입력해주세요.');
      searchValueRef.current.focus();
      return ;
    }
    
    setSearchValue('');
    // router.replace(`./${searchValue}`);
    router.push(`./${searchValue}`);
    return ;
  }

  // form 엔터 이벤트 함수
  const enterEventHandler = (e:React.KeyboardEvent<HTMLInputElement>):void => {
    e.stopPropagation();
    if(e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e);
    }
    return ;
  };


  // 팝업 창 닫기 함수 등록
  useEffect(() => {
    // 팝업 창 닫는 함수
    const popOverCloseEvent = (e:MouseEvent) => {
      if(searchWrap.current?.contains(e.target as Node)) {
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
      <div className='nav-search dark:border-[#42464D]'>
        <Image src={SearchIcon} alt='SearchIcon' width={24} height={24} />
        <form onSubmit={onSubmit}>
          <input id='characterName' ref={searchValueRef} className='bg-transparent dark:text-white placeholder:dark:text-[#656770]'
          type='text' placeholder='캐릭터명을 입력하세요' maxLength={12} autoComplete="off"
          onChange={(e) => textChange(e)} value={searchValue} onFocus={() => popOverOpenEvent()}
          onKeyDown={enterEventHandler} />
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
        <div>
          {popOverCategory === '최근검색' ?
          <HeaderSearchFormRecently recentlyData={recentlyData} setRecentlyData={setRecentlyData} />
          : <HeaderSearchFormFavorite />
          }
        </div>
      </div>
      }
    </div>
  )
}


