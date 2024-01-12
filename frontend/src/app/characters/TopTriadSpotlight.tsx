import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { rankListType } from '@/types/rank'

import { IconOne, IconTwo, IconThree } from '/public/svgs'

type TopTriadSpotlightProps = {
  topRankList: rankListType[] | undefined | null
}

export default function TopTriadSpotlight({ topRankList }:TopTriadSpotlightProps) {
  return (
    <div className='flex justify-center items-end'>
      <Link href={`./characters/${topRankList?.[1].name}`} className='group w-[260px] h-[200px] rounded-[10px] bg-[#15181d] overflow-hidden'>
        <div className='relative w-full h-full opacity-100 translate-x-0'>
          <div className='absolute w-[450px] -left-[90px] group-hover:scale-105 transition-transform duration-700 ease-out -top-[60px]'>
            <Image src={topRankList?.[1].imgAddress || ''} alt={topRankList?.[1].name || ''} width={450} height={521} priority={false} />
          </div>
          <div className='absolute top-5 left-5'>
            <Image src={IconTwo} alt={'NumberTwo'} priority={false} />
          </div>
          <div className='absolute space-y-1 select-text bottom-5 left-5'>
            <p className='text-xs font-light text-white'>{topRankList?.[1].jobClass}</p>
            <p className='text-xl font-semibold text-white'>{topRankList?.[1].name}</p>
          </div>
        </div>
      </Link>
      <Link href={`./characters/${topRankList?.[0].name}`} className='group w-[560px] h-[220px] rounded-[10px] bg-[#15181d] overflow-hidden ml-5'>
        <div className='relative w-full h-full opacity-100 translate-x-0'>
          <div className='absolute w-[560px] left-0 group-hover:scale-105 transition-transform duration-700 ease-out -top-[84px]'>
            <Image src={topRankList?.[0].imgAddress || ''} alt={topRankList?.[0].name || ''} width={560} height={648} priority={false} />
          </div>
          <div className='absolute top-5 left-[26px]'>
            <Image src={IconOne} alt={'NumberOne'} priority={false} />
          </div>
          <div className='absolute space-y-1 select-text bottom-5 left-[26px]'>
            <p className='text-xs font-light text-white'>{topRankList?.[0].jobClass}</p>
            <p className='text-xl font-semibold text-white'>{topRankList?.[0].name}</p>
          </div>
        </div>
      </Link>
      <Link href={`./characters/${topRankList?.[2].name}`} className='group w-[260px] h-[200px] rounded-[10px] bg-[#15181d] overflow-hidden ml-5'>
        <div className='relative w-full h-full opacity-100 translate-x-0'>
          <div className='absolute w-[450px] -left-[90px] group-hover:scale-105 transition-transform duration-700 ease-out -top-[60px]'>
            <Image src={topRankList?.[2].imgAddress || ''} alt={topRankList?.[2].name || ''} width={450} height={521} priority={false} />
          </div>
          <div className='absolute top-5 left-5'>
            <Image src={IconThree} alt={'NumberThree'} priority={false} />
          </div>
          <div className='absolute space-y-1 select-text bottom-5 left-5'>
            <p className='text-xs font-light text-white'>{topRankList?.[2].jobClass}</p>
            <p className='text-xl font-semibold text-white'>{topRankList?.[2].name}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
