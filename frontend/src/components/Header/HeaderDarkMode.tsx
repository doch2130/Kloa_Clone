'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import SunModeIcon from '@/assets/Icon/sun.svg'
import MoonModeIcon from '@/assets/Icon/moon.svg'

export default function HeaderDarkMode() {
  const [dark, setDark] = useState("darkMode");

  const toggleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      // 다크모드 -> 기본모드 
      localStorage.removeItem("theme"); // 다크모드 삭제
      document.documentElement.classList.remove("dark");  // html class에서 dark클래스 삭제 !
      setDark("defaultMode");
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add("dark"); // html의 class에 dark 클래스 추가 ! 
      localStorage.setItem("theme", "dark");  // localstorage에 dark를 추가해서 ! useEffect에서 처음에 검사해서 다크모드인지 판단해주려고 ! 
      setDark("darkMode");
    }
  };

  useEffect(() => {
    // 처음에 다크모드인지 판단해서 뿌려주기 !! ( 나중에는 상태관리를 해도 괜찮습니다 ! )
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <>
    <button type='button' className='duration-300 bg-white dark:bg-[#2b2d31] dark:hover:bg-[#40434a]' onClick={() => toggleDarkMode()}>
      {dark === 'defaultMode' ? 
      <Image src={MoonModeIcon} alt='MoonMode' />
      : <Image src={SunModeIcon} alt='MoonMode' />
      }
    </button>
    </>
  )
}
