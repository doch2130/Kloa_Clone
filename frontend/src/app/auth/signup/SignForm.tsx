'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CheckSvgComponent from '@/components/UI/CheckSvgComponent'
import styled from './Signup.module.css'

export default function SignForm() {
  const [isCheck, setIsCheck] = useState<Boolean>(false);
  const idInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const pwdCheckInputRef = useRef<HTMLInputElement>(null);
  const authNumberInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isCheckhandler = () => {
    setIsCheck(!isCheck);
  }

  const onSubmit = (e:any) => {
    e.stopPropagation();

    // if(idInputRef.current === null || pwdInputRef.current === null) {
    //   alert('잠시 후 다시 시도해주세요.');
    //   return ;
    // }
    // if(idInputRef.current?.value.trim() === '') {
    //   alert('아이디를 입력해주세요.');
    //   return;
    // }
    // if(pwdInputRef.current?.value.trim() === '') {
    //   alert('비밀번호를 입력해주세요.');
    //   return;
    // }

    // fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: idInputRef.current?.value,
    //     pwd: pwdInputRef.current?.value
    //   })
    // })
    //   .then((response) => {
    //     // console.log('response ', response);
    //     if (response.status === 401) {
    //       alert('사용자 정보가 일치하지 않습니다.');
    //       return false;
    //     }
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Network response was not ok');
    //     }
    //   })
    //   .then((data) => {
    //     // 데이터를 사용하는 코드를 여기에 작성
    //     // console.log('data ', data);
    //     if(data !== false) {
    //       alert('로그인 성공');
    //       router.push('/');
    //     }
    //   })
    //   .catch((error) => {
    //     // console.error('Fetch error: ', error);
    //     alert('로그인 시도에 실패하였습니다. 잠시 후 다시 시도해주세요.');
    //   });
  }
  
  return (
    <form className={styled.signForm} onSubmit={onSubmit}>
      <h1>모코코만큼 환영합니다.<br />회원가입을 진행해 볼까요?</h1>
      <div className={styled.signFormInputWrap}>
        <div className={styled.idGroup}>
          <input type='text' placeholder='이메일 입력' name='id' ref={idInputRef} />
          <button type='button'>전송</button>
        </div>
        <div className={styled.authNumberGroup}>
          <input type='text' placeholder='인증번호 입력' name='authNumber' ref={authNumberInputRef} />
          <button type='button'>확인</button>
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
            <Link href='https://kloa.gg/terms'>이용 약관</Link>
            과<Link href='https://kloa.gg/privacy'>개인정보 수집 및 이용</Link>에 동의합니다.
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
