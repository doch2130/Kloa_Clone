import Link from 'next/link';
import SlideImage from '@/components/Home/SlideImageSection/SlideImage';
import Schedule from '@/components/Home/ScheduleSection/Schedule';
import styled from './Home.module.css';


const categoryClassMap: { [key: string]: string } = {
  '공지': '',
  '상점': styled.noticeTableCategoryShop,
  '점검': styled.noticeTableCategoryCheck,
  '이벤트': styled.noticeTableCategoryEvent,
};

type noticesTopListType = {
  Title: string,
  Date: string,
  Link: string,
  Type: string,
}

export default async function Home() {
  const resp = await fetch('http://localhost:9999/notices', { cache: 'no-store' });
  const noticesList = await resp.json();
  const noticesTopList = noticesList.slice(0, 5);
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
            {
              noticesTopList.map((el:noticesTopListType, index:number) => 
              (
                <div className={styled.noticeTableRow} key={index}>
                  <div className={`${styled.noticeTableCategory} ${categoryClassMap[el.Type]}`}>{el.Type}</div>
                  <Link href={el.Link} target="_blank">{el.Title}</Link>
                </div>
              ))
            }
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
