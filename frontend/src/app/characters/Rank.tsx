'use client'
import React, { useRef, useState } from 'react'
import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { queryFilterType, rankListType, rankResponseInfiniteQueryType, rankResponseType } from '@/types/rank'

import TopTriadSpotlight from './TopTriadSpotlight'
import CharacterNavigator from './CharacterNavigator'
import CharacterList from './CharacterList'
import ScrollTopButton from '@/components/UI/ScrollTopButton'

export default function Rank() {
  const [queryFilter, setQueryFilter] = useState<queryFilterType>({
    server: '전 서버',
    job: '전체 클래스',
    engraving: '전체',
    minLevel: 0,
    maxLevel: 1700,
  });

  const {
    data: rankingData,
    isLoading: rankIsLoading,
    isSuccess: rankIsSuccess,
    isFetchingNextPage: rankIsFetchingNextPage,
    fetchNextPage: rankFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['rank', queryFilter],
    queryFn: async ({ pageParam = { start: 0, limit: 100 } }: { pageParam?: { start: number; limit: number} } ) => {
      const paramsUrl = `server=${queryFilter.server}&job=${queryFilter.job}&engraving=${queryFilter.engraving}&minLevel=${queryFilter.minLevel}&maxLevel=${queryFilter.maxLevel}&start=${pageParam?.start}&limit=${pageParam?.limit}`
      const res = await fetch(`/api/rank?${paramsUrl}`)
      return await res.json()
    },
    getNextPageParam: (lastPage: rankResponseType) => {
      // console.log('lastPage ', lastPage);
      const lastIdx = lastPage?.data !== null ? lastPage?.data?.length - 1 : 99
      const lastRank = lastPage?.data?.[lastIdx];

      return lastRank ? { start: lastRank.ranking + 1, limit: 100 } : false;
    },
    initialPageParam: { start: 0, limit: 100 },
  } as unknown as UseInfiniteQueryOptions<rankListType[], Error, rankResponseInfiniteQueryType>);


  // console.log('rankingData ', rankingData);
  // console.log('rankIsSuccess ', rankIsSuccess);
  // console.log('rankIsFetchingNextPage ', rankIsFetchingNextPage);

  if(rankIsLoading) {
    return (
      <div className='w-full h-full min-h-[700px] relative z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <TopTriadSpotlight topRankList={rankingData?.pages[0]?.data?.slice(0, 3)} />
      <CharacterNavigator queryFilter={queryFilter} setQueryFilter={setQueryFilter} />
      <CharacterList rankingList={rankingData?.pages?.flatMap(page => page.data) || []} rankFetchNextPage={rankFetchNextPage} rankIsFetchingNextPage={rankIsFetchingNextPage} />
      <ScrollTopButton />
    </>
  )
}
