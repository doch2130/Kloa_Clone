import React from 'react'
import Image from 'next/image'

import { ImgSonabelArt } from '/public/images'

import styled from '@/styles/AuthLayout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styled.wrap} bg-white dark:bg-[#2b2d31] absolute top-0 w-full h-full flex items-center`}>
      <div className={styled.form}>
        {children}
      </div>
      <div className={styled.authArt}>
        <Image src={ImgSonabelArt} alt='auth art image' />
      </div>
    </div>
  )
}
