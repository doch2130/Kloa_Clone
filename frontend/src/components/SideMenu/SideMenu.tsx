import Link from 'next/link'
import React, { useEffect, useState } from 'react'


// 모바일 사이즈에서 bottom에 Menu 위치

type listType = {
  href: string,
  label: string,
  svg: React.JSX.Element,
}

const list:listType[] = [
  {
    href: '/',
    label: '홈',
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
  },
  {
    href: '/characters',
    label: '랭킹',
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
  },
  {
    href: '/merchant',
    label: '떠돌이 상인',
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
  },
  {
    href: '/setting',
    label: '설정',
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
  }
]

export default function SideMenu() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // resize 될때만 함수 불러오기
  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener("resize", resizeWindow);

    return () => {
      window.removeEventListener("resize", resizeWindow);
    }
  }, [windowWidth]);

  return (
    <>
    {windowWidth <= 1045 ?
    <div className='fixed z-[100] bottom-0 w-full h-[50px] border-[#f5f6f7] dark:border-[#2b2d31] border-t bg-white dark:bg-[#202225]'>
      <div className='grid grid-cols-4 h-full items-center justify-items-center'>
        {list.map((el, index) => (
          <Link key={index} href={el.href} className='select-none transition-colors duration-100 ease-linear bg-transparent active:bg-[#f5f6f7] dark:active:bg-[#26282c] rounded-xl touch-callout-none'>
          <div className='flex flex-col justify-center items-center gap-y-1 min-w-[40px] min-h-[40px] transition-transform duration-100 ease-linear active:scale-90 text-[#7d8395] dark:text-[#B9BBBE]'>
            <div className='w-5 h-5'>
              {el.svg}
            </div>
            <p className='text-[10px] leading-3'>{el.label}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
    : <></>
    }
    </>
  )
}
