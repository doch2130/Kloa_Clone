import Image from 'next/image';
import styled from './Home.module.css';
import Link from 'next/link';
import LeftArrow from '/public/Icon/leftArrow.svg'
import RightArrow from '/public/Icon/rightArrow.svg'
import BossOn from '/public/Icon/boss_on.png'
import ChaosGateOn from '/public/Icon/chaosGate_on.png'
import BattleArenaOn from '/public/Icon/battleArena_on.png'
import DeathValley from '/public/Island/deathvalley.png'
import CardPack from '/public/Icon/Item/ico_island_cardpack.png'
import SlideImage from '@/components/Home/SlideImageSection/SlideImage';
import Calendar from '@/components/Calendar';

export default function Home() {
  const tempIsland = [1,2,3];
  const temp = [1,2,3,4,5];
  return (
    <div className={styled.bodySection}>
      <section className={styled.slideImage}>
        <SlideImage />
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
        <div className={styled.scheduleTable}>
          <div>
            <Calendar />
          </div>
          <hr />
          <div className={styled.scheduleEtc}>
            <div className={styled.scheduleEtcRow + ' ' + styled.fieldBoss}>
              <div className={styled.scheduleName}>
                <Image src={BossOn} alt='field boss icon on' />
                <span>필드보스</span>
              </div>
              <div className={styled.scheduleTime}>
                00:00:00
              </div>
            </div>
            <div className={styled.scheduleEtcRow + ' ' + styled.chaosGate}>
              <div className={styled.scheduleName}>
                <Image src={ChaosGateOn} alt='chaos gate icon on' />
                <span>카오스게이트</span>
              </div>
              <div className={styled.scheduleTime}>
                00:00:00
              </div>
            </div>
            <div className={styled.scheduleEtcRow + ' ' + styled.battleArena}>
              <div className={styled.scheduleName}>
                <Image src={BattleArenaOn} alt='battle arena icon on' />
                <span>태초의 섬</span>
              </div>
              <div className={styled.scheduleTime}>
                00:00:00
              </div>
            </div>
          </div>
          <div className={styled.scheduleIsland}>
            <div className={styled.scheduleIslandRow}>
              {tempIsland.map((el:number) => {
                return (
                  <div className={styled.scheduleIslandBox} key={el}>
                    <Image src={DeathValley} alt='death valley' className={styled.scheduleIslandImage} />
                    <div className={styled.scheduleIslandBoxWrap}>
                      <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandBoxTitle}>
                        <div className={styled.scheduleIslandCategory}>카드</div>
                        <div className={styled.scheduleIslandName}>죽음의 협곡</div>
                      </div>
                      <div className={styled.scheduleIslandBoxRow + ' ' + styled.scheduleIslandCompensationImage}>
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                        <Image src={CardPack} alt='Island Card Pack' />
                      </div>
                    </div>
                  </div>
                )
              })}
              </div>
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
