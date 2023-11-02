import React from 'react'
import Image from 'next/image'

import LoginForm from './LoginForm'
import styled from './Login.module.css'
import SonabelArt from '@/assets/Art/SonabelArt.webp'

export default function Login() {
  return (
    <div className={styled.loginWrap}>
      <div className={styled.loginFormWrap}>
        <LoginForm />
      </div>
      <div className={styled.loginArt}>
        <Image src={SonabelArt} width={560} height={700} alt='login art image' />
      </div>
    </div>
  )
}
