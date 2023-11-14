import Link from 'next/link';

import { NoticePostResp, NoticePost, NoticesTopFive, NoticesTopFiveResp } from '@/type/notice'
import { AdventureIslandResp } from '@/type/adventureIsland'

import SlideImage from '@/components/Home/SlideImageSection/SlideImage';
import Schedule from '@/components/Home/ScheduleSection/Schedule';
import styled from './Home.module.css';


const categoryClassMap: { [key: string]: string } = {
  '공지': 'dark:text-[#eaf0ec]',
  '상점': styled.noticeTableCategoryShop,
  '점검': styled.noticeTableCategoryCheck,
  '이벤트': styled.noticeTableCategoryEvent,
};

export default async function Home() {
  async function getLostarkNotices() {
    try {
      // 로스트아크 공지사항
      const noticesResp = await fetch(`${process.env.NEXTAUTH_URL}/api/lostark?category=notices`, {
        cache: 'no-store',
      });
      const noticesList:NoticesTopFiveResp = await noticesResp.json();
      return noticesList;
    } catch (error) {
      console.error('LostArk Notices Fetch error:', error);
      return { result: [], status: 500 };
    }
  }

  async function getKloaNotices() {
    try {
      // 클로아 공지사항
      const mainNoticesResp = await fetch(`${process.env.NEXTAUTH_URL}/api/notices?top=true`, {
        cache: 'no-store',
      });
      const mainNoticesTopList:NoticePostResp = await mainNoticesResp.json();
      return mainNoticesTopList;
    } catch (error) {
      console.error('Kloa Notices Fetch error:', error);
      return { result: [], status: 500, success: false };
    }
  }

  async function getAdventureIslandData() {
    try {
      // 모험 섬 데이터
      const adventureResp = await fetch(`${process.env.NEXTAUTH_URL}/api/lostark?category=adventure`, {
        cache: 'no-store',
      });
      const adventureIslandData:AdventureIslandResp = await adventureResp.json();
      return adventureIslandData;
    } catch (error) {
      console.error('Kloa Notices Fetch error:', error);
      return { result:[], status:500 };
    }
  }

  const noticesList = await getLostarkNotices();
  const mainNoticesTopList = await getKloaNotices();
  const adventureIslandData = await getAdventureIslandData();
  
  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <SlideImage />
      </section>
      <section className={styled.schedule}>
        <Schedule adventureIslandData={adventureIslandData?.result} />
      </section>
      <section className={styled.notices}>
        <div className={styled.lostarkNotice}>
          <div className={`${styled.subTitle} dark:text-[#eaf0ec]`}>
            <Link href='https://lostark.game.onstove.com/News/Notice/List'>로스트아크 공지사항</Link>
          </div>
          <div className={`${styled.noticeTable} dark:bg-[#33353a] dark:border-[#42464D]`}>
            {
              noticesList.result.map((el:NoticesTopFive, index:number) => 
              (
                <div className={styled.noticeTableRow} key={index}>
                  <div className={`${styled.noticeTableCategory} dark:border-[#42464D] ${categoryClassMap[el.category]}`}>{el.category}</div>
                  <Link href={el.link} target="_blank" className='dark:text-[#eaf0ec]'>{el.title}</Link>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styled.kloaNotice}>
          <div className={`${styled.subTitle} dark:text-[#eaf0ec]`}>
            <Link href='/notices?page=1'>클로아 공지사항</Link>
          </div>
          <div className={`${styled.noticeTable} dark:bg-[#33353a] dark:border-[#42464D]`}>
            {
              mainNoticesTopList.result.map((el:NoticePost, index:number) => 
              (
                <div className={styled.noticeTableRow} key={index}>
                  <div className={`${styled.noticeTableCategory} dark:border-[#42464D] ${categoryClassMap[el.category]}`}>{el.category}</div>
                  <Link href={`/notices/detail/${el.id}`} target="_blank" className='dark:text-[#eaf0ec]'>{el.title}</Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

