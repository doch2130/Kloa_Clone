'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styled from './Rest.module.css'

export default function Rest() {
  const router = useRouter();
  const [authNumberBtnStatus, setAuthNumberBtnStatus] = useState<boolean>(false);
  const [authMailStatus, setAuthMailStatus] = useState<boolean>(false);
  const [authMailIsCheck, setAuthMailIsCheck] = useState<Boolean>(false);
  const [authMailTimerView, setAuthMailTimerView] = useState<number>(300);
  const [authMailTimer, setAuthMailTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const pwdCheckInputRef = useRef<HTMLInputElement>(null);
  const authNumberInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 이메일 인증번호 보내기
  const emailAuthenticationSend = async () => {
    setIsLoading(true);
    if(emailInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요');
      setIsLoading(false);
      return ;
    }
    if(emailInputRef.current?.value.trim() === '') {
      alert('이메일을 입력해주세요.');
      setIsLoading(false);
      return ;
    }

    const email = emailInputRef.current?.value;

    const findUserResponse = await fetch(`/api/auth/rest?email=${email}`, {
      method: 'GET',
    });

    const findUserResult = await findUserResponse.json();

    if(findUserResult.status !== 200) {
      alert('가입하지 않은 이메일 주소 입니다.');
      emailInputRef.current.value = '';
      setIsLoading(false);
      return ;
    }

    const response = await fetch(`/api/auth/mail`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        type: 'rest'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if(!response.ok) {
      setIsLoading(false);
      throw new Error('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
    }

    if(data.status === 409) {
      setIsLoading(false);
      alert('사용할 수 없는 이메일 입니다.');
      return ;
    } else if(data.status === 200) {
      setAuthNumberBtnStatus(true);
      alert('메일이 성공적으로 발송되었습니다.\r\n5분 이내에 인증번호를 입력해주세요.');
      setAuthMailStatus(true);
      mailAuthStartTimer();
      setIsLoading(false);
      return ;
    }
    setIsLoading(false);
    return ;
  }

  // 이메일 인증번호 체크 함수
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
        } else if(res.status === 200 && res.data.mailAuthNumber === authNumberInputRef.current.value) {
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

    if(emailInputRef.current === null || pwdInputRef.current === null || pwdCheckInputRef.current === null) {
      alert('잠시 후 다시 시도해주세요');
      return ;
    }

    if(emailInputRef.current.value.trim() === '') {
      alert('잘못된 접근 방식입니다.');
      router.refresh();
      return ;
    }
    
    if(authMailIsCheck === false) {
      alert('잘못된 접근 방식입니다.');
      router.refresh();
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

    if(window.confirm('작성한 정보로 가입하시겠습니까?')) {
      try {
        const response = await fetch('/api/auth/rest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: pwdInputRef.current.value,
          })
        });
 
        const result = await response.json();

        if(result.status === 500) {
          alert('회원가입 중 에러가 발생하였습니다.');
          return ;
        }
        
        alert('비밀번호 변경이 완료되었습니다.');
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


  useEffect(() => {
    if(!pwdInputRef?.current) {
      return ;
    }

    pwdInputRef.current.value = '';
  }, [authMailIsCheck]);


  return (
    <form className={styled.forgetPasswordForm}>
      <h1 className='dark:text-[#eaf0ec]'>비밀번호를 잊어버리셨나요?</h1>
      {!authMailIsCheck ?
      <>
      <p className={styled.subText}>가입할 때 사용한 이메일 주소를 입력하시면 인증코드를 보내드려요.<br />이메일에 표기된 인증코드를 입력해 주세요.</p>
      <div className={styled.forgetPasswordWrap}>
        <div className={styled.idGroup}>
          <input type='text' placeholder='이메일 입력' name='email' ref={emailInputRef} disabled={authMailStatus} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
          <button type='button' onClick={emailAuthenticationSend} className={authMailStatus || isLoading ? `${styled.sendButtonUnActive} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.sendButton} dark:bg-[#33353a] dark:border-[#42464D]`} disabled={authMailStatus || isLoading} >전송</button>
        </div>
        <div className={styled.authNumberGroup}>
          <input type='text' placeholder='인증번호 입력' name='authNumber' ref={authNumberInputRef} disabled={!authNumberBtnStatus ? true : false} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
          <button type='button' 
          disabled={!authNumberBtnStatus ? true : false} className={!authNumberBtnStatus ? `${styled.authNumberButton} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.authNumberButtonActive} dark:bg-[#33353a] dark:border-[#42464D]`}
          onClick={() => emailAuthenticationCheck()} >확인</button>
          {(authMailStatus && authNumberBtnStatus) && <p className={styled.authNumberTimer}>{authMailTimerView}초</p>}
        </div>
      </div>
      </>
      :
      <>
      <p className={styled.subText}>변경하실 비밀번호를 입력해주세요.</p>
      <div className={`${styled.forgetPasswordWrap} ${styled.forgetPasswordWrap2}`}>
        <div className={`${styled.idGroup} ${styled.idGroup2}`}>
          <input type='text' placeholder='이메일 입력' name='email' ref={emailInputRef} disabled={authMailStatus} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
        <div className={styled.pwdGroup}>
          <input type='password' placeholder='영어, 숫자, 특수문자를 포함한 8자리 이상 비밀번호 입력' name='password' ref={pwdInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
        <div className={styled.pwdCheckGroup}>
          <input type='password' placeholder='비밀번호 확인' name='passwordCheck' ref={pwdCheckInputRef} className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]' />
        </div>
      </div>
      <button type='button' className={styled.restButton} onClick={onSubmit}>비밀번호 변경</button>
      </>
    }
    </form>
  )
}
