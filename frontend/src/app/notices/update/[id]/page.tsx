'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import TextEditor from '@/components/TextEditor/TextEditor'

import styled from './Update.module.css'

export default function Update() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [categoryData, setCategoryData] = useState('공지');
  const [textData, setTextData] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const [loadData, setLoadData] = useState({
    id: id,
    title: '',
  });

  useEffect(() => {
    fetch(`http://localhost:9999/mainNotices/${id}`)
      .then(res => res.json())
      .then(result => {
        
        if(result.id === undefined) {
          alert('잘못된 페이지 접근입니다.');
          router.push('/notices?page=1');
          return ;
        }

        setCategoryData(result.category);
        setTextData(result.textData);
        setLoadData({
          id: result.id,
          title: result.title,
        });

      })
      .catch(error => {
        alert('페이지 로딩 중 에러가 발생하였습니다.');
        router.push('/notices?page=1');
        return ;
      });
  }, []);

  const categorySelectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    setCategoryData(e.target.value);
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

    if(textData.trim() === '') {
      alert('내용을 입력해주세요.')
      return ;
    }

    if(window.confirm('작성한 내용으로 수정하시겠습니까?')) {


      fetch('/api/notices/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          category: categoryData,
          title: titleRef.current.value,
          textData: textData,
        })
      })
        .then(res => res.json())
        .then(res => {
          // console.log('res ', res);
          if(res.status === 200) {
            alert('게시글을 수정하였습니다.');
            router.push(`/notices/detail/${id}`);
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
    if(window.confirm('수정 중인 글을 취소하시겠습니까?')) {
      router.push(`/notices/detail/${id}`);
    }
    return ;
  }

  return (
    <div className={styled.body}>
      <div className={styled.wrap}>
        <div className={styled.title}>
          <h2>공지사항 글쓰기(수정)</h2>
        </div>
        <form className={styled.form} onSubmit={onSubmit}>
          <div className={styled.category}>
            <label htmlFor='category'>카테고리</label>
            <select name='category' id='category' onChange={(e:ChangeEvent<HTMLSelectElement>) => categorySelectHandler(e)} value={categoryData}>
              <option value='공지'>공지</option>
              <option value='점검'>점검</option>
              <option value='이벤트'>이벤트</option>
            </select>
          </div>
          <div className={styled.title}>
            <label htmlFor='title'>제목</label>
            <input type='text' placeholder='제목' name='title' id='title' ref={titleRef} defaultValue={loadData.title || ''} />
          </div>
          <div className={styled.textarea}>
            <TextEditor placeholderText={'내용을 입력해주세요'} name={'textarea'}
            setValueHandler={setTextData} initialValue={textData || ''} height={300} />
          </div>
          <div className={styled.buttonGroup}>
            <button type='button' onClick={cancel}>취소</button>
            <button type='button' onClick={onSubmit}>수정</button>
          </div>
        </form>
      </div>
    </div>
  )
}
