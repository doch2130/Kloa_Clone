import React from 'react'
import styled from './Login.module.css'
import Image from 'next/image'

import LoginArt from '@/assets/Login/loginArt.webp'
import LoginForm from './LoginForm'

export default function Login() {
  return (
    <div className={styled.loginWrap}>
      <div className={styled.loginFormWrap}>
        <LoginForm />
      </div>
      <div className={styled.loginArt}>
        <Image src={LoginArt} width={560} height={700} alt='login art image' />
      </div>
    </div>
  )
}
