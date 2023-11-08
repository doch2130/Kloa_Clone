import React from 'react'
import Image from 'next/image'

import SonabelArt from '@/assets/Art/SonabelArt.webp'

import styled from './AuthLayout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styled.wrap}>
      <div className={styled.form}>
        {children}
      </div>
      <div className={styled.authArt}>
        <Image src={SonabelArt} width={560} height={700} alt='auth art image' />
      </div>
    </div>
  )
}
