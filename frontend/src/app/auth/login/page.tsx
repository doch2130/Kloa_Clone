'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

import CheckSvgComponent from '@/components/UI/CheckSvgComponent'

import styled from './Login.module.css'

export default function Login() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<Boolean>(false);
  const idInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);

  const isCheckhandler = () => {
    setIsCheck(!isCheck);
  }

  const onSubmit = async (e:React.FormEvent) => {
    e.stopPropagation();

    if(idInputRef.current === null || pwdInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요.');
      return ;
    }
    if(idInputRef.current?.value.trim() === '') {
      alert('아이디를 입력해주세요.');
      return ;
    }
    if(pwdInputRef.current?.value.trim() === '') {
      alert('비밀번호를 입력해주세요.');
      return ;
    }

    try {
      const response = await signIn('credentials', {
        email: idInputRef.current?.value,
        password: pwdInputRef.current?.value,
        redirect: false,
      });
      // console.log('response ', response);

      if(response) {
        if(response.ok) {
          alert('어서오세요!!');
          router.push('/');
        } else {
          alert('로그인 정보가 일치하지 않습니다.');
        }
        return ;
      } else {
        alert('로그인 시도에 실패하였습니다. 새로고침 후 다시 시도해주세요.');
        return ;
      }
    } catch (error) {
      // console.error('Fetch error: ', error);
      alert('로그인 시도에 실패하였습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  return (
    <form className={styled.loginForm} onSubmit={onSubmit}>
      <div className={styled.loginFormInputWrap}>
        <div>
          <input type='text' placeholder='이메일' name='id' ref={idInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
        <div>
          <input type='password' placeholder='비밀번호' name='password' ref={pwdInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
      </div>
      <button type='button' onClick={() => signIn('naver')} className={`${styled.naverLogin} dark:border-[#8991ee] dark:text-[#8991ee] dark:bg-[#2b2d31]`}>NAVER 로그인</button>
      <div className={styled.loginStay}>
        <CheckSvgComponent isCheck={isCheck} isCheckhandler={isCheckhandler} />
        <span className='dark:text-[#eaf0ec]' onClick={isCheckhandler}>로그인 상태 유지</span>
      </div>
      <div className={styled.empty}>
        <div></div>
      </div>
      <button type='button' className={styled.loginButton} onClick={onSubmit}>로그인</button>
      <div className={styled.lastGroup}>
        <Link href='/auth/signup' className='dark:text-[#8991ee]'>회원가입</Link>
        <Link href='/auth/login' onClick={() => alert('개발 중 입니다')}>앗, 비밀번호를 잊어버렸어요!</Link>
      </div>
    </form>
  )
}
