import React from 'react'
import { NoticePostResp } from '@/types/notice'
import NoticesTable from './NoticesTable';

export default async function Notices({searchParams}:any) {
  const apiUrl = process.env.NEXT_PUBLIC_MODE === 'production' ? process.env.API_URL_PROD : process.env.API_URL_DEV;

  // console.log('searchParams ', searchParams.page);
  const postListResp = await fetch(`${apiUrl}/api/notices?page=${searchParams.page}`, {
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
