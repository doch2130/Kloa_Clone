import Link from 'next/link';
import SlideImage from '@/components/Home/SlideImageSection/SlideImage';
import Schedule from '@/components/Home/ScheduleSection/Schedule';
import styled from './Home.module.css';

export default function Home() {
  const temp = [1,2,3,4,5];
  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <SlideImage />
      </section>
      <section className={styled.schedule}>
        <Schedule />
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
                  <Link href='https://lostark.game.onstove.com/News/Notice/Views/2586' target="_blank">10월 26일(목) 로스트아크 임시 점검 완료 및 수정 사항 안내</Link>
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
                  <Link href='https://lostark.game.onstove.com/News/Notice/Views/2586' target="_blank">10월 26일(목) 로스트아크 임시 점검 완료 및 수정 사항 안내</Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
