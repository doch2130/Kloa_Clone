'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRankList } from './utils'

import TopTriadSpotlight from './TopTriadSpotlight'
import CharacterNavigator from './CharacterNavigator'
import CharacterList from './CharacterList'

export default function Rank() {
  const { data:rankingData, isLoading:rankIsLoading } = useQuery({ queryKey: ['rank'], queryFn: () => getRankList() });
  console.log('rankingData ', rankingData);

  if(rankIsLoading) {
    return (
      <div className='w-full h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }
  return (
    <>
      <TopTriadSpotlight topRankList={rankingData?.data?.slice(0, 3)} />
      <CharacterNavigator />
      <CharacterList rankingList={rankingData?.data} />
    </>
  )
}
