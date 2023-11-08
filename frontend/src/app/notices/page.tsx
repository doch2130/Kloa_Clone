import React from 'react'

import { NoticePost } from '@/type/notice'
import PageNation from './PageNation';
import styled from './Notices.module.css';

export default async function Notices() {
  const postListResp = await fetch('http://localhost:9999/mainNotices',
  {
    cache: 'default',
    headers: {
      // 캐시 유효 시간을 1시간으로 설정
      'Cache-Control': 'max-age=3600',
    }
  });

  const postList:NoticePost[] = await postListResp.json();

  postList.sort((a, b) => Number(new Date(b.writeTime)) - Number(new Date(a.writeTime)));

  // console.log('postList ', postList);

  return (
    <div className={styled.noticeBody}>
      <div className={styled.noticeBodyWrap}>
        <div className={styled.noticeBodyRow + ' ' + styled.noticeBodyTitle}>
          <h2>공지사항</h2>
        </div>
        <PageNation postList={postList} />
      </div>
    </div>
  )
}
