'use client'
import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Listbox, Transition } from '@headlessui/react'

import { serverList } from '@/data/ServerListData';
import { IconDownArrow } from '/public/svgs'

import styled from '@/styles/ListBoxSelect.module.css'

export default function Merchant() {
  const [initData, setInitData] = useState<string>('전 서버');

  const onChangeHandler = (value:string) => {
    // console.log('e ', value);
    setInitData(value);
  }

  const topScrollEvent = () => {
    window.scrollTo({top : 0, behavior: 'smooth'});
  }

  const buttonClass = 'flex items-center w-full px-4 py-[11px]';
  return (
    <div className='w-full h-full bg-lightGrey dark:bg-[#2b2d31]'>
      <div className='w-full h-full flex justify-center overflow-y-scroll'>
        <div className='flex flex-col max-w-[1120px] w-full min-h-full mt-[30px]'>
          <button type='button' onClick={() => topScrollEvent()} className='fixed bottom-[30px] right-[1rem] h-[48px] w-[48px] z-[30] flex justify-center items-center bg-white dark:bg-[#2b2d31] border-2 border-[#e6e8ec] rounded-[10px] dark:border-[#42464D]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="heroicon-sw-1.5 h-7 w-7 text-[#7d8395]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
          </button>
          {/* 상단 (서버, 설정) */}
          <div className='flex justify-between w-full h-[48px]'>
            {/* 서버 선택 */}
            <div>
              <div className='group relative border-[#e6e8ec] dark:border-[#646870] border-2 rounded-[0.625rem] w-full !w-[200px] bg-white !dark:bg-[#2b2d31]'>
                <div className='inline-flex justify-between w-full bg-white dark:bg-[#33353a] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  <Listbox value={initData} onChange={(e) => onChangeHandler(e)}>
                    <Listbox.Button className={`${buttonClass}`}>
                      <p className='text-left leading-5 text-sm font-semibold select-none box-border w-full cursor-pointer dark:bg-[#33353a] server-selection text-[#353945] dark:text-[#eaf0ec]'>{initData}</p>
                      <Image src={IconDownArrow} alt='down arrow' className='w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out text-[#7d8395] group-hover:text-[#8045dd]' />
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className='absolute left-0 right-0 top-full mt-1.5 max-h-[200px] rounded-[10px] border border-[#e6e8ec] dark:border-[#4d4f55] shadow-lg overflow-y-auto z-10 bg-white dark:bg-[#33353a] leading-5 text-sm'>
                        <div className='p-1'>
                          {serverList.map((list, listIndex) => (
                            <Listbox.Option
                              key={listIndex}
                              value={list}
                              className={({ active }) =>
                                `text-[#353945] dark:text-[#eaf0ec] rounded-md px-[7px] py-[7px] cursor-pointer ${ active && `${styled.listActiveText} ${styled.listActiveBackground}` }`
                              }
                            >
                              {({ selected }) => (
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>
                                  {list}
                                </span>
                              )}
                            </Listbox.Option>
                          ))}
                        </div>
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
              </div>
            </div>
            {/* 설정 UI */}
            <div className='flex h-full space-x-[36px] alert-wrapper'>
              <div className='inline-flex space-x-[20px]'>
                <div className='inline-flex space-x-[10px] text-[#353945] dark:text-[#eaf0ec]'>
                  <Link href='' as='' className='flex self-center transition-colors duration-300 ease-in-out hover:text-[#8045dd] dark:hover:text-[#a36bfc]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="self-center w-5 h-5 mr-[10px]">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                    </svg>
                    <span className="self-center font-semibold text-[0.9rem]">서버 & 키워드 알림 설정</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className='w-full mt-[30px] flex-col justify-center items-center flex-grow min-h-[300px]'>
            {/* 알림 메시지 */}
            <div className="flex self-center w-full h-[44px] px-[31px] before:content-[''] before:w-[6px] before:h-[40px] before:rounded-[4px] before:top-0 before:left-0 before:self-center before:bg-[#5865f2] dark:before:bg-[#8991EE]">
              <span className='ml-[20px] self-center font-semibold leading-6 text-left text-[#353945] dark:text-[#eaf0ec]'>
                오후 4:00 ~ 오후 9:30 떠돌이 상인이 등장했습니다.&nbsp;판매 마감까지&nbsp;<span className="text-[#5865f2] dark:text-[#8991EE]">04:54:02</span>
                <br />
                {['유디아','아르데타인','볼다이크'].map((el, index:number) => {
                  let text = el;
                  if(index < 2) {
                    text += ', ';
                  }
                  return (
                    <span key={`${el}_${index}`} className="text-[#8045dd] dark:text-[#a36bfc] animate-pulse dark:animate-glow [text-shadow:0.75px_0.75px_10px_#ccaaff] dark:[text-shadow:none]">{text}</span>
                )})}
              </span>
            </div>
            {/* 본문 */}
            <div className='mt-[30px]'>
              <div className='mb-[30px]'>
                {[0, 1, 2,3,4,5,6,7,8,9,10].map((el, index:number) => {
                  return (
                  <div key={`${el}_${index}`} className='first:rounded-t-[10px] last:rounded-b-[10px] w-full relative flex px-[30px] border-t border-l-2 border-r-2 border-[#e6e8ec] first:border-t-2 last:border-b-2 dark:border-[#42464D] h-[70px] bg-white dark:bg-[#33353a]'>
                    <div className='flex grow'>
                      <div className='flex justify-center shrink-0 w-[76px] max-h-[22px] bg-[#8045dd] dark:bg-[#DECFF6] bg-opacity-[26%] text-[#8045dd] rounded-[4px] self-center text-center mr-[20px]'>
                        <span className="self-center leading-5 text-[0.85rem] font-semibold">아브렐슈드</span>
                      </div>
                      <div className='flex flex-col justify-center grow gap-y-1'>
                        <div className='flex justify-between'>
                          <div className="flex space-x-[20px]">
                            <div className="flex space-x-[5px] items-center self-center text-sm text-[#353945] dark:text-[#eaf0ec] font-semibold px-[4px]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-[19px] h-[19px] text-[#C1C3C9] dark:text-[#7d8395] mr-[px]">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                              </svg>
                              <span className="self-center text-sm text-[#353945] dark:text-[#eaf0ec] font-semibold leading-[22px] transition-all duration-200 ease-in-out">
                                아르데타인&nbsp;<span className="ml-0.5 font-semibold">녹스</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end max-w-[292px] w-full gap-5 text-[#7d8395] dark:text-[#eaf0ec]">
                            <div className="relative user-wrapper w-[184px] self-center" data-headlessui-state="">
                              <div className="w-[184px]">
                                <button className="flex items-center w-full text-left group" id="headlessui-menu-button-:ri:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                  <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px] mr-[4px] text-[#7d8395] dark:text-[#eaf0ec] group-hover:text-[#8045dd] dark:group-hover:text-[#a36bfc] transition-colors duration-200 ease-in block">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <div className="flex opacity-0 group-hover:opacity-100 absolute -top-8 -left-[2px] justify-center items-center w-16 h-6 text-xs text-white rounded-[4px] bg-[#121212] after:absolute after:content-[&quot;&quot;] after:top-[80%] after:left-[18%] after:bg-[#121212] after:-translate-x-1/2 after:w-0 after:h-0 after:border-[4px] after:rotate-45 after:border-solid after:border-transparent after:border-top-[4px] after:border-[#353945] transition-opacity duration-100 ease-linear">떠상마스터</div>
                                  </div>
                                  <span className="truncate transition-colors duration-200 ease-in group-hover:text-[#8045dd] dark:group-hover:text-[#a36bfc] text-sm">헤헤누워있을게요</span>
                                </button>
                              </div>
                            </div>
                            <span className="self-center w-[48px]">16:19</span>
                            <div className="relative group">
                              <div className="flex opacity-0 group-hover:opacity-100 absolute -top-10 -left-[2px] justify-center items-center w-6 h-8 text-xs text-white rounded-[4px] bg-[#353945] after:absolute after:content-[&quot;&quot;] after:top-[80%] after:left-[50%] after:-translate-x-1/2 after:w-0 after:h-0 after:border-[5px] after:rotate-45 after:border-solid after:border-transparent after:border-top-[5px] after:border-[#353945] transition-opacity duration-100 ease-linear">0</div>
                            </div>
                          </div>
                        </div>
                        <p className='flex items-center text-sm text-[#353945] dark:text-[#eaf0ec] font-semibold leading-[22px] pl-[4px]'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="shrink-0 w-[20px] h-[20px] text-[#cbcdd4] dark:text-[#646870] self-center">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="px-[4px] leading-[22px] shrink-0">슈테른 네리아 카드</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="shrink-0 w-[20px] h-[20px] text-[#cbcdd4] dark:text-[#646870] self-center">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-[#EB9500] dark:text-[#FFC766] px-[4px] leading-[22px] shrink-0">전설 호감도</span>
                        </p>
                      </div>
                    </div>
                  </div>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
