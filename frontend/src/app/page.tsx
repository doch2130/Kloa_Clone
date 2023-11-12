import Link from 'next/link';

import { NoticePostResp, NoticePost, NoticesTopFive } from '@/type/notice'
import { AdventureIslandResp } from '@/type/adventureIsland'

import SlideImage from '@/components/Home/SlideImageSection/SlideImage';
import Schedule from '@/components/Home/ScheduleSection/Schedule';
import styled from './Home.module.css';


const categoryClassMap: { [key: string]: string } = {
  '공지': '',
  '상점': styled.noticeTableCategoryShop,
  '점검': styled.noticeTableCategoryCheck,
  '이벤트': styled.noticeTableCategoryEvent,
};

export default async function Home() {
  // 로스트아크 공지사항
  const noticesResp = await fetch(`${process.env.NEXTAUTH_URL}/api/lostark?category=notices`, {
    cache: 'no-store',
  });
  const noticesList = await noticesResp.json();
  // console.log('noticesList.data ', noticesList);
  
  // 클로아 공지사항
  const mainNoticesResp = await fetch(`${process.env.NEXTAUTH_URL}/api/notices?top=true`, {
    cache: 'no-store',
  });
  const mainNoticesTopList:NoticePostResp = await mainNoticesResp.json();
  // console.log('mainNoticesTopList ', mainNoticesTopList);

  // 모험 섬 데이터
  const adventureResp = await fetch(`${process.env.NEXTAUTH_URL}/api/lostark?category=adventure`, {
    cache: 'no-store',
  });
  const adventureIslandData:AdventureIslandResp = await adventureResp.json();
  // console.log('adventureIslandData ', adventureIslandData);

  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <SlideImage />
      </section>
      <section className={styled.schedule}>
        <Schedule adventureIslandData={adventureIslandData?.data} />
      </section>
      <section className={styled.notices}>
        <div className={styled.lostarkNotice}>
          <div className={styled.subTitle}>
            <Link href='https://lostark.game.onstove.com/News/Notice/List'>로스트아크 공지사항</Link>
          </div>
          <div className={styled.noticeTable}>
            {
              noticesList.data.map((el:NoticesTopFive, index:number) => 
              (
                <div className={styled.noticeTableRow} key={index}>
                  <div className={`${styled.noticeTableCategory} ${categoryClassMap[el.category]}`}>{el.category}</div>
                  <Link href={el.link} target="_blank">{el.title}</Link>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styled.kloaNotice}>
          <div className={styled.subTitle}>
            <Link href='/notices?page=1'>클로아 공지사항</Link>
          </div>
          <div className={styled.noticeTable}>
            {
              mainNoticesTopList.result.map((el:NoticePost, index:number) => 
              (
                <div className={styled.noticeTableRow} key={index}>
                  <div className={`${styled.noticeTableCategory} ${categoryClassMap[el.category]}`}>{el.category}</div>
                  <Link href={`/notices/detail/${el.id}`} target="_blank">{el.title}</Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}
