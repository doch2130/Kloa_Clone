'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
// import TextEditor from '@/components/TextEditor/TextEditor'

import styled from './Write.module.css'
import { useSession } from 'next-auth/react';


const TextEditor = dynamic(() => import('@/components/TextEditor/TextEditor'), {
  ssr: false,
});

export default function Write() {
  const [categoryData, setCategoryData] = useState('공지');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: session } = useSession();

  const categorySelectHandler = (e:ChangeEvent<HTMLSelectElement>):void => {
    // console.log(e.target.value);
    setCategoryData(e.target.value);
    return ;
  }

  const onSubmit = (e:React.FormEvent) => {
    e.stopPropagation();

    if(titleRef.current === null) {
      alert('잠시 후 다시 시도해주세요.');
      return ;
    }

    if(titleRef.current.value.trim() === '') {
      alert('제목을 입력해주세요.');
      return ;
    }

    if(content.trim() === '') {
      alert('내용을 입력해주세요.')
      return ;
    }

    if(window.confirm('작성한 내용으로 등록하시겠습니까?')) {
      fetch('/api/notices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          category: categoryData,
          title: titleRef.current.value,
          content: content,
          user: session?.user?.email
        })
      })
        .then(res => res.json())
        .then(res => {
          if(res.status === 201) {
            alert('게시글을 등록하였습니다.');
            router.push('/notices?page=1');
            router.refresh();
            return ;
          } else if(res.status === 401 && res.redirect === true) {
            alert('로그인이 만료되었습니다. 로그인 후 다시 시도해주세요');
            router.push('/auth/login');
            return ;
          } else {
            alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.');
            return ;
          }
        })
        .catch(err => {
          alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.');
          return ;
        })
    }

    return ;
  }

  const cancel = () => {
    if(window.confirm('작성 중인 글을 취소하시겠습니까?')) {
      router.push('/notices?page=1');
    }
    return ;
  }

  return (
    <div className={`${styled.body} dark:bg-[#2b2d31]`}>
      <div className={styled.wrap}>
        <form className={styled.form} onSubmit={onSubmit}>
          <div className={styled.category}>
            <label htmlFor='category' className='dark:text-[#eaf0ec]'>카테고리</label>
            <select name='category' id='category' className='dark:bg-[#2b2d31] dark:border-[1px] dark:border-[#eaf0ec] dark:text-[#eaf0ec]' onChange={(e:ChangeEvent<HTMLSelectElement>) => categorySelectHandler(e)}>
              <option value='공지'>공지</option>
              <option value='점검'>점검</option>
              <option value='이벤트'>이벤트</option>
            </select>
          </div>
          <div className={styled.title}>
            <label htmlFor='title' className='dark:text-[#eaf0ec]'>제목</label>
            <input type='text' placeholder='제목을 입력하세요' name='title' id='title' ref={titleRef}
            className='dark:bg-[#2b2d31] dark:border-[1px] dark:border-[#eaf0ec] dark:text-[#eaf0ec] placeholder:dark:text-[#656770]' />
          </div>
          <div className={`${styled.textarea} dark:bg-[#ffffff]`}>
            <TextEditor placeholderText={'내용을 입력해주세요'} name={'textarea'}
            setValueHandler={setContent} initialValue={content} height={300} />
          </div>
          <div className={styled.buttonGroup}>
            <button type='button' className='dark:bg-[#33353a] dark:border-[#646870] dark:text-[#eaf0ec]' onClick={cancel}>취소</button>
            <button type='button' className='dark:bg-[#33353a] dark:border-[#646870] dark:text-[#eaf0ec]' onClick={onSubmit}>완료</button>
          </div>
        </form>
      </div>
    </div>
  )
}
