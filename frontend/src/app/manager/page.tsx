'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import styled from './Manager.module.css'

export default function Manager() {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log('session ', session);

  const getNoticeList = async () => {
    fetch('/api/lostark/notices', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${session?.user?.accessToken}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        // console.log('Data from API:', data);
        if(data.redirect) {
          alert('인증이 만료되었습니다. 다시 로그인 해주세요.');
          router.push('/auth/login');
          return ;
        }

        if(data.status === 200) {
          alert('공지사항 데이터 갱신이 완료되었습니다.');
          return ;
        } else {
          alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
          return ;
        }

      })
      .catch((error) => {
        // console.error('Fetch error: ', error);
        alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
      });
  }


  const getCalendarList = () => {
    fetch('/api/lostark/calendar', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${session?.user?.accessToken}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        console.log('Data from API:', data);

        if(data.redirect) {
          alert('인증이 만료되었습니다. 다시 로그인 해주세요.');
          router.push('/auth/login');
          return ;
        }

        if(data.status === 200) {
          alert('모험 섬 데이터 갱신이 완료되었습니다.');
          return ;
        } else {
          alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
          return ;
        }


        
      })
      .catch((error) => {
        // console.error('Fetch error: ', error);
        alert('데이터 갱신 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
      });
  }

  return (
    <div className={styled.managerWrap}>
      <div>
        <h1>관리자 페이지</h1>
      </div>
      <div className={styled.managerRow}>
        <span>데이터 갱신하기</span>
        <div className={styled.managerButtonGroup}>
          <button type='button' className={styled.managerNotice} onClick={() => getNoticeList()}>공지사항</button>
          <button type='button' className={styled.managerSchedule} onClick={() => getCalendarList()}>스케줄</button>
        </div>
      </div>
    </div>
  )
}
