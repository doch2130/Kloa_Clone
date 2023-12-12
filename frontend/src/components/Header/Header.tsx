import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import HeaderSearchForm from './HeaderSearchForm'
import HeaderDarkMode from './HeaderDarkMode'
import HeaderLogin from './HeaderLogin'

import Kloa1Icon from '@/assets/Logo/kloa1.webp'
import Kloa2Icon from '@/assets/Logo/kloa2.webp'

export default function Header() {
  return (
    <header>
      <nav className='nav-bar bg-white dark:bg-[#33353a] dark:border-[#42464D]'>
        <div className='nav-left'>
          <Link href='/' as='/' className='logo-image-container'>
            <Image src={Kloa1Icon} alt='KLOA ICON' width={100} height={30} className='default-image' />
            <Image src={Kloa2Icon} alt='KLOA ICON Hover' width={100} height={30} className='hover-image' />
          </Link>
        </div>
        <div className='nav-center'>
          <div className='nav-list'>
            <Link href='/notices?page=1' as='/notices?page=1' className='drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc]'>공지사항</Link>
            <Link href='/characters' as='/characters' className='drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc]'>전투정보실</Link>
            <Link href='/merchant' as='/merchant' className='drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc]'>떠돌이 상인</Link>
            <Link href='/sell' as='/sell' className='drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc]'>아이템 거래</Link>
            <Link href='/crow' as='/crow' className='drop-in-underline duration-300 dark:text-[#B9BBBE] dark:hover:text-[#a36bfc]'>계산기</Link>
          </div>
          <HeaderSearchForm />
        </div>
        <div className='nav-right'>
          <HeaderDarkMode />
          <HeaderLogin />
        </div>
      </nav>
    </header>
  )
}
