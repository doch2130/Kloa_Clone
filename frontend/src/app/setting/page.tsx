'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Setting() {
  const [showThema, setShowThema] = useState<boolean>(false);

  const toggleThemaPanel = () => {
    setShowThema((prev) => !prev);
  };

  const [dark, setDark] = useState("defaultMode");

  const toggleMode = (mode:string) => {
    if(mode === 'default' && localStorage.getItem("theme") === "dark") {
      // 다크모드 -> 기본모드 
      localStorage.removeItem("theme"); // 다크모드 삭제
      document.documentElement.classList.remove("dark");  // html class에서 dark클래스 삭제 !
      setDark("defaultMode");
    } else if (mode === 'dark') {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add("dark"); // html의 class에 dark 클래스 추가 ! 
      localStorage.setItem("theme", "dark");  // localstorage에 dark를 추가해서 ! useEffect에서 처음에 검사해서 다크모드인지 판단해주려고 ! 
      setDark("darkMode");
    }
    setShowThema(false);
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDark('darkMode');
    }
  }, []);

  
  return (
    <>
    <div className='absolute top-0 z-[99] w-full min-h-[100%] bg-[#f5f6f7] dark:bg-[#2b2d31] dark:text-[#fff]'>
      <div>
        <div className='bg-white dark:bg-[#33353a]'>
          <p className='p-4 pb-2 text-2xl font-bold'>설정</p>
          <Link href='/auth/login' className='w-full h-[58px] pl-5 pr-4 flex items-center justify-between bg-white dark:bg-[#33353a] transition-colors duration-100 ease-linear active:bg-[#F9FBFB] dark:active:bg-[#3a3b41] touch-callout-none'>
            <div className='flex items-center gap-x-1.5'>
              <p className='font-bold text-[15px] leading-[15px]'>로그인</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className='mt-[10px]'>
        <div className='bg-white dark:bg-[#33353a]'>
          <p className='font-bold text-xl leading-[15px] pt-5 pl-5 pb-2'>푸시 알림</p>
          <Link href='/merchant/settings' className='w-full h-[58px] flex items-center justify-between bg-white dark:bg-[#33353a] pl-5 pr-4 transition-colors duration-100 ease-linear active:bg-[#F9FBFB] dark:active:bg-[#3a3b41] touch-callout-none'>
            <div className='flex items-center gap-x-3'>
              <p className='text-[15px] leading-[15px] font-bold'>떠돌이 상인</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className='mt-[10px]'>
        <button type='button' className='w-full h-[58px] pl-5 pr-4 flex items-center justify-between bg-white dark:bg-[#33353a] transition-colors duration-100 ease-linear active:bg-[#F9FBFB] dark:active:bg-[#3a3b41]'
          onClick={toggleThemaPanel}>
          <div className='flex items-center gap-x-3'>
            <p className='font-bold text-[15px] leading-[15px]'>테마 변경</p>
          </div>
          <div className='flex items-center gap-x-1'>
            <p className='text-[13px] leading-[13px] text-[#7d8395]'>시스템 설정 사용</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </button>
      </div>

      <div className='mt-[10px]'>
        <div className='w-full border-b last:border-b-0 border-[#e6e8ec] dark:border-[#2b2d31] h-[48px] pl-5 pr-4 flex items-center justify-between bg-white dark:bg-[#33353a]'>
          <div className='flex items-center gap-x-3'>
            <p className='font-medium text-xs text-[#7d8395]'>버전 v1.0.0-beta</p>
          </div>
        </div>
      </div>

      <p className='text-[#7d8395] font-light text-[11px] leading-[17px] mx-3 mt-[10px]'>
        © 2023 PHH. PHH isn’t endorsed by Smilegate RPG and doesn’t reflect the views or opinions of Smilegate RPG or anyone officially involved in producing or managing Lostark. Lostark and Smilegate RPG are trademarks or registered trademarks of Smilegate RPG, Inc. Lostark © Smilegate RPG, Inc.
      </p>

      <div className='w-screen h-[50px] shrink-0 !m-0'></div>
    </div>
    
    <div>
      <div className={showThema ? `opacity-100` : `transtion-opacity duration-150 ease-linear opacity-0`}>
        <div className='fixed z-[100] inset-0 h-screen bg-black/20 dark:bg-black/40 overscroll-none touch-none' onClick={() => setShowThema(false)}></div>
      </div>
      <div className={`fixed bottom-0 overscroll-none ${showThema ? 'z-[101]' : 'z-[-1]'}`}>
        <div className={`transtion transform duration-150 ease-in ${showThema ? 'translate-y-0' : `translate-y-full`}`}>
          <div className='w-screen max-h-[410px] touch-none bg-white dark:bg-[#36393F] rounded-t-[30px] pt-[15px] px-[12px] pb-[20px]'>
            <h2 className='pl-6 text-xl font-bold dark:text-white'>테마 설정</h2>
            <div className='mt-3 max-h-[340px] overflow-y-scroll hidden-scroll'>
              <button type='button' className={`w-full h-[50px] flex items-center justify-center border-b last:border-b-0 border-[#e6e8ec] dark:border-[#2F3136]
                ${dark === 'defaultMode' ? 'bg-gradient-to-r from-[#5865f2] to-[#8045dd] text-white' : 'text-head dark:text-[#B9BBBE]'}`}
                onClick={() => toggleMode('default')}>
                <p className='text-base font-semibold'>밝은 테마</p>
              </button>
              <button type='button' className={`w-full h-[50px] flex items-center justify-center border-b last:border-b-0 border-[#e6e8ec] dark:border-[#2F3136]
                ${dark === 'defaultMode' ? 'text-head dark:text-[#B9BBBE]' : 'bg-gradient-to-r from-[#5865f2] to-[#8045dd] text-white'}`}
                onClick={() => toggleMode('dark')}>
                <p className='text-base font-semibold'>어두운 테마</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
