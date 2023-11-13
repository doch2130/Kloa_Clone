'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { NoticePost } from '@/type/notice'
import { recomendEventHandler } from '../../noticesUtils';
import { getDetailPage, updateViewCount } from './detailUtils';

import EyeIcon from '@/assets/Icon/eye.svg'
import MococoIcon from '@/assets/Icon/mococo.svg'
import ListIcon from '@/assets/Icon/list.svg'
import UpArrow from '@/assets/Icon/upArrow.svg'
import DownArrow from '@/assets/Icon/downArrow.svg'

import styled from './Detail.module.css'


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

  const { data: session } = useSession();

  const pageLoadHandler = async () => {
    const detailPage = await getDetailPage(Number(id), setPostData, setNextPostData, setPrevPostData);
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
  }
  
  useEffect(() => {
    // 현재, 다음, 이전 페이지 가져오기
    pageLoadHandler();

    // 조회수 증가 함수
    updateViewCount(Number(id), setPostData);
  }, []);




  // 게시글 삭제 함수
  async function postDelete(id:number) {
    // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
    // caches.open('your-cache-name').then((cache) => {
    //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
    // });

    try {
      const response = await fetch('/api/notices/delete', {
        method: 'DELETE',
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

  return (
    <div className={styled.postBody}>
      <div className={styled.postBodyWrap}>
        <div className={styled.postBodyRow}>
          <hr />
        </div>
        <div className={styled.postBodyRow}>
          <div className={styled.postTableRow}>
            <div className={
              postData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck}` :
              postData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent}`
              : `${styled.postCategory}`}>
                {postData.category}
            </div>
            <div className={styled.postTitle}>{postData.title}</div>
            <div className={styled.postDate}>{postData.createdAt}</div>
            <div className={styled.postViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{postData.viewCount}</span>
            </div>
          </div>
        </div>
        <div className={styled.postBodyRow + ' ' + styled.postBodyText}>
          <pre dangerouslySetInnerHTML={{__html: postData.content}}>
          </pre>
        </div>
        <div className={styled.postBodyRow}>
          <div className={styled.postRecomendCount} onClick={() => recomendEventHandler(postData.id, session, postData, setPostData)}>
            <Image src={MococoIcon} alt='mococo icon' />
            <span>{postData.recomendCount}</span>
          </div>
        </div>
        <div className={styled.postBodyRow + ' ' + styled.postBodyButtonGroup}>
          <Link href='/notices?page=1'>
            <Image src={ListIcon} alt='list icon' width={23} height={23} />
          </Link>
          <div className={styled.arrowButtonGroup}>
            <Link href={`/notices/detail/${Number(id)+1}`}>
              <Image src={UpArrow} alt='up arrow icon' width={23} height={23} />
            </Link>
            <Link href={`/notices/detail/${Number(id)-1}`}>
              <Image src={DownArrow} alt='down arrow icon' width={23} height={23} />
            </Link>
          </div>
        </div>

        {/* 관리자 버튼 */}
        {session?.user?.email === 'test1' && 
        <div className={styled.postBodyRow + ' ' + styled.postManager}>
          <Link href={`/notices/update/${id}`}>수정</Link>
          <span onClick={() => postDelete(Number(id))}>삭제</span>
        </div>
        }
        
        {/* 다음, 현재, 이전 페이지 묶음 */}
        <div className={styled.postBodyRow + ' ' + styled.postBodyFooter}>
          {/* 다음 페이지 */}
          {nextPostData.id !== 0 && 
          <div className={styled.postTableRow}>
            <div className={
              nextPostData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck}` :
              nextPostData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent}`
              : `${styled.postCategory}`}>
                {nextPostData.category}
            </div>
            <div className={styled.postFooterTitle}>
              <Link href={`/notices/detail/${nextPostData.id}`}>{nextPostData.title}</Link>
            </div>
            <div className={styled.postFooterDate}>{nextPostData.createdAt}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{nextPostData.viewCount}</span>
            </div>
            <div className={styled.postFooterRecomendCount} onClick={() => recomendEventHandler(nextPostData.id, session, nextPostData, setNextPostData)}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{nextPostData.recomendCount}</span>
            </div>
          </div>
          }
          
          {/* 현재 페이지 */}
          <div className={styled.postTableRow + ' ' + styled.postTableCurrentActive}>
            <div className={
              postData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck}` :
              postData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent}`
              : `${styled.postCategory}`}>
                {postData.category}
            </div>
            <div className={styled.postFooterTitle}>
              <Link href={`/notices/detail/${postData.id}`}>{postData.title}</Link>
            </div>
            <div className={styled.postFooterDate}>{postData.createdAt}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{postData.viewCount}</span>
            </div>
            <div className={styled.postFooterRecomendCount} onClick={() => recomendEventHandler(postData.id, session, postData, setPostData)}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{postData.recomendCount}</span>
            </div>
          </div>

          {/* 이전 페이지 */}
          {prevPostData.id !== 0 && 
          <div className={styled.postTableRow}>
            <div className={
              prevPostData.category === '점검' ? `${styled.postCategory} ${styled.postCategoryCheck}` :
              prevPostData.category === '이벤트' ? `${styled.postCategory} ${styled.postCategoryEvent}`
              : `${styled.postCategory}`}>
                {prevPostData.category}
            </div>
            <div className={styled.postFooterTitle}>
              <Link href={`/notices/detail/${prevPostData.id}`}>{prevPostData.title}</Link>
            </div>
            <div className={styled.postFooterDate}>{prevPostData.createdAt}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{prevPostData.viewCount}</span>
            </div>
            <div className={styled.postFooterRecomendCount} onClick={() => recomendEventHandler(prevPostData.id, session, prevPostData, setPrevPostData)}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{prevPostData.recomendCount}</span>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

