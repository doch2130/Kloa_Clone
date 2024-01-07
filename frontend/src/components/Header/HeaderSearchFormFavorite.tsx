'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { deleteSearchDataHandler } from './HeaderSearchUtil'
import { Character } from '@/types/characters'

import { IconClose } from '/public/svgs'
import { ImgAuctionEmpty2 } from '/public/images'

export default function HeaderSearchFormFavorite() {
  const [favoriteData, setFavoriteData] = useState<Character[]>([]);

  useEffect(() => {
    const favoriteSearchStorage = localStorage.getItem('favoriteCharactersStorage');
    if(favoriteSearchStorage !== null) {
      const favoriteSearchStorageJson = JSON.parse(favoriteSearchStorage);
      setFavoriteData(favoriteSearchStorageJson);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={favoriteData.length > 0 ? 'navSearchOverBodyFull' : 'nav-search-over-body'}>
    {favoriteData.length === 0 ?
      <div className='nav-search-over-body-empty'>
        <Image src={ImgAuctionEmpty2} alt='SearchListEmptyIcon' width={55} height={64} />
        <p className='dark:text-[#eaf0ec]'>즐겨찾기한 캐릭터가 없습니다.
        <br />캐릭터를 검색한 후 즐겨찾기 해보세요!</p>
      </div>
    :
    favoriteData.map((el:Character, index:number) =>
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
          onClick={() => deleteSearchDataHandler('favorite', el.name, favoriteData, setFavoriteData)} />
        </button>
      </div>
    )
    }
    </div>
  )
}
