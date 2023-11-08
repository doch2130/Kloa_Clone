import React from 'react'
import Link from 'next/link'
import styled from './Notices.module.css'

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styled.noticeBody}>
    <div className={styled.noticeBodyWrap}>
      <div className={styled.noticeBodyRow + ' ' + styled.noticeBodyTitle}>
        <h2><Link href='/notices?page=1'>공지사항</Link></h2>
      </div>
      {children}
    </div>
  </div>
  )
}
