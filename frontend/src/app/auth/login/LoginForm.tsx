'use client'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

import { signIn } from "next-auth/react";

import Link from 'next/link'
import CheckSvgComponent from '@/components/UI/CheckSvgComponent'

import styled from './Login.module.css'

export default function LoginForm() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<Boolean>(false);
  const idInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);

  const isCheckhandler = () => {
    setIsCheck(!isCheck);
  }

  const onSubmit = (e:React.FormEvent) => {
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

    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        id: idInputRef.current?.value,
        pwd: pwdInputRef.current?.value
      })
    })
      .then((response) => {
        // console.log('response ', response);
        if (response.status === 401) {
          alert('사용자 정보가 일치하지 않습니다.');
          return false;
        }
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(async (data) => {
        // 데이터를 사용하는 코드를 여기에 작성
        // console.log('data ', data);
        if(data !== false) {
          const result = await signIn('credentials', {
            email: idInputRef.current?.value,
            redirect: false,
          });
          // console.log('result ', result);
          alert('로그인 성공');
          router.push('/');
        }
      })
      .catch((error) => {
        // console.error('Fetch error: ', error);
        alert('로그인 시도에 실패하였습니다. 잠시 후 다시 시도해주세요.');
      });
  }

  return (
    <form className={styled.loginForm} onSubmit={onSubmit}>
      <div className={styled.loginFormInputWrap}>
        <div>
          <input type='text' placeholder='이메일' name='id' ref={idInputRef} />
        </div>
        <div>
          <input type='password' placeholder='비밀번호' name='pwd' ref={pwdInputRef} />
        </div>
      </div>
      <button type='button' onClick={() => signIn('naver')} className={styled.naverLogin}>NAVER 로그인</button>
      <div className={styled.loginStay}>
        <CheckSvgComponent isCheck={isCheck} isCheckhandler={isCheckhandler} />
        <span onClick={isCheckhandler}>로그인 상태 유지</span>
      </div>
      <div className={styled.empty}>
        <div></div>
      </div>
      <button type='button' className={styled.loginButton} onClick={onSubmit}>로그인</button>
      <div className={styled.lastGroup}>
        <Link href='/auth/signup'>회원가입</Link>
        <Link href='/auth/login' onClick={() => alert('개발 중 입니다')}>앗, 비밀번호를 잊어버렸어요!</Link>
      </div>
    </form>
  )
}
