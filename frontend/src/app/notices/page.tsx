import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import EyeIcon from '@/assets/Icon/eye.svg'
import MococoIcon from '@/assets/Icon/mococo.svg'
import LeftArrow from '@/assets/Icon/leftArrow.svg'
import RightArrow from '@/assets/Icon/rightArrow.svg'
import styeld from './Notices.module.css';

export default function Notices() {
  // const temp = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  const temp = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div className={styeld.noticeBody}>
      <div className={styeld.noticeBodyWrap}>
        <div className={styeld.noticeBodyRow + ' ' + styeld.noticeBodyTitle}>
          <h2>공지사항</h2>
        </div>
        <div className={styeld.noticeBodyRow + ' ' + styeld.noticeTable}>
          {temp.map((el:any, index:number) => {
            return (
              <div className={styeld.noticeTableRow} key={index}>
                <div className={styeld.noticeCategory}>공지</div>
                <div className={styeld.noticeTitle}>떠돌이 상인 시스템 개편에 따른 대응 방침 안내</div>
                <div className={styeld.noticeDate}>2023-08-02</div>
                <div className={styeld.noticeViewCount}>
                  <Image src={EyeIcon} alt='eye icon' />
                  <span>99999+</span>
                </div>
                <div className={styeld.notieLikeCount}>
                  <Image src={MococoIcon} alt='mococo icon' />
                  <span>941</span>
                </div>
              </div>
              )
            })
          }
        </div>
        <div className={styeld.noticeBodyRow + ' ' + styeld.noticeTableBtnGroup}>
          <Link href='/notices'>
            <Image src={LeftArrow} alt='left arrow icon'/>
          </Link>
          <Link href='/notices' className={styeld.noticeTableBtnActive}>
            1
          </Link>
          <Link href='/notices'>
            <Image src={RightArrow} alt='right arrow icon' />
          </Link>
        </div>
      </div>
    </div>
  )
}
