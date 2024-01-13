'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { Tab } from '@headlessui/react'

import { useQuery } from '@tanstack/react-query'
import { getCharacter } from './utils'

import CharacterDetailLeft from './CharacterDetailLeft'
import CharacterDetailRight from './CharacterDetailRight'
import { SearchCharacter } from '@/types/characters'

import { localStorageSaveHandler } from '@/components/Header/HeaderSearchUtil'

export default function CharacterDetail() {
  const params = useParams();
  const name = Array.isArray(params.name) ? params.name.join(',') : params.name;

  // 여기서는 데이터 호출하지 않고 페이지만 넘겨준다.
  // 페이지를 넘겨준 후 API를 호출해서 데이터가 있으면 로컬스토리지 저장도 같이 한다.
  // 여기서 1번하면 페이지 이동 후 또 해야하는 현상이 생기기 때문에 여기서는 하지 않는다.
  const { data, isLoading } = useQuery({ queryKey: ['character', name], queryFn: () => getCharacter(name) });
  // console.log('data ', data);

  useEffect(() => {
    if(data !== undefined && data?.status === 200 && data?.data?.ArmoryProfile !== undefined) {
      
      const searchData:SearchCharacter = {
        'name': data?.data?.ArmoryProfile?.CharacterName,
        'job': data?.data?.ArmoryProfile?.CharacterClassName,
        'itemLevel': data?.data?.ArmoryProfile?.ItemAvgLevel,
        'server': data?.data?.ArmoryProfile?.ServerName,
      };
      
      localStorageSaveHandler('recently', searchData);

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  if(isLoading) {
    return (
      <div className='w-full h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if(!isLoading && data?.status === 404) {
    return (
      <div className='w-full h-[50%] min-h-[500px] absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>캐릭터가 존재하지 않습니다.</h1>
      </div>
    )
  }

  return (
    <div className='w-full min-h-full bg-lightGrey dark:bg-[#2b2d31] text-[#353945] dark:text-[#eaf0ec] min-[1260px]:flex min-[1260px]:justify-center relative'>
      <div className='shrink-0 w-[1200px] flex justify-between relative m-auto'>
        <Tab.Group>
          <CharacterDetailLeft ArmoryProfile={data?.data?.ArmoryProfile} />
          <CharacterDetailRight data={data?.data} />
        </Tab.Group>
      </div>
    </div>
  )
}

