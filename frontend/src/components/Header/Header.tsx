'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import HeaderSearchForm from './HeaderSearchForm'
import HeaderDarkMode from './HeaderDarkMode'
import HeaderLogin from './HeaderLogin'

import MobileMenu from '../MobileMenu/MobileMenu'

import { Imgkloa1, Imgkloa2 } from '/public/images'

export default function Header() {
  const pathName = usePathname();
  return (
    <>
    <header className='relative z-20'>
      <nav className='nav-bar bg-white dark:bg-[#33353a] dark:border-[#42464D] sm:flex-wrap sm:h-[110px]'>
        <div className='nav-left sm:pt-4 sm:pb-2 sm:px-0 sm:justify-center sm:flex-auto'>
          <Link href='/' as='/' className='logo-image-container'>
            <Image src={Imgkloa1} alt='KLOA ICON' width={100} height={30} className='default-image' />
            <Image src={Imgkloa2} alt='KLOA ICON Hover' width={100} height={30} className='hover-image' />
          </Link>
        </div>
        <div className='nav-center sm:pr-0 sm:pb-4 sm:justify-center '>
          <div className='nav-list'>
            <Link href='/notices?page=1' as='/notices?page=1' className={`drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc] ${pathName.includes('/notices') ? 'text-[#8045dd] dark:text-[#a36bfc] drop-in-underline-active' : 'text-[#7d8395]'}`}>공지사항</Link>
            <Link href='/characters' as='/characters' className={`drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc] ${pathName.includes('/characters') ? 'text-[#8045dd] dark:text-[#a36bfc] drop-in-underline-active' : 'text-[#7d8395]'}`}>전투정보실</Link>
            <Link href='/merchant' as='/merchant' className={`drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc] ${pathName.includes('/merchant') ? 'text-[#8045dd] dark:text-[#a36bfc] drop-in-underline-active' : 'text-[#7d8395]'}`}>떠돌이 상인</Link>
            <Link href='/sell' as='/sell' className={`drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc] ${pathName.includes('/sell') ? 'text-[#8045dd] dark:text-[#a36bfc] drop-in-underline-active' : 'text-[#7d8395]'}`}>아이템 거래</Link>
            <Link href='/crow' as='/crow' className={`drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc] ${pathName.includes('/crow') ? 'text-[#8045dd] dark:text-[#a36bfc] drop-in-underline-active' : 'text-[#7d8395]'}`}>계산기</Link>
          </div>
          <HeaderSearchForm />
        </div>
        <div className='nav-right'>
          <HeaderDarkMode />
          <HeaderLogin />
        </div>
      </nav>
    </header>
    <MobileMenu />
    </>
  )
}
