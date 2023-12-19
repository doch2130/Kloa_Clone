'use client'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { localStorageSaveHandler } from '../../../components/Header/HeaderSearchUtil'

import starEmpty from '@/assets/Icon/starEmpty.svg'
import starFull from '@/assets/Icon/starFull.svg'
import transcendance from '@/assets/Icon/transcendance.svg'
import elixir from '@/assets/Icon/elixir.svg'

import UpArrowSvg from '@/components/UI/UpArrowSvg'

import { useState } from 'react'
import { Tab, Disclosure } from '@headlessui/react'
import Popovertest from './Popovertest'

export default function CharacterDetail() {
  const params = useParams();
  // const name = params.name;
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;

  const [isFavoriteCheck, setIsFavoriteCheck] = useState<boolean>(false);

  const cardCount = [1,2,3,4,5,6];
  const jewelCount = [1,2,3,4,5,6,7,8,9,10,11];
  const gagInCount = [1,2,3,4,5,6];
  const equipCount = [1,2,3,4,5,6];
  const accessoriesCount = [1,2,3,4,5,6];

  const favoriteCheckHandler = () => {
    setIsFavoriteCheck((prev) => !prev);
  }

  // 여기서는 데이터 호출하지 않고 페이지만 넘겨준다.
  // 페이지를 넘겨준 후 API를 호출해서 데이터가 있으면 로컬스토리지 저장도 같이 한다.
  // 여기서 1번하면 페이지 이동 후 또 해야하는 현상이 생기기 때문에 여기서는 하지 않는다.


  let [categoriesOne] = useState({
    '능력치': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  });

  let [categoriesTwo] = useState({
    '스킬': [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ]
  });
  

  let [categories] = useState({
    '아바타': [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    '히스토리': [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    '수집형 포인트': [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    '보유 캐릭터': [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  let [categoriesGuild] = useState({
    '길드': [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ]
  });



  const dataLoadHandler = async (name:string) => {
    const characterName = decodeURIComponent(name.trim());
    try {
      const resposneCharacter = await fetch(`/api/lostark/characters?characterName=${characterName}`, {
        method: 'get'
      });
  
      if(resposneCharacter.ok) {
        const result = await resposneCharacter.json();
  
        if(result.status === 200) {
          // 최근 검색 로컬 스토리지 저장
          // localStorageSaveHandler('recently', searchValueRef.current.value, setRecentlyData);
          console.log('result ', result);
        } else if(result.status === 404) {
          console.log('not found character');
        } else {
          alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
        }
        return ;
  
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
      return ;
    }
  }

  useEffect(() => {
    // dataLoadHandler(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const characterBackgroundColor = {
    maskImage: 'linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)',
    WebkitMaskImage: 'linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)'
  };

  return (
    <div className='w-full min-h-full bg-lightGrey dark:bg-[#2b2d31] text-[#353945] dark:text-[#eaf0ec] min-[1260px]:flex min-[1260px]:justify-center relative'>
      <div className='shrink-0 w-[1200px] flex justify-between relative'>
        <Tab.Group>
          <section className='shrink-0 w-[400px] bg-white dark:bg-[#33353a] border-l dark:border-l-[#4d4f55] shadow-[5px_1px_8px_0_rgba(0,0,0,.06)] z-[1]'>
            <div className='w-full h-[300px] bg-[#15181d] relative overflow-hidden'>
              {/* 캐릭터 사진 */}
              <div className='absolute w-[612px] right-[-180px] top-[-60px]'>
                <Image src={'https://img.lostark.co.kr/armory/9/6ebf3a6ebe4ae67706162d8688f9b8ec711ab39a1c576dc98ad1d7b1cec96d66.png?v=20231210061139'} alt='character Image' width={612} height={708} property='false' />
              </div>
              {/* 아이템 레벨에 따른 배경 색 다른 효과 */}
              <div className='absolute inset-0 mix-blend-lighten transition-colors duration-[2000ms] ease-out bg-[#F25068]' style={characterBackgroundColor}></div>
              {/* 직업, 서버, 이름, 레벨 */}
              <div className='absolute text-white top-5 left-5 drop-shadow'>
                <p className='text-base drop-shadow'>Lv. 60 스카우터 @카제로스</p>
                <h1 className='text-xl font-semibold mt-1.5 drop-shadow flex items-center'>키토단</h1>
                <svg className="mt-2.5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="269" height="29" viewBox="0 0 269 29">
                  <defs>
                    <clipPath id="clip-path">
                      <rect id="사각형_91" data-name="사각형 91" width="14" height="18" fill="none"></rect>
                    </clipPath>
                  </defs>
                  <g id="ico_itemlevel" transform="translate(0 4.988)">
                    <g id="그룹_141" data-name="그룹 141" transform="translate(0 0)" clipPath="url(#clip-path)">
                      <path id="패스_94" data-name="패스 94" d="M13.517,4.68h-.378C12.193,2.4,9.36,1.644,9.36,1.644L7,0,4.641,1.644S1.805,2.4.861,4.68H.482A17.085,17.085,0,0,0,.011,9.4l.56-.4v3.737a1.566,1.566,0,0,0,.454,1.09L5.058,18V9.528l-.976.732c-1.183.878-1.4.191-1.434-.254V7.933a2.933,2.933,0,0,1,1.9.3L6.624,9.4v1.385l-.681.607L7,12.334l1.056-.94-.681-.607V9.4L9.453,8.235a2.935,2.935,0,0,1,1.9-.3v2.074c-.032.445-.248,1.132-1.432.254L8.94,9.528V18l4.034-4.169a1.566,1.566,0,0,0,.454-1.09V9.006l.562.4a17.13,17.13,0,0,0-.473-4.721" transform="translate(0 -0.001)" fill="#fff"></path>
                    </g>
                    <text id="_1_584.17" data-name="1,584.17" transform="translate(19 -4.988)" fill="#fff" fontSize="24" fontFamily="Pretendard Variable, Pretendard" fontWeight="600">
                      <tspan x="0" y="23">1,621.67</tspan>
                    </text>
                  </g>
                </svg>
              </div>
              {/* 원정대, 칭호, PVP, 영지 */}
              <div className='absolute bottom-5 left-5 text-white space-y-1.5'>
                <div className='flex'>
                  <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
                    <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>원정대</p>
                  </div>
                  <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>
                    <span className='text-[11px] leading-[11px]'>Lv.</span>226
                  </p>
                </div>
                <div className='flex'>
                  <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
                    <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>칭호</p>
                  </div>
                  <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>빛을 꺼트리는 자</p>
                </div>
                <div className='flex'>
                  <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
                    <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>PVP</p>
                  </div>
                  <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>20급</p>
                </div>
                <div className='flex'>
                  <div className='w-[45px] h-5 bg-[#1B1E24] flex justify-center items-center rounded-[10px] mr-2'>
                    <p className='text-[12px] leading-[15px] text-[#e6e8ec]'>영지</p>
                  </div>
                  <p className='text-[15px] leading-[18px] [text-shadow:2px_2px_2px_#00000099]'>
                    <span className='text-[11px] leading-[11px]'>Lv.</span>70 첫영지
                  </p>
                </div>
              </div>
              {/* 관심 체크 */}
              <div className='absolute top-0 right-0'>
                <button type='button' className='p-5 h-full justify-self-end text-gray-100'>
                  {isFavoriteCheck ?
                  <>
                    <Image src={starFull} alt='starFull' width={20} height={20} onClick={favoriteCheckHandler} />
                  </>
                  :
                  <>
                    <Image src={starEmpty} alt='starEmpty' width={20} height={20} onClick={favoriteCheckHandler} />
                  </>
                  }
                </button>
              </div>
            </div>
            <div className='relative opacity-100 h-[70px]'>
              {/* 서버, 순위 */}
              <div className='w-full h-[70px] pl-5 pr-3 py-3 flex justify-between gap-y-1 text-sm font-semibold dark:bg-[#3f4044]'>
                <div className='shrink-0 grid grid-rows-2'>
                  <p className='text-[#8045dd] dark:text-[#a36bfc]'>전체 서버</p>
                  <p className='text-[#5865f2] dark:text-[#8991ee]'>카제로스 서버</p>
                </div>
                <div className='flex gap-x-2'>
                  <div className='grid grid-rows-2'>
                    <p className='shrink-0 flex justify-end items-center gap-x-1'>
                      <span className='text-[#353945] dark:text-inherit'>12422위</span>
                      <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>8%</span>
                    </p>
                    <p className='shrink-0 flex justify-end items-center gap-x-1'>
                      <span className='text-[#353945] dark:text-inherit'>124위</span>
                      <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>8%</span>
                    </p>
                  </div>
                  <div className='grid grid-rows-2'>
                    <p className='shrink-0 flex justify-end items-center gap-x-1'>
                      <span className='text-[#353945] dark:text-inherit'>클래스 1463위</span>
                      <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>7%</span>
                    </p>
                    <p className='shrink-0 flex justify-end items-center gap-x-1'>
                      <span className='text-[#353945] dark:text-inherit'>클래스 12422위</span>
                      <span className='w-8 inline-block font-medium text-xs text-[#7d8395]'>7%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='after:absolute after:top-full after:w-full after:h-5 after:from-[#0000000f] after:to-60% after:to-transparent after:bg-gradient-to-b'></div>
            </div>
            <div className='mx-10 mt-8 space-y-8'>
              <Tab.List className="space-y-3 [&>*]:py-1 select-none">
                <div className='flex items-center'>
                  <Tab className='focus:outline-none focus-visible:ring-0'>
                    {({ selected }) => (
                      <p className={
                        selected ?
                        'text-lg font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                        : 'text-lg font-normal'
                        }
                      >
                        {Object.keys(categoriesOne)}
                      </p>
                    )}
                  </Tab>
                  <div className='mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55]'></div>
                  <Tab className='focus:outline-none focus-visible:ring-0'>
                    {({ selected }) => (
                      <p className={
                        selected ?
                        'text-lg font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                        : 'text-lg font-normal'
                        }
                      >
                        {Object.keys(categoriesTwo)}
                      </p>
                    )}
                  </Tab>
                </div>

                {Object.keys(categories).map((category) => (
                  <Tab key={category} className='block focus:outline-none focus-visible:ring-0'>
                    {({ selected }) => (
                      <p className={
                        selected ?
                        'text-xl font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                        : 'text-xl font-normal'
                        }
                      >
                        {category}
                      </p>
                    )}
                  </Tab>
                ))}

                <Tab className='focus:outline-none focus-visible:ring-0'>
                  {({ selected }) => (
                    // 길드 없는 경우 disabled text-[#7d8395], curcursor: not-allowed; pointer-events: all!important;
                    // 뒤에 막대기도 없애야 함
                    <div className={
                      selected ?
                      'flex items-center font-semibold relative after:absolute after:left-0 after:w-full after:-bottom-0.5 after:h-0.5 after:border after:border-black after:dark:border-[#eaf0ec]'
                      : 'flex items-center text-xl font-normal'
                      }
                    >
                      <p className='text-xl'>{Object.keys(categoriesGuild)}</p>
                      <div className={
                        selected ?
                        'mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55] bg-black'
                        : 'mx-3 w-[2px] h-[18px] bg-[#e6e8ec] dark:bg-[#4d4f55]'
                        }
                      ></div>
                      <div className='flex items-center gap-x-1.5'>
                        <p className={
                          selected ?
                          'text-xl font-[450] font-medium'
                          : 'text-xl font-[450]'
                          }
                        >
                          혈석 길드
                        </p>
                      </div>
                    </div>
                  )}
                </Tab>
              </Tab.List>
              <hr className='w-full h-[1px] dark:border-[#4d4f55]' />
              <p className='text-xs font-light text-center text-[#7d8395] pb-5'>
                <span>TODAY : 12</span>
                <span className='inline-block mx-2 w-[1px] h-[9px] bg-[#e6e8ec] dark:bg-[#4d4f55]'></span>
                <span>TOTAL : 83</span>
              </p>
            </div>
          </section>

          {/* 오른쪽 섹션, 정보 */}
          <section className='grow pb-[50px]'>
            <div className='pl-[60px] pt-[25px] h-full'>
              <div className='flex justify-end select-none'>
                <div className='flex justify-end items-center gap-x-1.5 mb-[10px] mr-[1px]'>
                  {/* 갱신 2분 이후부터 활성화 되는 방식 */}
                  {/* 1분 이내면 몇 초 전, 1분 이후부터는 X분전 */}
                  <p className='text-sm'>14분전</p>
                  {/* 임시로 disabled 즐겨찾기 변수 사용 */}
                  <button type='button' disabled={isFavoriteCheck} className='w-16 h-6 bg-[#dadada] dark:bg-[#44474d] disabled:bg-[#ececec] dark:disabled:bg-[#33353a] disabled:text-[#7d8395] rounded-lg flex items-center justify-center select-none'>
                    <p className='text-sm'>갱신하기</p>
                  </button>
                </div>
              </div>
              {/* 탭에 따른 데이터 출력 위치 */}
              <Tab.Panels>
                <Tab.Panel className='space-y-6'>
                  {/* 장비 정보 */}
                  <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
                    <div className='grid grid-cols-2 gap-x-3'>
                      {/* 장비 정보 - 장비 */}
                      <div>
                        {equipCount.map((equip:number, index:number) => {
                          let divWrapStyle = 'flex items-center w-full gap-x-2';
                          if(index > 0) {
                            divWrapStyle += ' mt-3'
                          }
                          return (
                          <div key={equip} className={divWrapStyle}>
                            {/* 장비 이미지, 품질 */}
                            <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                              <Image src={'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_165.png'} alt='차오른 몽환의 환각 서브 머신건' loading="lazy" width={50} height={50} decoding="async" />
                              <div className="w-full h-4 text-center bg-[#f9ae00] dark:bg-[#eba70c]">
                                {/* 품질 */}
                                <p className='text-xs font-semibold text-white'>100</p>
                              </div>
                            </div>
                            {/* 장비 정보 */}
                            <div>
                              {/* 초월 */}
                              {index !== 5 &&
                              <div className='flex items-center'>
                                <Image src={transcendance} alt='초월' width={16} height={16} />
                                <p className='text-sm font-semibold text-yellow-500 ml-0.5'>21</p>
                                <p className='text-[0.8rem] font-semibold ml-1'>7단계</p>
                              </div>
                              }
                              {/* 강화, 장비이름 */}
                              <p className='truncate text-[0.9rem] font-semibold text-[#D9AB48]'><span className='text-base'>+25</span> 차오른 몽환의 환각 서브 머신건</p>
                              {/* 세트, 엘릭서 */}
                              <div className='flex items-center'>
                                <p className='text-[0.7rem] leading-3 py-0.5 text-center font-semibold bg-[#e6e8ec] dark:bg-[#4b4e58] rounded-sm px-1.5'>환각 <span className='text-[0.75rem]'>Lv.3</span></p>
                                <div className='gap-x-1.5 font-semibold ml-1.5 flex items-center'>
                                  {index !== 5 ?
                                  <>
                                  <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>회심 (질서) <span className='text-[0.75rem]'>Lv.5</span></span>
                                  <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>무력화 <span className='text-[0.75rem]'>Lv.3</span></span>
                                  </>
                                  :
                                  <div className='flex items-center gap-x-1.5'>
                                    <div className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>달인 2단계</div>
                                    <div className='font-semibold text-white rounded-sm pl-0.5 pr-1 py-0.5 flex justify-center items-center gap-x-0.5 rounded-r-none last:rounded-r-sm text-xs leading-3 bg-[#2AB1F6]'>
                                      <Image src={elixir} alt='엘릭서' width={12} height={12} />
                                      <p className='flex items-end drop-shadow'>20.15%</p>
                                    </div>
                                  </div>
                                  }
                                </div>
                              </div>
                              {/* 무기, 초월 합계 및 초월 증가 수치 */}
                              {index === 5 &&
                              <div className='flex items-center mt-1 w-fit font-semibold text-[0.75rem] leading-3 rounded-full px-1.5 py-0.5 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>
                                <Image src={transcendance} alt='초월' width={14} height={14} />
                                <p className='ml-1 font-semibold text-yellow-500'>합계 45</p>
                                <p className='ml-1.5 font-semibold dark:text-[#cacdd4]'>평균 3.0단계</p>
                                <p className='ml-1 font-semibold dark:text-[#cacdd4]'>+4.92%</p>
                              </div>
                              }
                            </div>
                          </div>
                        )})}
                        {/* 각인 */}
                        <div className='h-[50px] px-0.5 grid grid-cols-2 items-center mt-3'>
                          <div className='flex items-center text-left h-11 gap-x-3'>
                            <Image src={'https://pica.korlark.com/efui_iconatlas/buff/buff_71.png'} alt='원한' width={44} height={44} decoding="async" className='rounded-full drop-shadow' />
                            <div>
                              <p className='text-[0.8rem] font-semibold'>원한</p>
                              <p className='text-[0.7rem]'>활성 포인트 +12</p>
                            </div>
                          </div>
                          <div className='flex items-center text-left h-11 gap-x-3'>
                            <Image src={'https://pica.korlark.com/efui_iconatlas/achieve/achieve_03_40.png'} alt='예리한 둔기' width={44} height={44} decoding="async" className='rounded-full drop-shadow' />
                            <div>
                              <p className='text-[0.8rem] font-semibold'>예리한 둔기</p>
                              <p className='text-[0.7rem]'>활성 포인트 +12</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 장비 정보 - 악세 */}
                      <div>
                      {accessoriesCount.map((accessorie:number, index:number) => {
                        let divWrapStyle = 'flex items-center w-full gap-x-2';
                        if(index > 0) {
                          divWrapStyle += ' mt-3'
                        }
                        return (
                        <div key={accessorie} className={divWrapStyle}>
                          {/* 악세 사진 */}
                          <div className='w-[50px] h-[66px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                            <Image src={'https://pica.korlark.com/efui_iconatlas/acc/acc_213.png'} alt='참혹한 파멸의 목걸이' width={50} height={50} loading="lazy" decoding="async" />
                            <div className='class="w-full h-4 text-center bg-[#8045dd]'>
                              <p className='text-xs font-semibold text-white'>92</p>
                            </div>
                          </div>
                          {/* 악세 정보 */}
                          <div>
                          {/* <p className='truncate text-[0.9rem] font-semibold text-[#D9AB48]'><span className='text-base'>+25</span> 차오른 몽환의 환각 서브 머신건</p> */}
                            <p className='truncate text-[0.9rem] leading-4 font-semibold text-[#D9AB48]'>참혹한 파멸의 목걸이</p>
                            <p className='text-sm font-semibold mt-0.5'>
                              <span>치명 493</span>
                              { index === 0 && <span className='ml-1.5'>특화 491</span> }
                            </p>
                            <p className='text-sm font-semibold mt-0.5'>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>돌격대장 6</span>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] ml-1.5'>바리케이드 3</span>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>공격력 감소 2</span>
                            </p>
                          </div>
                        </div>
                        )
                        })}
                        {/* 어빌리티 스톤 (돌) */}
                        <div className='flex items-center text-left gap-x-2 mt-3'>
                          <div className='w-[50px] h-[50px] rounded-md overflow-hidden shrink-0' style={{background: `linear-gradient(135deg, #3d3325, #dcc999)`}}>
                            <Image src={'https://pica.korlark.com/efui_iconatlas/ability/ability_257.png'} alt='준엄한 비상의 돌 IV' width={50} height={50} decoding="async" />
                          </div>
                          <div>
                            <p className='text-[0.9rem] font-semibold leading-4 text-[#D9AB48]'>준엄한 비상의 돌 IV</p>
                            <p className='mt-1'>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4]'>바리케이드 4</span>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] dark:text-[#cacdd4] ml-1.5'>아드레날린 9</span>
                              <span className='rounded-full px-1.5 py-0.5 font-semibold text-[0.7rem] leading-3 border dark:border-[#cacdd4] text-[#c94c4c] ml-1.5'>공격속도 감소 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 보석 정보 */}
                  <div className='px-[17px] pt-4 pb-2 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
                    <div className='grid grid-cols-11 gap-x-4 place-items-center'>
                      {jewelCount.map((jewel:number) => (
                        <div key={jewel} className='relative w-full max-w-[44px] h-full rounded-md' style={{background: `linear-gradient(135deg, #3b1303, #a23405)`}}>
                          <Image src={'https://pica.korlark.com/efui_iconatlas/use/use_9_55.png'} alt='jewel' width={44} height={44} decoding='async' />
                          <div className='absolute bottom-0 right-0 w-4 h-4 rounded-[4px] rounded-tr-md bg-white dark:bg-[#33353a] opacity-90 flex justify-center items-center'>
                            <p className='text-[11px] text-[#FF6000] dark:text-[#ff9e63] font-medium'>10</p>
                          </div>
                        </div>
                      )
                      )}
                    </div>
                    <div className='grid grid-cols-11 mt-2 gap-x-4'>
                      <div className='flex items-center px-2 gap-x-2 col-span-6'>
                        <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
                        <p className='text-sm font-medium text-black shrink-0 dark:text-inherit'>멸화 6</p>
                        <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
                      </div>
                      <div className='flex items-center px-2 gap-x-2 col-span-5'>
                        <div className='grow h-2 mb-[6px] border-l-2 border-b-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
                        <p className='text-sm font-medium text-black shrink-0 dark:text-inherit'>홍염 5</p>
                        <div className='grow h-2 mb-[6px] border-b-2 border-r-2 border-[#e6e8ec] dark:border-[#7d8395]'></div>
                      </div>
                    </div>
                  </div>
                  {/* 특성, 각인 정보 */}
                  <div className='flex gap-x-6'>
                    {/* 특성 */}
                    <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
                      <div className='class="flex flex-col justify-between'>
                        {/* 기본 특성 */}
                        <div>
                          <div className='flex justify-between items-center'>
                            <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                              <p className='text-sm font-bold text-[#8045dd]'>기본 특성</p>
                            </div>
                            <hr className='grow ml-3 border-basicGrey dark:border-[#7d8395]' />
                          </div>
                          <div className='mt-4 text-sm leading-[17px] pl-1'>
                            <div className='flex justify-between'>
                              <p className='text-[#7d8395]'>공격력</p>
                              <p className='font-semibold text-[#353945] dark:text-inherit'>86,102</p>
                              
                            </div>
                            <div className='flex justify-between text-sm mt-2.5'>
                              <p className='text-[#7d8395]'>
                                <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1 border-[#7d8395]'></span>기본</>
                              </p>
                              <p className='font-semibold text-[#353945] dark:text-inherit'>70,385</p>
                            </div>
                            <div className='flex justify-between text-sm mt-0.5'>
                              <p className='text-[#7d8395]'>
                                <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1  border-[#7d8395]'></span>효과</>
                              </p>
                              <p className='font-semibold text-[#353945] dark:text-inherit'>15,717</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                              <p className='text-[#7d8395]'>최대 생명력</p>
                              <p className="font-semibold text-[#353945] dark:text-inherit">250,639</p>
                            </div>
                          </div>
                        </div>
                        {/* 전투 특성 */}
                        <div className='mt-7'>
                          <div className='flex justify-between items-center'>
                            <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                              <p className='text-sm font-bold text-[#8045dd]'>전투 특성</p>
                            </div>
                            <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
                            <p className='text-sm font-semibold'>합계 2779</p>
                          </div>
                          <div className='mt-4 pl-1'>
                            <div className='space-y-2.5 text-[0.925rem] items-between'>
                              {/* 치특신 */}
                              {/* 가장 높은 값: #8045dd, 2번쨰 높은 값: 5865f2 */}
                              <div className='flex justify-between'>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>치명</p>
                                  <p className='font-semibold text-[#5865f2] dark:text-[#8991ee]'>559</p>
                                </div>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>특화</p>
                                  <p className='font-semibold text-[#8045dd] dark:text-[#a36bfc]'>1852</p>
                                </div>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>신속</p>
                                  <p className='font-semibold text-[#353945] dark:text-inherit'>166</p>
                                </div>
                              </div>
                              {/* 제인숙 */}
                              <div className='flex justify-between'>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>제압</p>
                                  <p className='font-semibold text-[#353945] dark:text-inherit'>70</p>
                                </div>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>인내</p>
                                  <p className='font-semibold text-[#353945] dark:text-inherit'>66</p>
                                </div>
                                <div className='flex justify-between max-w-[75px] w-full'>
                                  <p className='text-[#7d8395]'>숙련</p>
                                  <p className='font-semibold text-[#353945] dark:text-inherit'>66</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 각인 */}
                    <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] flex flex-col'>
                      <div className='shrink-0 flex justify-between items-center'>
                        <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                          <p className='text-sm font-bold text-[#8045dd]'>각인</p>
                        </div>
                        <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
                        <p className='font-semibold'>
                          <span className='text-[#8045dd] dark:text-[#a36bfc]'>33333</span>
                          <span className='text-[#5865f2] dark:text-[#8991ee]'>2</span>
                          <span className='text-warning'></span>
                        </p>
                      </div>
                      <div className='mt-4 pl-1 grow flex flex-col justify-between gap-y-2 overflow-y-auto'>
                        {/* 각인 사진 */}
                        {gagInCount.map((gagIn:number) => (
                          <div key={gagIn} className='flex items-center gap-x-3'>
                            <Image src={'https://pica.korlark.com/EFUI_IconAtlas/buff/buff_71.png'} alt='gagIn' decoding="async" className='rounded-full bg-[#e6e8ec]' width={31} height={31} />
                            <p className='text-lg font-semibold'>
                              <span className='text-[#7d8395]'>Lv.</span>
                              <span>3 원한</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 카드 정보 */}
                  <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
                    <Disclosure as={Fragment}>
                      {({ open }) => (
                        <>
                        <Disclosure.Button className='w-full'>
                          <div className='flex justify-between items-center'>
                            <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
                              <p className='text-sm font-bold text-[#8045dd]'>카드</p>
                            </div>
                            <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
                            <div className='flex items-center space-x-1.5'>
                              <p className='font-semibold'>
                                세상을 구하는 빛&nbsp;
                                <span className='text-[#8045dd] dark:text-[#a36bfc]'>30각</span>
                              </p>
                              <UpArrowSvg isOpen={open} classNameDefault={'w-5 h-5 transition-transform duration-100'} classNameOpen={'rotate-180'} classNameClose={'rotate-0'} />
                            </div>
                          </div>
                          <div className='mt-3 grid grid-cols-6 gap-x-3'>
                            {cardCount.map((card:number) => (
                            <div className='w-full' key={card}>
                              <div className='relative aspect-[248/362] -mr-1'>
                                <div className='absolute inset-0 pl-[1.8%] pr-[4.2%] pt-[5.2%]'>
                                  <Image alt="실리안" width={248} height={362} decoding="async" data-nimg="1" src="https://pica.korlark.com/efui_iconatlas/card_legend/card_legend_00_1.png" />
                                </div>
                                {/* 카드 등급에 따라 bg postion 값이 달라짐 (X 값) */}
                                <div className='absolute inset-0 bg-cover aspect-[248/362] bg-[url(https://pica.korlark.com/2018/obt/assets/images/pc/profile/img_card_grade.png?f9e0ffc8a709611354db408dd0e7a7bb)]'
                                  style={{backgroundPositionX: '80.4%', backgroundPositionY: 'top'}}></div>
                                <div className='absolute bottom-[6.5%] left-[5%] right-[7.5%] overflow-hidden'>
                                  {/* Left를 이용하여 1,2,3,4,5 각 그림 표시 */}
                                {/* absolute top-0 bottom-0 w-full bg-pos-[0_100%] bg-cover left-[-40%] bg-[url(https://pica.korlark.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] */}
                                {/* absolute top-0 bottom-0 w-full bg-pos-[0_100%] bg-cover left-[-100%] bg-[url(https://pica.korlark.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] */}
                                  <div className='relative bg-cover aspect-[10/3] bg-[url(https://pica.korlark.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] drop-shadow-xl'>
                                    <div className='absolute top-0 bottom-0 w-full bg-bottom bg-cover left-0 bg-[url(https://pica.korlark.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)]'></div>
                                  </div>
                                </div>
                              </div>
                              <p className='mt-[6px] -mb-2 px-1 w-full text-center text-xs font-semibold select-text break-keep'>실리안</p>
                            </div>
                            ))}
                          </div>
                        </Disclosure.Button>
                          <Disclosure.Panel className="mt-4 transform scale-100 opacity-100">
                            <div className='grid gap-3 grid-cols-1'>
                              {/* 카드 종류에 따라 div 태그 추가 */}
                              {/* 지금은 1종류만 설정 */}
                              <div className='px-[17px] py-4 bg-[#f5f6f7] dark:bg-[#2b2d31] rounded-xl'>
                                <p className='font-semibold'>세상을 구하는 빛</p>
                                <div className='mt-3 space-y-2'>
                                  {/* 같은 종류 카드에서 효과 리스트 */}
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>2세트</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>암속성 피해 감소 +10.00%</p>
                                  </div>
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>4세트</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>암속성 피해 감소 +10.00%</p>
                                  </div>
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>6세트</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>암속성 피해 감소 +10.00%</p>
                                  </div>
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>12각성</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>공격 속성을 성속성으로 변환</p>
                                  </div>
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>18각성</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>성속성 피해 +7.00%</p>
                                  </div>
                                  <div className='flex'>
                                    <span className='shrink-0 w-[50px] h-5 bg-[#e6e8ec] dark:bg-[#373d41] rounded-[10px] flex justify-center items-center text-xs'>30각성</span>
                                    <p className='ml-[10px] font-semibold text-[0.85rem] break-all'>성속성 피해 +8.00%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 2</Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 3</Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 4</Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 5</Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 6</Tab.Panel>
                <Tab.Panel className='space-y-6'>Content 7</Tab.Panel>
              </Tab.Panels>
            </div>
          </section>
        </Tab.Group>
      </div>
    </div>
  )
}

