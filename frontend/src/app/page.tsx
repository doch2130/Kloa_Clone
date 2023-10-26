import Image from 'next/image';
import MainImage1 from '/public/Main/main_image_1.webp'
import MainImage2 from '/public/Main/main_image_2.webp'
import MainImage3 from '/public/Main/main_image_3.webp'
import MainImage4 from '/public/Main/main_image_4.webp'
import styled from './Home.module.css';
import Link from 'next/link';
import LeftArrow from '/public/Icon/leftArrow.svg'
import RightArrow from '/public/Icon/rightArrow.svg'

export default function Home() {
  const temp = [1,2,3,4,5];
  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <Image src={MainImage1} alt='KLOA ICON' placeholder='blur' />
      </section>
      <section className={styled.schedule}>
        <div className={styled.subTitle}>
          <div>모험 섬<p className={styled.scheduleTime}>00:00:00</p></div>
          <div className={styled.scheduleDateChange}>
            <Image src={LeftArrow} alt='left arrow' />
            <p>2023년 10월</p>
            <Image src={RightArrow} alt='right arrow' />
          </div>
        </div>
      </section>
      <section className={styled.notices}>
        <div className={styled.lostarkNotice}>
          <div className={styled.subTitle}>
            <Link href='https://lostark.game.onstove.com/News/Notice/List'>로스트아크 공지사항</Link>
          </div>
          <div className={styled.noticeTable}>
            {temp.map((el:number) => {
              return (
                <div className={styled.noticeTableRow} key={el}>
                  <div className={styled.noticeTableCategory}>공지</div>
                  <Link href='https://lostark.game.onstove.com/News/Notice/Views/2586'>10월 26일(목) 로스트아크 임시 점검 완료 및 수정 사항 안내</Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styled.kloaNotice}>
          <div className={styled.subTitle}>
            <Link href='/notices'>클로아 공지사항</Link>
          </div>
          <div className={styled.noticeTable}>
            {temp.map((el:number) => {
              return (
                <div className={styled.noticeTableRow} key={el}>
                  <div className={styled.noticeTableCategory}>공지</div>
                  <Link href='https://lostark.game.onstove.com/News/Notice/Views/2586'>10월 26일(목) 로스트아크 임시 점검 완료 및 수정 사항 안내</Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
