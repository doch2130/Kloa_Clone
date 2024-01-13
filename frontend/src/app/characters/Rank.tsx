'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRankList } from './utils'
import { queryFilterType } from '@/types/rank'

import TopTriadSpotlight from './TopTriadSpotlight'
import CharacterNavigator from './CharacterNavigator'
import CharacterList from './CharacterList'

export default function Rank() {
  const [queryFilter, setQueryFilter] = useState<queryFilterType>({
    server: '전 서버',
    job: '전체 클래스',
    engraving: '전체',
    minLevel: 0,
    maxLevel: 1655,
  });

  const { data:rankingData, isLoading:rankIsLoading } = useQuery({ queryKey: ['rank', queryFilter], queryFn: () => getRankList(queryFilter) });

  if(rankIsLoading) {
    return (
      <div className='w-full h-full min-h-[700px] relative z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <TopTriadSpotlight topRankList={rankingData?.data?.slice(0, 3)} />
      <CharacterNavigator queryFilter={queryFilter} setQueryFilter={setQueryFilter} />
      <CharacterList rankingList={rankingData?.data} />
    </>
  )
}
