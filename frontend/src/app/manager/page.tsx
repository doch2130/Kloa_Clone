'use client'
import React from 'react'
import styled from './Manager.module.css'

export default function Manager() {
  return (
    <div className={styled.managerWrap}>
      <div>
        <h1>관리자 페이지</h1>
      </div>
      <div className={styled.managerRow}>
        <span>데이터 갱신하기</span>
        <div className={styled.managerButtonGroup}>
          <button type='button' className={styled.managerNotice} onClick={() => getNoticeList()}>공지사항</button>
          <button type='button' className={styled.managerSchedule}>스케줄</button>
        </div>
      </div>
    </div>
  )
}


const getNoticeList = () => {
  fetch('/api/notices', {
    method: 'GET'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      // 데이터를 사용하는 코드를 여기에 작성
      // console.log('Data from API:', data);
      updateNoticeList(data);
    })
    .catch((error) => {
      console.error('Fetch error: ', error);
      alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
    });
}

type noticeData = {
  Title: string,
  Date: Date,
  Link: string,
  Type: string,
}

const updateNoticeList = (data:noticeData[]) => {
  fetch('http://localhost:9999/notices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.slice(0, 5))
  })
    .then(res => res.json())
    .then(result => {
      // console.log(result);
      alert('데이터 갱신이 완료되었습니다.');
    })
    .catch((error) => {
      console.error('Update error: ', error);
      alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
    });
}
