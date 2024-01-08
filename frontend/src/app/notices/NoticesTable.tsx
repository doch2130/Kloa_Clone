'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link'
import { useSession } from 'next-auth/react';

import { NoticePost } from '@/types/notice'
import { nextPageChangeHandler, prevPageChangeHandler, recomendEventHandler } from './noticesUtils';

import { IconEye, IconMococo, IconLeftArrow, IconRightArrow } from '/public/svgs';

import styled from '@/styles/Notices.module.css'

type NoticesTableProps = {
  postList: NoticePost[];
};

export default function NoticesTable({ postList }: NoticesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageValue = searchParams.get('page');
  const currentPage = Number(pageValue) || 1;
  const totalCount = postList.length || 0;
  const postPerPage = 10;
  const btnTotalCount = Math.ceil(totalCount / postPerPage);

  const [postData, setPostData] = useState(postList);
  const { data: session } = useSession();

  const recomendEvent = async (id:number) => {
    const result = await recomendEventHandler(id, session);

    if(result.status === 200) {
      const clonePostData = postData.map((el) => {
        if(el.id === id) {
          el.recomendCount = Number(result.recomendCount);
        }
        return el;
      });
      setPostData(clonePostData);

      return ;
    }

    if(result.status === 401 && result.redirect === false) {
      if(window.confirm('로그인 후 추천 가능합니다.\r\n로그인 페이지로 이동 하시겠습니까?')) {
        router.push('/auth/login');
      }
      return ;
    }

    if(result.status === 401 && result.redirect === true) {
      alert('로그인이 만료되었습니다. 다시 로그인 해주세요');
      router.push('/auth/login');
      return ;
    } else {
      alert('에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요');
      return ;
    }
  }

  const buttonViewFunction = ():React.JSX.Element[] => {
    const buttons = [];
    for (let i = 1; i <= btnTotalCount; i++) {
      if (i === currentPage) {
        buttons.push(
          <span className={`${styled.noticeTableBtnActive} border-[1px] border-[#5865f2] dark:text-[#eaf0ec] dark:border-[#8991ee]`} key={i}
          onClick={() => router.push(`/notices?page=${i}`)}>
            {i}
          </span>
        );
      } else {
        buttons.push(<span className='dark:text-[#eaf0ec] border-[1px] border-[#e6e8ec] dark:border-[#646870]' key={i} onClick={() => router.push(`/notices?page=${i}`)}>{i}</span>);
      }
    }
    return buttons;
  };

  const postViewFunction = ():React.JSX.Element[] => {
    const posts = [];
    const maxLength = postList.length < currentPage*10 ? postList.length : currentPage*10;
    const startPage = (currentPage-1) * 10;

    for(let i = startPage; i < maxLength; i++) {
      const writeTimeDateType = new Date(postList[i].createdAt);
      const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;
      // console.log('writeTimeFormat ', writeTimeFormat);

      posts.push(
        <div className={`${styled.noticeTableRow} border-b-[1px] border-[#e6e8ec] hover:bg-[#fafbfb] dark:border-[#646870] dark:hover:bg-[#38393e]`} key={postList[i].id}>
          <div className={
            postList[i].category === '점검' ? `${styled.noticeCategory} ${styled.noticeCategoryCheck} border-[1px] border-[#e5e7eb] dark:border-[#646870]` :
            postList[i].category === '이벤트' ? `${styled.noticeCategory} ${styled.noticeCategoryEvent} border-[1px] border-[#e5e7eb] dark:border-[#646870]`
            : `${styled.noticeCategory} text-[#353945] dark:text-[#eaf0ec] border-[1px] border-[#e5e7eb] dark:border-[#646870]`}>
              {postList[i].category}
          </div>
          <div className={`${styled.noticeTitle} text-[#353945]`}>
            <Link href={`/notices/detail/${postList[i].id}`} className='text-[#353945] dark:text-[#eaf0ec]'>{postList[i].title}</Link>
          </div>
          <div className={styled.noticeSecondWrap}>
            <div className={`${styled.noticeDate} text-[#353945] dark:text-[#eaf0ec]`}>{writeTimeFormat}</div>
            <div className={`${styled.noticeViewCount} text-[#353945]`}>
              <Image src={IconEye} alt='eye icon' />
              <span className='dark:text-[#eaf0eca2]'>{postList[i].viewCount}</span>
            </div>
            <div className={`${styled.notieRecomendCount} text-[#7d8395] border-[1px] border-[#e6e8ec] dark:border-[#646870] bg-white dark:bg-[#33353a]`} onClick={() => recomendEvent(postList[i].id)}>
              <Image src={IconMococo} alt='mococo icon' />
              <span>{postList[i].recomendCount}</span>
            </div>
          </div>
        </div>
      )
    }

    return posts;
  }


  useEffect(() => {
    if(pageValue === null || pageValue === '') {
      router.push('/notices?page=1');
      return ;
    }

    if(pageValue !== null) {
      if(Number(pageValue) > btnTotalCount) {
        alert('잘못된 경로입니다');
        router.push('/notices?page=1');
        return ;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue,]);

  return (
    <>
      <div className={styled.noticeBodyRow + ' ' + styled.noticeTable}>
        {postViewFunction()}
      </div>
      <div className={styled.noticeBodyRow + ' ' + styled.noticeManagerBtn}>
        <div className={`${styled.noticeTableBtnGroup}`}>
          <span className='border-[1px] border-[#e6e8ec] dark:border-[#646870]' onClick={() => {
            const result = prevPageChangeHandler(currentPage);
            if(result !== undefined) {
              router.push(result);
            }
          }}>
            <Image src={IconLeftArrow} alt='left arrow icon' />
          </span>
          {buttonViewFunction()}
          <span className='border-[1px] border-[#e6e8ec] dark:border-[#646870]' onClick={() => {
            const result = nextPageChangeHandler(currentPage, btnTotalCount);
            if(result !== undefined) {
              router.push(result);
            }
          }}>
            <Image src={IconRightArrow} alt='right arrow icon' />
          </span>
        </div>
        {session?.user?.role === true && <Link href='/notices/write' className={`${styled.noticeManager} text-[#5865f2] bg-[#fff] border-2 border-[#5865f2] dark:bg-[#33353a] dark:border-[#646870] dark:text-[#eaf0ec]`}>글쓰기</Link>}
      </div>
    </>
  )
}
