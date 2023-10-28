'use client'
import React from 'react'

export default function NavSearchForm() {
  const textChange = () => {
  }
  return (
    <form style={{display: 'inline-block'}}>
      <input type='text' placeholder='캐릭터명을 입력하세요' maxLength={12} value='' onChange={() => textChange}/>
    </form>
  )
}
