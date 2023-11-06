import React from 'react'

import styeld from './Notices.module.css';
import PageNation from './PageNation';

export default function Notices() {
  const temp = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  // const temp = [1,2,3,4,5,6,7,8,9,10];
  // const temp = [1,2,3,4,5,6,7,8];

  return (
    <div className={styeld.noticeBody}>
      <div className={styeld.noticeBodyWrap}>
        <div className={styeld.noticeBodyRow + ' ' + styeld.noticeBodyTitle}>
          <h2>공지사항</h2>
        </div>
        <PageNation temp={temp} />
      </div>
    </div>
  )
}
