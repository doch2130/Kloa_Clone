'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styled from './Rest.module.css'

export default function Rest() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<Boolean>(false);
  const [authNumberBtnStatus, setAuthNumberBtnStatus] = useState<boolean>(false);
  const [authMailStatus, setAuthMailStatus] = useState<boolean>(false);
  const [authMailIsCheck, setAuthMailIsCheck] = useState<Boolean>(false);
  const [authMailTimerView, setAuthMailTimerView] = useState<number>(300);
  const [authMailTimer, setAuthMailTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const pwdCheckInputRef = useRef<HTMLInputElement>(null);
  const authNumberInputRef = useRef<HTMLInputElement>(null);

  const emailAuthenticationSend = () => {};
  const emailAuthenticationCheck = () => {};

  return (
    <form className={styled.forgetPasswordForm}>
      <h1 className='dark:text-[#eaf0ec]'>비밀번호를 잊어버리셨나요?</h1>
      <p className={styled.subText}>가입할 때 사용한 이메일 주소를 입력하시면 인증코드를 보내드려요.<br />이메일에 표기된 인증코드를 입력해 주세요.</p>
      <div className={styled.forgetPasswordWrap}>
        <div className={styled.idGroup}>
          <input type='text' placeholder='이메일 입력' name='email' ref={emailInputRef} disabled={authMailStatus} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
          <button type='button' onClick={emailAuthenticationSend} className={authMailStatus ? `${styled.sendButtonUnActive} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.sendButton} dark:bg-[#33353a] dark:border-[#42464D]`} disabled={authMailStatus} >전송</button>
        </div>
        <div className={styled.authNumberGroup}>
          <input type='text' placeholder='인증번호 입력' name='authNumber' ref={authNumberInputRef} disabled={!authNumberBtnStatus ? true : false} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
          <button type='button' 
          disabled={!authNumberBtnStatus ? true : false} className={!authNumberBtnStatus ? `${styled.authNumberButton} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.authNumberButtonActive} dark:bg-[#33353a] dark:border-[#42464D]`}
          onClick={() => emailAuthenticationCheck()} >확인</button>
          {(authMailStatus && authNumberBtnStatus) && <p className={styled.authNumberTimer}>{authMailTimerView}초</p>}
        </div>
        {/* <div className={styled.pwdGroup}>
          <input type='password' placeholder='영어, 숫자, 특수문자를 포함한 8자리 이상 비밀번호 입력' name='password' ref={pwdInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
        <div className={styled.pwdCheckGroup}>
          <input type='password' placeholder='비밀번호 확인' name='passwordCheck' ref={pwdCheckInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div> */}
      </div>
    </form>
  )
}
