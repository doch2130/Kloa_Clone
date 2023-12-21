import React from 'react'
import Footer from '@/components/Footer/Footer'
import styled from './Notices.module.css'

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white dark:bg-[#2b2d31] min-h-full'>
      <div className={`${styled.noticeBody}`}>
        <div className={styled.noticeBodyWrap}>
          <div className={styled.noticeBodyRow + ' ' + styled.noticeBodyTitle}>
            <h2 className='text-[#353945] dark:text-[#eaf0ec]'>공지사항</h2>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
