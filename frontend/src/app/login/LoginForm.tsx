'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LoginCheckSvg from './check.svg'
import styled from './Login.module.css'

export default function LoginForm() {
  return (
    <form className={styled.loginForm}>
      <div className={styled.loginFormInputWrap}>
        <div>
          <input type='text' placeholder='이메일' />
        </div>
        <div>
          <input type='text' placeholder='비밀번호' />
        </div>
      </div>
      <div className={styled.loginStay}>
        <Image src={LoginCheckSvg} alt='login stay check button' width={20} height={20} />
        <span>로그인 상태 유지</span>
      </div>
      <div className={styled.empty}>
        <div></div>
      </div>
      <button type='button' className={styled.loginButton}>로그인</button>
      <div className={styled.lastGroup}>
        <Link href='/'>회원가입</Link>
        <Link href='/'>앗, 비밀번호를 잊어버렸어요!</Link>
      </div>
    </form>
  )
}
