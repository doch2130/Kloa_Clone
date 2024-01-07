'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

import { Character } from '@/types/characters'
import { deleteSearchDataHandler } from './HeaderSearchUtil'

import { IconAlert, IconClose } from '/public/svgs'

type HeaderSearchFormRecentlyProps = {
  recentlyData:Character[];
  setRecentlyData: Function;
}

export default function HeaderSearchFormRecently({ recentlyData, setRecentlyData}:HeaderSearchFormRecentlyProps) {
  useEffect(() => {
    const recentlySearchStorage = localStorage.getItem('recentlySearchStorage');
    if(recentlySearchStorage !== null) {
      const recentlySearchStorageJson = JSON.parse(recentlySearchStorage);
      setRecentlyData(recentlySearchStorageJson);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={recentlyData.length > 0 ? 'navSearchOverBodyFull' : 'nav-search-over-body'}>
    {
    recentlyData.length === 0 ?
      <div className='nav-search-over-body-empty'>
        <Image src={IconAlert} alt='alertIcon' width={24} height={24} />
        <p className='dark:text-[#eaf0ec]'>최근 검색한 캐릭터가 없습니다.</p>
      </div>
    :
    recentlyData.map((el:Character, index:number) =>
      <div key={index} className='w-full h-[55px] border-b border-basicGrey dark:border-[#4d4f55] flex justify-between items-center pl-5 last:border-b-0 hover:bg-[#f9fbfb] dark:bg-[#33353a] hover:dark:bg-[#3a3b41]'>
        <a href='/' className='flex flex-col justify-center grow dark:text-[#eaf0ec] hover:text-[#5865f2] dark:hover:text-[#8991ee]'>
          <p className='font-medium text-main1'>
            <span className='text-xs text-[#7d8395] dark:text-[#acaeb4]'>{el.server}</span>&nbsp;
            <span style={{fontWeight: 600}}>{el.name}</span>
          </p>
          <p className='text-sm font-light text-[#000] dark:text-[#eaf0ec]'>Lv. {el.item_level} {el.job}</p>
        </a>
        <button type='button' className='pr-5'>
          <Image src={IconClose} alt='close button' width={16} height={16}
          onClick={() => deleteSearchDataHandler('recently', el.name, recentlyData, setRecentlyData)} />
        </button>
      </div>
    )
    }
    </div>
  )
}
