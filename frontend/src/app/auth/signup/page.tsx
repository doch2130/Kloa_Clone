'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import CheckSvgComponent from '@/components/UI/CheckSvgComponent'

import styled from './Signup.module.css'

export default function Signup() {
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
      alert('메일이 성공적으로 발송되었습니다.\r\n5분 이내에 인증번호를 입력해주세요.');
      setAuthMailStatus(true);
      mailAuthStartTimer();
      return ;
    }
    return ;
  }

  const emailAuthenticationCheck = async () => {
    if(!authNumberInputRef.current || !emailInputRef.current) {
      alert('잠시 후 다시 시도해주세요.');
      return ;
    }

    if(emailInputRef.current.value.trim() === '') {
      alert('이메일을 입력해주세요');
      return ;
    }

    if(authNumberInputRef.current.value.trim() === '') {
      alert('인증번호를 입력해주세요');
      return ;
    }

    try {
      const response = await fetch('/api/auth/mail/check', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: emailInputRef.current.value,
          number: authNumberInputRef.current.value
        })
      });
      
      if(response.ok) {
        const res = await response.json();

        if(res.status === 204) {
          alert('인증번호가 일치하지 않습니다');
          return ;
        } else if(res.data[0].mailNumber === authNumberInputRef.current.value) {
          setAuthNumberBtnStatus(false);
          setAuthMailIsCheck(true);
          mailAuthStopTimer();
          expireMailNumber();
          alert('메일 인증이 완료되었습니다.');
        } else {
          alert('인증번호가 일치하지 않습니다');
          return ;
        }
        return ;
      }

    } catch (err) {
      alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
      return ;
    }
  }

  const onSubmit = async (e:React.FormEvent) => {
    e.stopPropagation();

    if(emailInputRef.current === null || authNumberInputRef.current === null || pwdInputRef.current === null || pwdCheckInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요');
      return ;
    }

    if(emailInputRef.current.value.trim() === '') {
      alert('이메일을 입력해주세요');
      return ;
    }
    
    if(authMailIsCheck === false) {
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

    if(window.confirm('작성한 정보로 가입하시겠습니까?')) {
      try {
        const result = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: pwdInputRef.current.value,
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
    
    return ;
  }

  const mailAuthStartTimer = () => {
    const timer = setInterval(() => {
      setAuthMailTimerView((prev) => prev - 1);
    }, 1000);
    setAuthMailTimer(timer);

    return () => {
      clearInterval(timer);
    };
  };

  const mailAuthStopTimer = () => {
    if (authMailTimer) {
      clearInterval(authMailTimer); // 타이머 중지
      setAuthMailTimer(undefined); // 타이머 ID 초기화
    }
  };

  const expireMailNumber = async () => {
    if(!emailInputRef.current) {
      alert('잠시 후 다시 시도해주세요');
      return ;
    }

    try {
      const response = await fetch(`/api/auth/mail`, {
        method: 'DELETE',
        body: JSON.stringify({
          email: emailInputRef.current.value
        })
      });
  
      if(response.ok) {
        const data = await response.json();
        if(data.status === 200 || data.status === 404) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    if (authMailTimerView === 0) {
      expireMailNumber();
      setAuthMailTimerView(0);
      mailAuthStopTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMailTimerView]);
  
  useEffect(() => {
    return () => {
      if (authMailTimer !== undefined) {
        clearInterval(authMailTimer);
        expireMailNumber();
      }
    }
  }, [authMailTimer]);
  

  return (
    <form className={styled.signForm} onSubmit={onSubmit}>
      <h1>모코코만큼 환영합니다.<br />회원가입을 진행해 볼까요?</h1>
      <div className={styled.signFormInputWrap}>
        <div className={styled.idGroup}>
          <input type='text' placeholder='이메일 입력' name='email' ref={emailInputRef} disabled={authMailStatus} />
          <button type='button' onClick={emailAuthenticationSend} className={authMailStatus ? styled.sendButtonUnActive : styled.sendButton} disabled={authMailStatus} >전송</button>
        </div>
        <div className={styled.authNumberGroup}>
          <input type='text' placeholder='인증번호 입력' name='authNumber' ref={authNumberInputRef} disabled={!authNumberBtnStatus ? true : false} />
          <button type='button' 
          disabled={!authNumberBtnStatus ? true : false} className={!authNumberBtnStatus ? styled.authNumberButton : styled.authNumberButtonActive}
          onClick={() => emailAuthenticationCheck()} >확인</button>
          {(authMailStatus && authNumberBtnStatus) && <p className={styled.authNumberTimer}>{authMailTimerView}초</p>}
        </div>
        <div className={styled.pwdGroup}>
          <input type='password' placeholder='영어, 숫자, 특수문자를 포함한 8자리 이상 비밀번호 입력' name='password' ref={pwdInputRef} />
        </div>
        <div className={styled.pwdCheckGroup}>
          <input type='password' placeholder='비밀번호 확인' name='passwordCheck' ref={pwdCheckInputRef} />
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