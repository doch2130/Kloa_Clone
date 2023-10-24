'use client'
import React from 'react'

export default function NavSearch() {
  return (
    <form>
      <input type='text' placeholder='캐릭터명을 입력하세요' maxLength={12} value='' />
    </form>
  )
}
