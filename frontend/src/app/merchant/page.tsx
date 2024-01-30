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
  const buttonClass = 'flex items-center w-full px-4 py-[11px]';
  return (
    <div className='w-full h-full bg-lightGrey dark:bg-[#2b2d31]'>
      <div className='w-full h-full flex justify-center overflow-y-scroll'>
        <div className='flex flex-col max-w-[1120px] w-full min-h-full mt-[30px]'>
          <button type='button' className='fixed bottom-[30px] right-52 h-[48px] w-[48px] z-[3] flex justify-center items-center bg-white dark:bg-[#2b2d31] border-2 border-[#e6e8ec] rounded-[10px] dark:border-[#42464D]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="heroicon-sw-1.5 h-7 w-7 text-[#7d8395]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
          </button>
          {/* 상단 (서버, 설정) */}
          <div className='flex justify-between w-full h-[48px]'>
            {/* 서버 선택 */}
            <div>
              <div className='group relative border-basicGrey dark:border-[#646870] border-2 rounded-[0.625rem] w-full !w-[200px] bg-white !dark:bg-[#2b2d31]'>
                <div className='inline-flex justify-between w-full bg-white dark:bg-[#33353a] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  <Listbox value={initData} onChange={(e) => onChangeHandler(e)}>
                    <Listbox.Button className={`${buttonClass}`}>
                      <p className='text-left leading-5 text-sm font-semibold select-none box-border w-full cursor-pointer dark:bg-[#33353a] server-selection text-[#353945] dark:text-[#eaf0ec]'>{initData}</p>
                      <Image src={IconDownArrow} alt='down arrow' className='w-5 h-5 ml-2 -mr-1 transition duration-300 ease-in-out text-[#7d8395] group-hover:text-[#8045dd]' />
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className='absolute left-0 right-0 top-full mt-1.5 max-h-[200px] rounded-[10px] border border-basicGrey dark:border-[#4d4f55] shadow-lg overflow-y-auto z-10 bg-white dark:bg-[#33353a] leading-5 text-sm'>
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
              <div className='mb-[30px]'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
