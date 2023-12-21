import React from 'react'
import Image from 'next/image'

import SonabelArt from '@/assets/Art/SonabelArt.webp'

import styled from './AuthLayout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styled.wrap} bg-white dark:bg-[#2b2d31] absolute top-0 w-full h-full flex items-center`}>
      <div className={styled.form}>
        {children}
      </div>
      <div className={styled.authArt}>
        <Image src={SonabelArt} alt='auth art image' />
      </div>
    </div>
  )
}
