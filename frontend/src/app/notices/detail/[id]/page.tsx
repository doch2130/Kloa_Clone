'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import EyeIcon from '@/assets/Icon/eye.svg'
import MococoIcon from '@/assets/Icon/mococo.svg'
import ListIcon from '@/assets/Icon/list.svg'
import UpArrow from '@/assets/Icon/upArrow.svg'
import DownArrow from '@/assets/Icon/downArrow.svg'

import styled from './Detail.module.css'

type noticePostType = {
  id: string,
  category: string,
  title: string,
  textData: string,
  writeTime: string,
  viewCount: number,
  likeCount: number,
}

export default function Detail() {
  // 매니저 계정 임시
  const test1 = false;

  const [postData, setPostData] = useState({
    id: '',
    category: '',
    title: '',
    textData: '',
    writeTime: '',
    viewCount: 0,
    likeCount: 0
  });
  const [nextPostData, setNextPostData] = useState({
    id: '',
    category: '',
    title: '',
    textData: '',
    writeTime: '',
    viewCount: 0,
    likeCount: 0
  });
  const [prevPostData, setPrevPostData] = useState({
    id: '',
    category: '',
    title: '',
    textData: '',
    writeTime: '',
    viewCount: 0,
    likeCount: 0
  });
  const router = useRouter();
  const params = useParams();
  const id = params.id;


  useEffect(() => {
    fetch(`http://localhost:9999/mainNotices/${id}`, {
      cache: 'force-cache',
      headers: {
        'Cache-Control': 'max-age=3600',
      }
    })
      .then(res => res.json())
      .then(result => {

        if(result.id === undefined) {
          alert('잘못된 페이지 접근입니다.');
          router.push('/notices?page=1');
          return ;
        }

        const writeTimeDateType = new Date(result.writeTime);
        const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;

        setPostData({
          id: result.id,
          category: result.category,
          title: result.title,
          textData: result.textData,
          writeTime: writeTimeFormat,
          viewCount: result.viewCount,
          likeCount: result.likeCount
        })
      })
      .catch(error => {
        alert('페이지 로딩 중 에러가 발생하였습니다.');
        router.push('/notices?page=1');
      });

      // 다음 페이지 정보 가져오기
      fetch(`http://localhost:9999/mainNotices/${Number(id)+1}`, {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600',
        }
      })
      .then(res => res.json())
      .then(result => {

        if(result.id === undefined) {
          return ;
        }

        const writeTimeDateType = new Date(result.writeTime);
        const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;

        setNextPostData({
          id: result.id,
          category: result.category,
          title: result.title,
          textData: result.textData,
          writeTime: writeTimeFormat,
          viewCount: result.viewCount,
          likeCount: result.likeCount
        })
      })
      .catch(error => {
        alert('페이지 로딩 중 에러가 발생하였습니다.');
      });


      // 이전 페이지 정보 가져오기
      fetch(`http://localhost:9999/mainNotices/${Number(id)-1}`, {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600',
        }
      })
      .then(res => res.json())
      .then(result => {

        if(result.id === undefined) {
          return ;
        }

        const writeTimeDateType = new Date(result.writeTime);
        const writeTimeFormat = `${writeTimeDateType.getFullYear()}-${String(writeTimeDateType.getMonth()+1).padStart(2, '0')}-${String(writeTimeDateType.getDate()).padStart(2, '0')}`;

        setPrevPostData({
          id: result.id,
          category: result.category,
          title: result.title,
          textData: result.textData,
          writeTime: writeTimeFormat,
          viewCount: result.viewCount,
          likeCount: result.likeCount
        })
      })
      .catch(error => {
        alert('페이지 로딩 중 에러가 발생하였습니다.');
      });

  }, []);


  const postDelete = async () => {
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
        alert('존재하지 않는 게시글 입니다.');
        router.push('/notices?page=1');

        // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
        // caches.open('your-cache-name').then((cache) => {
        //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
        // });

        return ;
      } else if(deleteResponse.status === 200) {
        alert('게시글이 삭제되었습니다.');
        router.push('/notices?page=1');

        // 데이터를 삭제한 후 캐시에서 해당 데이터를 삭제
        // caches.open('your-cache-name').then((cache) => {
        //   cache.delete(`http://localhost:9999/mainNotices/${id}`);
        // });

        return ;
      } else {
        alert('삭제 중 에러가 발생하였습니다. 새로 고침 후 다시 시도해주세요.');
        return ;
      }

    } catch (error) {
      alert('삭제 중 에러가 발생하였습니다.');
      return ;
    }
  }

  return (
    <div className={styled.postBody}>
      <div className={styled.postBodyWrap}>
        <div className={styled.postBodyRow + ' ' + styled.postBodyTitle}>
          <h2>공지사항</h2>
        </div>
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
            <div className={styled.postDate}>{postData.writeTime}</div>
            <div className={styled.postViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{postData.viewCount}</span>
            </div>
          </div>
        </div>
        <div className={styled.postBodyRow + ' ' + styled.postBodyText}>
          <pre dangerouslySetInnerHTML={{__html: postData.textData}}>
          </pre>
        </div>
        <div className={styled.postBodyRow}>
          <div className={styled.postLikeCount}>
            <Image src={MococoIcon} alt='mococo icon' />
            <span>{postData.likeCount}</span>
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
        {!test1 && 
        <div className={styled.postBodyRow + ' ' + styled.postManager}>
          <Link href={`/notices/update/${id}`}>수정</Link>
          <span onClick={postDelete}>삭제</span>
        </div>
        }
        
        {/* 다음, 현재, 이전 페이지 묶음 */}
        <div className={styled.postBodyRow + ' ' + styled.postBodyFooter}>
          {/* 다음 페이지 */}
          {nextPostData.id && 
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
            <div className={styled.postFooterDate}>{nextPostData.writeTime}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{nextPostData.viewCount}</span>
            </div>
            <div className={styled.postFooterLikeCount}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{nextPostData.likeCount}</span>
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
            <div className={styled.postFooterDate}>{postData.writeTime}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{postData.viewCount}</span>
            </div>
            <div className={styled.postFooterLikeCount}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{postData.likeCount}</span>
            </div>
          </div>

          {/* 이전 페이지 */}
          {prevPostData.id && 
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
            <div className={styled.postFooterDate}>{prevPostData.writeTime}</div>
            <div className={styled.postFooterViewCount}>
              <Image src={EyeIcon} alt='eye icon' />
              <span>{prevPostData.viewCount}</span>
            </div>
            <div className={styled.postFooterLikeCount}>
              <Image src={MococoIcon} alt='mococo icon' />
              <span>{prevPostData.likeCount}</span>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}
