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
  const noticesResp = await fetch('http://localhost:9999/notices',
  { 
    cache: 'default',
    headers: {
      // 캐시 유효 시간을 1시간으로 설정
      'Cache-Control': 'max-age=3600',
    }
  });
  const noticesList = await noticesResp.json();
  const noticesTopList = noticesList[0];

  const mainNoticesResp = await fetch('http://localhost:9999/mainNotices',
  {
    cache: 'default',
    headers: {
      // 캐시 유효 시간을 1시간으로 설정
      'Cache-Control': 'max-age=3600',
    }
  });
  type mainNoticeType = {
    category: string,
    title: string,
    textData: string,
    writeTime: string,
    viewCount: number,
    likeCount: number,
    id: string,
  }
  const mainNoticesList:mainNoticeType[] = await mainNoticesResp.json();
  mainNoticesList.sort((a, b) => Number(new Date(b.writeTime)) - Number(new Date(a.writeTime)));
  const mainNoticesTopList = mainNoticesList.slice(0, 5);


  const adventureResp = await fetch('http://localhost:9999/adventureIsland',
  {
    cache: 'default',
    headers: {
      // 캐시 유효 시간을 1시간으로 설정
      'Cache-Control': 'max-age=3600',
    }
  });
  const adventureIslandList = await adventureResp.json();

  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <SlideImage />
      </section>
      <section className={styled.schedule}>
        <Schedule adventureIslandList={adventureIslandList[0]} />
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
            {
              mainNoticesTopList.map((el:mainNoticeType, index:number) => 
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
