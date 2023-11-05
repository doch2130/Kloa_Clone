'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CheckSvgComponent from '@/components/UI/CheckSvgComponent'
import styled from './Signup.module.css'

export default function SignForm() {
  const [isCheck, setIsCheck] = useState<Boolean>(false);
  const [authNumberBtnStatus, setAuthNumberBtnStatus] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const pwdCheckInputRef = useRef<HTMLInputElement>(null);
  const authNumberInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isCheckhandler = () => {
    setIsCheck(!isCheck);
  }

  const emailAuthenticationSend = async () => {
    if(emailInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요');
      return ;
    }
    if(emailInputRef.current?.value.trim() === '') {
      alert('이메일을 입력해주세요.');
      return ;
    }

    const email = emailInputRef.current?.value;
    const response = await fetch(`/api/auth/mail`, {
      method: 'POST',
      body: JSON.stringify({
        email: email
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if(!response.ok) {
      throw new Error('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
    }

    if(data.status === 200) {
      setAuthNumberBtnStatus(true);
      alert('메일이 성공적으로 발송되었습니다.\r\n인증번호를 입력해주세요.');
      return ;
    }
    return ;
  }

  const onSubmit = async (e:any) => {
    e.stopPropagation();

    if(emailInputRef.current === null || authNumberInputRef.current === null || pwdInputRef.current === null || pwdCheckInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요');
      return ;
    }

    if(emailInputRef.current.value.trim() === '') {
      alert('이메일을 입력해주세요');
      return ;
    }
    
    if(authNumberBtnStatus === false) {
      // 인증번호 관리 후 추가 작업 필요
      alert('이메일 인증을 완료해주세요');
      return ;
    }

    if(pwdInputRef.current.value.trim() === '') {
      alert('비밀번호를 입력해주세요');
      return ;
    }
    if(pwdCheckInputRef.current.value.trim() === '') {
      alert('비밀번호 확인을 입력해주세요');
      return ;
    }

    if(pwdInputRef.current.value !== pwdCheckInputRef.current.value) {
      alert('비밀번호가 동일하지 않습니다.')
      return ;
    }

    if(isCheck === false) {
      alert('이용 약관과 개인정보 수집 및 이용에 동의하셔야합니다.');
      return ;
    }

    try {
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailInputRef.current.value,
          pwd: pwdInputRef.current.value,
          privacy: isCheck
        })
      });

      alert('회원가입이 완료되었습니다.');
      router.push('/auth/login');
      return ;
    } catch (err) {
      alert('회원가입 중 에러가 발생하였습니다.');
      return ;
    }

  }

  return (
    <form className={styled.signForm} onSubmit={onSubmit}>
      <h1>모코코만큼 환영합니다.<br />회원가입을 진행해 볼까요?</h1>
      <div className={styled.signFormInputWrap}>
        <div className={styled.idGroup}>
          <input type='text' placeholder='이메일 입력' name='id' ref={emailInputRef} />
          <button type='button' onClick={emailAuthenticationSend} className={styled.sendButton}>전송</button>
        </div>
        <div className={styled.authNumberGroup}>
          <input type='text' placeholder='인증번호 입력' name='authNumber' ref={authNumberInputRef} disabled={!authNumberBtnStatus ? true : false} />
          <button type='button' disabled={!authNumberBtnStatus ? true : false} className={!authNumberBtnStatus ? styled.authNumberButton : styled.authNumberButtonActive} >확인</button>
        </div>
        <div className={styled.pwdGroup}>
          <input type='password' placeholder='영어, 숫자, 특수문자를 포함한 8자리 이상 비밀번호 입력' name='pwd' ref={pwdInputRef} />
        </div>
        <div className={styled.pwdCheckGroup}>
          <input type='password' placeholder='비밀번호 확인' name='pwdCheck' ref={pwdCheckInputRef} />
        </div>
        <div className={styled.privacyGroup}>
          <CheckSvgComponent isCheck={isCheck} isCheckhandler={isCheckhandler} />
          <span onClick={isCheckhandler}>
            <Link href='https://kloa.gg/terms'>이용 약관</Link>과 <Link href='https://kloa.gg/privacy'>개인정보 수집 및 이용</Link>에 동의합니다.
          </span>
        </div>
      </div>
      <button type='button' className={styled.signButton} onClick={onSubmit}>회원가입</button>
      <div className={styled.lastGroup}>
        <Link href='/auth/login'>로그인하기</Link>
      </div>
    </form>
  )
}