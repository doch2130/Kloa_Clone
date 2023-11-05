'use client'
import React from 'react'
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function HeaderLogin() {
  const { data:session } = useSession();
  // console.log('session ', session);

  const logoutHandler = () => {
    if(window.confirm('로그아웃 하시겠습니까?')) {
      signOut()
    }
    return ;
  }

  return (
    <>
    {session?.user ? (
      <span className='duration-300 logoutBtn' onClick={() => logoutHandler()}>로그아웃</span>
    ) :
    (
      <Link href='/auth/login' className='duration-300'>로그인</Link>
    )
  }
    </>
  )
}
