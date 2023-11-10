import React from 'react'
import { NoticePostResp } from '@/type/notice'
import NoticesTable from './NoticesTable';

export default async function Notices(props:any) {
  const postListResp = await fetch(`${process.env.NEXTAUTH_URL}/api/notices`, {
    method: 'GET',
    cache: 'no-store',
  });
  
  const postList:NoticePostResp = await postListResp.json();
  // console.log('postList ', postList);
  // console.log('postList.result ', postList.result);

  return (
    <>
      <NoticesTable postList={postList.result} />
    </>
  )
}
