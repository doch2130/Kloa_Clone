'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { NoticePost } from '@/types/notice'
import { recomendEventHandler } from '../../noticesUtils';
import { getDetailPage, updateViewCount } from './detailUtils';

import { IconEye, IconMococo, IconList, IconUpArrow, IconDownArrow } from '/public/svgs';

import styled from '@/styles/NoticesDetail.module.css'


const initPostData:NoticePost = {
  id: 0,
  category: '',
  title: '',
  content: '',
  createdAt: '',
  viewCount: 0,
  recomendCount: 0,
}

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [postData, setPostData] = useState(initPostData);
  const [nextPostData, setNextPostData] = useState(initPostData);
  const [prevPostData, setPrevPostData] = useState(initPostData);

  const [width, setWidth] = useState(window?.innerWidth | 0);

  const { data: session } = useSession();

  const pageLoadHandler = async (id:number) => {
    try {
      const detailPage = await getDetailPage(id, setPostData, setNextPostData, setPrevPostData);
      if(detailPage.status === false) {
        alert('페이지 로딩 중 에러가 발생하였습니다.');
        router.push('/notices?page=1');
        return ;
      }

      // console.log('detailPage ', detailPage);
      if(detailPage.result === null) {
        alert('잘못된 접근입니다.');
        router.push('/notices?page=1');
        return ;
      }
    } catch (error) {
      // console.log('error ', error);
      alert('페이지 로딩 중 에러가 발생하였습니다.');
      router.push('/notices?page=1');
      return ;
    }
  }

  // 게시글 삭제 함수
  async function postDelete(id:number) {
    // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
    // caches.open('your-cache-name').then((cache) => {
    //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
    // });

    if(window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/notices/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            id: id
          })
        });
  
        const deleteResponse = await response.json();
        // console.log('deleteResponse ', deleteResponse);
  
        if(deleteResponse.status === 404) {
          alert('존재하지 않는 게시글입니다.');
          router.push('/notices?page=1');
          return ;
        }

        if(deleteResponse.status === 401 && deleteResponse.redirect === true) {
          alert('로그인이 만료되었습니다. 로그인 후 다시 시도해주세요');
          router.push('/auth/login');
          return ;
        }
  
        alert('게시글이 삭제되었습니다.');
        router.push('/notices?page=1');
        router.refresh();
  
        return ;
  
      } catch (error) {
        // console.error('Error while fetching data:', error);
        alert('삭제 중 에러가 발생하였습니다.');
        return ;
      }
    }
  }

  const recomendEvent = async () => {
    const result = await recomendEventHandler(postData.id, session);

    if(result.status === 200) {
      setPostData((prev: NoticePost) => ({
        ...prev,
        recomendCount: Number(result.recomendCount)
      }));
      
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

  useEffect(() => {
    // 현재, 다음, 이전 페이지 가져오기
    pageLoadHandler(Number(id));

    // 조회수 증가 함수
    updateViewCount(Number(id), setPostData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styled.postBody} bg-[#fff] dark:bg-[#2b2d31]`}>
      <div className={styled.postBodyWrap}>
        <div className={styled.postBodyRow}>
          <hr />
        </div>
        <div className={styled.postBodyRow}>
          <div className={`${styled.postTableRow} border-b-[1px] border-[#e6e8ec]`}>
            <div className={
              postData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck} border-[1px] border-[#e5e7eb] dark:border-[#646870]` :
              postData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent} border-[1px] border-[#e5e7eb] dark:border-[#646870]`
              : `${styled.postCategory} text-[#353945] border-[1px] border-[#e5e7eb] dark:text-[#eaf0ec] dark:border-[#646870]`}>
                {postData.category}
            </div>
            <div className={`${styled.postTitle} text-[#353945] dark:text-[#eaf0ec]`}>
              <span>
                {postData.title}
              </span>
            </div>
            <div className={styled.postSecondWrap}>
              <div className={`${styled.postDate} text-[#353945] dark:text-[#eaf0ec]`}>{postData.createdAt}</div>
              <div className={`${styled.postViewCount} text-[#353945] dark:text-[#eaf0eca2]`}>
                <Image src={IconEye} alt='eye icon' />
                <span className='dark:text-[#eaf0eca2]'>{postData.viewCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styled.postBodyRow + ' ' + styled.postBodyText}>
          <pre className='dark:text-[#eaf0ec]' dangerouslySetInnerHTML={{__html: postData.content}}>
          </pre>
        </div>
        <div className={styled.postBodyRow}>
          <div className={`${styled.postRecomendCount} text-[#7d8395] border-[1px] border-[#e6e8ec] dark:border-[#646870] bg-white dark:bg-[#33353a] hover:bg-[#fafbfb]`} onClick={() => recomendEvent()}>
            <Image src={IconMococo} alt='mococo icon' />
            <span>{postData.recomendCount}</span>
          </div>
        </div>
        <div className={styled.postBodyRow + ' ' + styled.postBodyButtonGroup}>
          <Link className='border-[1px] border-[#e6e8ec] dark:border-[#646870]' href='/notices?page=1'>
            <Image src={IconList} alt='list icon' width={23} height={23} className='dark:text-[#eaf0ec]' />
          </Link>
          <div className={styled.arrowButtonGroup}>
            <Link className='border-[1px] border-[#e6e8ec] dark:border-[#646870]' href={`/notices/detail/${Number(id)+1}`}>
              <Image src={IconUpArrow} alt='up arrow icon' width={23} height={23} />
            </Link>
            <Link className='border-[1px] border-[#e6e8ec] dark:border-[#646870]' href={`/notices/detail/${Number(id)-1}`}>
              <Image src={IconDownArrow} alt='down arrow icon' width={23} height={23} />
            </Link>
          </div>
        </div>

        {/* 관리자 버튼 */}
        {session?.user?.role === true && 
        <div className={styled.postBodyRow + ' ' + styled.postManager}>
          <Link className='border-[1px] border-[#e6e8ec] text-[#353945] dark:border-[#646870] dark:text-[#eaf0ec]' href={`/notices/update/${id}`}>수정</Link>
          <span className='border-[1px] border-[#e6e8ec] text-[#353945] dark:border-[#646870] dark:text-[#eaf0ec]' onClick={() => postDelete(Number(id))}>삭제</span>
        </div>
        }
        
        {/* 모바일에서는 안보이게 설정 */}
        {width > 1023 &&

        // {/* 다음, 현재, 이전 페이지 묶음 */}
        <div className={styled.postBodyRow + ' ' + styled.postBodyFooter}>
          {/* 다음 페이지 */}
          {nextPostData.id !== 0 && 
          <div className={`${styled.postTableRow} border-b-[1px] border-[#e6e8ec] hover:bg-[#fafbfb] dark:border-[#646870] dark:hover:bg-[#38393e]`}>
            <div className={
              nextPostData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck} border-[1px] border-[#e5e7eb] dark:border-[#646870]` :
              nextPostData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent} border-[1px] border-[#e5e7eb] dark:border-[#646870]`
              : `${styled.postCategory} text-[#353945] border-[1px] border-[#e5e7eb] dark:text-[#eaf0ec] dark:border-[#646870]`}>
                {nextPostData.category}
            </div>
            <div className={`${styled.postFooterTitle} text-[#353945]`}>
              <Link href={`/notices/detail/${nextPostData.id}`} className='text-[#353945] dark:text-[#eaf0ec]'>{nextPostData.title}</Link>
            </div>
            <div className={`${styled.postFooterDate} text-[#353945] dark:text-[#eaf0ec]`}>{nextPostData.createdAt}</div>
            <div className={`${styled.postFooterViewCount} text-[#353945]`}>
              <Image src={IconEye} alt='eye icon' />
              <span className='dark:text-[#eaf0eca2]'>{nextPostData.viewCount}</span>
            </div>
            <div className={`${styled.postFooterRecomendCount} text-[#7d8395] border-[1px] border-[#e6e8ec] dark:border-[#646870] bg-white dark:bg-[#33353a]`} onClick={() => recomendEvent()}>
              <Image src={IconMococo} alt='mococo icon' />
              <span>{nextPostData.recomendCount}</span>
            </div>
          </div>
          }
          
          {/* 현재 페이지 */}
          <div className={`${styled.postTableRow} ${styled.postTableCurrentActive} border-b-[1px] border-[#e6e8ec] hover:bg-[#fafbfb] dark:border-[#646870] dark:hover:bg-[#38393e]`}>
            <div className={
              postData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck} border-[1px] border-[#e5e7eb] dark:border-[#646870]` :
              postData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent} border-[1px] border-[#e5e7eb] dark:border-[#646870]`
              : `${styled.postCategory} text-[#353945] border-[1px] border-[#e5e7eb] dark:text-[#eaf0ec] dark:border-[#646870]`}>
                {postData.category}
            </div>
            <div className={`${styled.postFooterTitle} text-[#353945]`}>
              <Link href={`/notices/detail/${postData.id}`} className='text-[#8045dd] dark:text-[#a36bfc]'>{postData.title}</Link>
            </div>
            <div className={`${styled.postFooterDate} text-[#353945] dark:text-[#eaf0ec]`}>{postData.createdAt}</div>
            <div className={`${styled.postFooterViewCount} text-[#353945]`}>
              <Image src={IconEye} alt='eye icon' />
              <span className='dark:text-[#eaf0eca2]'>{postData.viewCount}</span>
            </div>
            <div className={`${styled.postFooterRecomendCount} text-[#7d8395] border-[1px] border-[#e6e8ec] dark:border-[#646870] bg-white dark:bg-[#33353a]`} onClick={() => recomendEvent()}>
              <Image src={IconMococo} alt='mococo icon' />
              <span>{postData.recomendCount}</span>
            </div>
          </div>

          {/* 이전 페이지 */}
          {prevPostData.id !== 0 && 
          <div className={`${styled.postTableRow} border-b-[1px] border-[#e6e8ec] hover:bg-[#fafbfb] dark:border-[#646870] dark:hover:bg-[#38393e]`}>
            <div className={
              prevPostData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck} border-[1px] border-[#e5e7eb] dark:border-[#646870]` :
              prevPostData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent} border-[1px] border-[#e5e7eb] dark:border-[#646870]`
              : `${styled.postCategory} text-[#353945] border-[1px] border-[#e5e7eb] dark:text-[#eaf0ec] dark:border-[#646870]`}>
                {prevPostData.category}
            </div>
            <div className={`${styled.postFooterTitle} text-[#353945]`}>
              <Link href={`/notices/detail/${prevPostData.id}`} className='text-[#353945] dark:text-[#eaf0ec]'>{prevPostData.title}</Link>
            </div>
            <div className={`${styled.postFooterDate} text-[#353945] dark:text-[#eaf0ec]`}>{prevPostData.createdAt}</div>
            <div className={`${styled.postFooterViewCount} text-[#353945]`}>
              <Image src={IconEye} alt='eye icon' />
              <span className='dark:text-[#eaf0eca2]'>{prevPostData.viewCount}</span>
            </div>
            <div className={`${styled.postFooterRecomendCount} text-[#7d8395] border-[1px] border-[#e6e8ec] dark:border-[#646870] bg-white dark:bg-[#33353a]`} onClick={() => recomendEvent()}>
              <Image src={IconMococo} alt='mococo icon' />
              <span>{prevPostData.recomendCount}</span>
            </div>
          </div>
          }
        </div>
        }
      </div>
    </div>
  )
}

