'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form"

import styled from './Rest.module.css'

type FormValues = {
  email: string
  authNumber: string
  password: string
  passwordCheck: string
}

export default function Rest() {
  const router = useRouter();
  const [authNumberBtnStatus, setAuthNumberBtnStatus] = useState<boolean>(false);
  const [authMailStatus, setAuthMailStatus] = useState<boolean>(false);
  const [authMailIsCheck, setAuthMailIsCheck] = useState<Boolean>(false);
  const [authMailTimerView, setAuthMailTimerView] = useState<number>(300);
  const [authMailTimer, setAuthMailTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, getValues, setValue, formState: { errors }, handleSubmit} = useForm<FormValues>({ mode: 'onChange' });

  // 이메일 인증번호 보내기
  const emailAuthenticationSend = async () => {
    setIsLoading(true);
    if(getValues('email').trim() === '') {
      alert('이메일을 입력해주세요.');
      setIsLoading(false);
      return ;
    }

    const email = getValues('email');

    const findUserResponse = await fetch(`/api/auth/rest?email=${email}`, {
      method: 'GET',
    });

    const findUserResult = await findUserResponse.json();

    if(findUserResult.status !== 200) {
      alert('가입하지 않은 이메일 주소 입니다.');
      setValue('email', '');
      setIsLoading(false);
      return ;
    }

    const response = await fetch(`/api/auth/mail/rest`, {
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

    if(data.status === 404) {
      setIsLoading(false);
      alert('사용할 수 없는 이메일 입니다.');
      return ;
    } else if(data.status === 200) {
      setIsLoading(false);
      setAuthNumberBtnStatus(true);
      alert('메일이 성공적으로 발송되었습니다.\r\n5분 이내에 인증번호를 입력해주세요.');
      setAuthMailStatus(true);
      mailAuthStartTimer();
      
      return ;
    }
    setIsLoading(false);
    return ;
  }

  // 이메일 인증번호 체크 함수
  const emailAuthenticationCheck = async () => {
    if(getValues('email').trim() === '') {
      alert('이메일을 입력해주세요');
      return ;
    }

    if(getValues('authNumber').trim() === '') {
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
          email: getValues('email'),
          number: getValues('authNumber')
        })
      });
      
      if(response.ok) {
        const res = await response.json();

        if(res.status === 204) {
          alert('인증번호가 일치하지 않습니다');
          return ;
        } else if(res.status === 200 && res.data.mailAuthNumber === getValues('authNumber')) {
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if(data.email.trim() === '') {
      alert('이메일을 입력해주세요');
      return ;
    }
    
    if(authMailIsCheck === false) {
      alert('이메일 인증을 완료해주세요');
      return ;
    }

    if(data.password.trim() === '') {
      alert('비밀번호를 입력해주세요');
      return ;
    }
    if(data.passwordCheck.trim() === '') {
      alert('비밀번호 확인을 입력해주세요');
      return ;
    }

    if(data.password !== data.passwordCheck) {
      alert('비밀번호가 동일하지 않습니다.')
      return ;
    }

    if(window.confirm('비밀번호를 변경하시겠습니까?')) {
      try {
        const response = await fetch('/api/auth/rest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: getValues('email'),
            password: getValues('password'),
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
    try {
      const response = await fetch(`/api/auth/mail`, {
        method: 'DELETE',
        body: JSON.stringify({
          email: getValues('email')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMailTimer]);

  return (
    <form className={styled.forgetPasswordForm}>
      <h1 className='dark:text-[#eaf0ec]'>비밀번호를 잊어버리셨나요?</h1>
      {!authMailIsCheck ?
      <>
      <p className={styled.subText}>가입할 때 사용한 이메일 주소를 입력하시면 인증코드를 보내드려요.<br />이메일에 표기된 인증코드를 입력해 주세요.</p>
      <div className={styled.forgetPasswordWrap}>
        <div className={styled.idGroup}>
          <input
            {...register("email",
              { 
                required: {
                  value: true,
                  message: '값을 입력해주세요',
                },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형태로 입력해주세요'
                }
              },
            )}
            type="text" id="email"
            placeholder="이메일 입력해주세요"
            disabled={authMailStatus}
            className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]'
          />
          <button type='button' onClick={emailAuthenticationSend} className={authMailStatus || isLoading ? `${styled.sendButtonUnActive} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.sendButton} dark:bg-[#33353a] dark:border-[#42464D]`} disabled={authMailStatus || isLoading} >전송</button>
        </div>
        <p className={styled.warningMessage}>{errors.email?.message}</p>
        <div className={styled.authNumberGroup}>
          <input
            {...register('authNumber')}
            type="text"
            name='authNumber'
            placeholder="인증번호 입력"
            disabled={!authNumberBtnStatus ? true : false}
            className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]'
          />
          <button type='button' disabled={!authNumberBtnStatus ? true : false} className={!authNumberBtnStatus ? `${styled.authNumberButton} dark:bg-[#33353a] dark:border-[#42464D]` : `${styled.authNumberButtonActive} dark:bg-[#33353a] dark:border-[#42464D]`}
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
          <input
            {...register("email",
              { 
                required: {
                  value: true,
                  message: '값을 입력해주세요',
                },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형태로 입력해주세요'
                }
              },
            )}
            type="text" id="email"
            placeholder="이메일 입력해주세요"
            disabled={authMailStatus}
            className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]'
          />
        </div>
        <div className={styled.pwdGroup}>          
          <input
            {...register('password',
              {
                required: {value: true, message: '값을 입력해주세요'},
                minLength: {
                  value: 8,
                  message: '8 ~ 20 글자 사이로 입력해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '8 ~ 20 글자 사이로 입력해주세요',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i,
                  message: '영어, 숫자, 특수기호를 포함하여 작성해주세요'
                },
              }
            )}
            className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]'
            type="password"
            name='password'
            placeholder='영어, 숫자, 특수문자를 포함한 8자리 이상 비밀번호 입력'
          />
        </div>
        <p className={styled.warningMessage}>{errors.password?.message}</p>

        <div className={styled.pwdCheckGroup}>          
          <input
            {...register('passwordCheck',
              {
                required: {value: true, message: '값을 입력해주세요'},
                minLength: {
                  value: 8,
                  message: '8 ~ 20 글자 사이로 입력해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '8 ~ 20 글자 사이로 입력해주세요',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i,
                  message: '영어, 숫자, 특수기호를 포함하여 작성해주세요'
                },
              }
            )}
            className='dark:bg-[#33353a] dark:border-[#42464D] dark:text-[#eaf0ec]'
            type="password"
            name='passwordCheck'
            placeholder='비밀번호 확인'
          />
        </div>
        <p className={styled.warningMessage}>{errors.passwordCheck?.message}</p>

      </div>
      <button type='button' className={styled.restButton} onClick={handleSubmit(onSubmit)}>비밀번호 변경</button>
      </>
    }
    </form>
  )
}
