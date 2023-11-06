import React from 'react'

import styeld from './Notices.module.css';
import PageNation from './PageNation';

export default async function Notices() {
  const postListResp = await fetch('http://localhost:9999/mainNotices',
  {
    cache: 'force-cache',
    headers: {
      // 캐시 유효 시간을 1시간으로 설정
      'Cache-Control': 'max-age=3600',
    }
  });

  type postListType = {
    category: string,
    title: string,
    textData: string,
    writeTime: string,
    viewCount: number,
    likeCount: number,
    id: string,
  }
  const postList:postListType[] = await postListResp.json();

  postList.sort((a, b) => Number(new Date(b.writeTime)) - Number(new Date(a.writeTime)));

  // console.log('postList ', postList);

  return (
    <div className={styeld.noticeBody}>
      <div className={styeld.noticeBodyWrap}>
        <div className={styeld.noticeBodyRow + ' ' + styeld.noticeBodyTitle}>
          <h2>공지사항</h2>
        </div>
        <PageNation postList={postList} />
      </div>
    </div>
  )
}
