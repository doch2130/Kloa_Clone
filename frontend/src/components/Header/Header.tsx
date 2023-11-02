import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavSearchForm from './NavSearchForm'

import Kloa1Icon from '@/assets/Logo/kloa1.webp'
import Kloa2Icon from '@/assets/Logo/kloa2.webp'
import SearchIcon from '@/assets/Icon/search.svg'
import SunModeIcon from '@/assets/Icon/sun.svg'
import MoonModeIcon from '@/assets/Icon/moon.svg'

export default function Header() {
  return (
    <header style={{backgroundColor: 'white'}}>
      <nav className='nav-bar'>
        <div className='nav-left'>
          <Link href='/'>
            <Image src={Kloa1Icon} alt='KLOA ICON' width={100} height={30} />
          </Link>
        </div>
        <div className='nav-center'>
          <div className='nav-list'>
            <Link href='/notices' className='drop-in-underline duration-300'>공지사항</Link>
            <Link href='/characters' className='drop-in-underline duration-300'>전투정보실</Link>
            <Link href='/merchant' className='drop-in-underline duration-300'>떠돌이 상인</Link>
            <Link href='/sell' className='drop-in-underline duration-300'>아이템 거래</Link>
            <Link href='/crow' className='drop-in-underline duration-300'>계산기</Link>
          </div>
          <div className='nav-search'>
            <Image src={SearchIcon} alt='SearchIcon' />
            <NavSearchForm />
          </div>
        </div>
        <div className='nav-right'>
          <button type='button' className='duration-300'>
            <Image src={MoonModeIcon} alt='MoonMode' />
          </button>
          <Link href='/login' className='duration-300'>로그인</Link>
        </div>
      </nav>
    </header>
  )
}
