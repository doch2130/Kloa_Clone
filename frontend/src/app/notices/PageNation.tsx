'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import EyeIcon from '@/assets/Icon/eye.svg'
import MococoIcon from '@/assets/Icon/mococo.svg'
import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import styeld from './Notices.module.css';

type props = any;

export default function PageNation({ temp }:props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageValue = searchParams.get('page');
  // Get currentPage from URL query, default to 1
  const currentPage = Number(pageValue) || 1;
  const totalCount = temp.length;
  const postPerPage = 10;
  const btnTotalCount = Math.ceil(totalCount / postPerPage);

  // 관리자 계정 테스트 용
  const manager = false;

  const prevPageChangeHandler = () => {
    if (currentPage <= 1) {
      return;
    }
    const newPage = currentPage - 1;
    router.push(`/notices?page=${newPage}`);
  };

  const nextPageChangeHandler = () => {
    if (currentPage >= btnTotalCount) {
      return;
    }
    const newPage = currentPage + 1;
    router.push(`/notices?page=${newPage}`);
  };

  const buttonViewFunction = () => {
    const buttons = [];
    for (let i = 1; i <= btnTotalCount; i++) {
      if (i === currentPage) {
        buttons.push(
          <span className={styeld.noticeTableBtnActive} key={i}
          onClick={() => router.push(`/notices?page=${i}`)}>
            {i}
          </span>
        );
      } else {
        buttons.push(<span key={i} onClick={() => router.push(`/notices?page=${i}`)}>{i}</span>);
      }
    }
    return buttons;
  };

  const postViewFunction = () => {
    const posts = [];
    const maxLength = temp.length < currentPage*10 ? temp.length : currentPage*10;
    const startPage = (currentPage-1) * 10;

    for(let i = startPage; i < maxLength; i++) {
      // console.log('temp ', temp[i]);
      posts.push(
        <div className={styeld.noticeTableRow} key={i}>
          <div className={styeld.noticeCategory}>공지</div>
          <div className={styeld.noticeTitle}>떠돌이 상인 시스템 개편에 따른 대응 방침 안내</div>
          <div className={styeld.noticeDate}>2023-08-02</div>
          <div className={styeld.noticeViewCount}>
            <Image src={EyeIcon} alt='eye icon' />
            <span>99999+</span>
          </div>
          <div className={styeld.notieLikeCount}>
            <Image src={MococoIcon} alt='mococo icon' />
            <span>941</span>
          </div>
        </div>
      )
    }

    return posts;
  }

  useEffect(() => {
    if(pageValue !== null) {
      if(Number(pageValue) > btnTotalCount) {
        alert('잘못된 경로입니다');
        router.push('/notices?page=1');
      }
    }
  })

  useEffect(() => {
    if(pageValue === null || pageValue === '') {
      router.push('/notices?page=1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div className={styeld.noticeBodyRow + ' ' + styeld.noticeTable}>
      {postViewFunction()}
    </div>
    <div className={styeld.noticeBodyRow + ' ' + styeld.noticeManagerBtn}>
      <div className={styeld.noticeTableBtnGroup}>
        <span onClick={() => prevPageChangeHandler()}>
          <Image src={LeftArrow} alt='left arrow icon'/>
        </span>
        {buttonViewFunction()}
        <span onClick={() => nextPageChangeHandler()}>
          <Image src={RightArrow} alt='right arrow icon' />
        </span>
      </div>
      {!manager && <button type='button' className={styeld.noticeManager}>글쓰기</button>}
    </div>
    </>
  )
}
