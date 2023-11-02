import React from 'react'
import Image from 'next/image'

import SignForm from './SignForm'
import styled from './Signup.module.css'
import SonabelArt from '@/assets/Art/SonabelArt.webp'

export default function Signup() {
  return (
    <div className={styled.signWrap}>
      <div className={styled.signFormWrap}>
        <SignForm />
      </div>
      <div className={styled.signupArt}>
        <Image src={SonabelArt} width={560} height={700} alt='signup art image' />
      </div>
    </div>
  )
}
