'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import EyeIcon from '@/assets/Icon/eye.svg'
import MococoIcon from '@/assets/Icon/mococo.svg'
import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import styled from './Notices.module.css';
import Link from 'next/link';

type props = any;

export default function PageNation({ postList }:props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageValue = searchParams.get('page');
  // Get currentPage from URL query, default to 1
  const currentPage = Number(pageValue) || 1;
  const totalCount = postList.length;
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
          <span className={styled.noticeTableBtnActive} key={i}
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
    const maxLength = postList.length < currentPage*10 ? postList.length : currentPage*10;
    const startPage = (currentPage-1) * 10;

    for(let i = startPage; i < maxLength; i++) {
      // console.log('temp ', temp[i]);

      const writeTimeDateType = new Date(postList[i].writeTime);
      const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;
      // console.log('writeTimeFormat ', writeTimeFormat);

      posts.push(
        <div className={styled.noticeTableRow} key={postList[i].id}>
          <div className={
            postList[i].category === '점검' ? `${styled.noticeCategory} ${styled.noticeCategoryCheck}` :
            postList[i].category === '이벤트' ? `${styled.noticeCategory} ${styled.noticeCategoryEvent}`
            : `${styled.noticeCategory}`}>{postList[i].category}
          </div>
          <div className={styled.noticeTitle}>{postList[i].title}</div>
          <div className={styled.noticeDate}>{writeTimeFormat}</div>
          <div className={styled.noticeViewCount}>
            <Image src={EyeIcon} alt='eye icon' />
            <span>{postList[i].viewCount}</span>
          </div>
          <div className={styled.notieLikeCount}>
            <Image src={MococoIcon} alt='mococo icon' />
            <span>{postList[i].likeCount}</span>
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
    <div className={styled.noticeBodyRow + ' ' + styled.noticeTable}>
      {postViewFunction()}
    </div>
    <div className={styled.noticeBodyRow + ' ' + styled.noticeManagerBtn}>
      <div className={styled.noticeTableBtnGroup}>
        <span onClick={() => prevPageChangeHandler()}>
          <Image src={LeftArrow} alt='left arrow icon'/>
        </span>
        {buttonViewFunction()}
        <span onClick={() => nextPageChangeHandler()}>
          <Image src={RightArrow} alt='right arrow icon' />
        </span>
      </div>
      {!manager && <Link href='/notices/write' className={styled.noticeManager}>글쓰기</Link>}
    </div>
    </>
  )
}
