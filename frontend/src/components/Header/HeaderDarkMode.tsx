'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import SunModeIcon from '@/assets/Icon/sun.svg'
import MoonModeIcon from '@/assets/Icon/moon.svg'

export default function HeaderDarkMode() {
  const [dark, setDark] = useState("defaultMode");

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
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDark('darkMode');
    }
  }, []);
  return (
    <>
    <button type='button' className='duration-300 bg-white dark:bg-[#33353a] dark:hover:bg-[#40434a]' onClick={() => toggleDarkMode()}>
      {dark === 'defaultMode' ? 
      <Image src={MoonModeIcon} alt='MoonMode Icon' width={20} />
      : <Image src={SunModeIcon} alt='SunMode Icon' width={20} />
      }
    </button>
    </>
  )
}
