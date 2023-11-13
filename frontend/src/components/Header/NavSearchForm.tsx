'use client'
import React, { useRef, useState } from 'react'

export default function NavSearchForm() {
  const searchValueRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  
  const textChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  
  return (
    <form style={{display: 'inline-block'}}>
      <input id='characterName' ref={searchValueRef} className='bg-transparent dark:text-white placeholder:dark:text-[#656770]'
      type='text' placeholder='캐릭터명을 입력하세요' maxLength={12}
      onChange={(e) => textChange(e)} value={searchValue}/>
    </form>
  )
}
