import React from 'react'
import { NoticePost } from '@/type/notice'
import NoticesTable from './NoticesTable';

export default async function Notices(props:any) {
  const postListResp = await fetch('http://localhost:9999/mainNotices',
  {
    cache: 'no-store',
    // headers: {
    //   // 캐시 유효 시간을 1시간으로 설정
    //   'Cache-Control': 'max-age=3600',
    // }
  });
  const postList:NoticePost[] = await postListResp.json();
  postList.sort((a, b) => Number(new Date(b.writeTime)) - Number(new Date(a.writeTime)));
  // console.log('postList ', postList);

  return (
    <>
      <NoticesTable postList={postList} />
    </>
  )
}
