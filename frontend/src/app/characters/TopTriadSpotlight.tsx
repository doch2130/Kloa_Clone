import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import NumberOne from '@/assets/Icon/Number/one.svg'
import NumberTwo from '@/assets/Icon/Number/two.svg'
import NumberThree from '@/assets/Icon/Number/three.svg'

import tempImage1 from '@/assets/Character/characterImage1.png'
import tempImage2 from '@/assets/Character/characterImage2.png'
import tempImage3 from '@/assets/Character/characterImage3.png'

export default function TopTriadSpotlight() {
  // 여기서 top3 데이터 로딩
  // 이미지 파일 대신 데이터 url로 대체 진행 필요
  // Link href에 캐릭터 이름 매칭 작업 필요
  // 캐릭터 이름, 캐릭터 직업 매칭 작업 필요
  return (
    <>
    <Link href={`./characters/${'name'}`} className='group w-[260px] h-[200px] rounded-[10px] bg-[#15181d] overflow-hidden'>
      <div className='relative w-full h-full opacity-100 translate-x-0'>
        <div className='absolute w-[450px] -left-[90px] group-hover:scale-105 transition-transform duration-700 ease-out -top-[60px]'>
          <Image src={tempImage2} alt={'tempImage'} width={450} height={521} priority={false} placeholder={'blur'} />
        </div>
        <div className='absolute top-5 left-5'>
          <Image src={NumberOne} alt={'tempImage'} priority={false} />
        </div>
        <div className='absolute space-y-1 select-text bottom-5 left-5'>
          <p className='text-xs font-light text-white'>캐릭터 직업</p>
          <p className='text-xl font-semibold text-white'>캐릭터 이름</p>
        </div>
      </div>
    </Link>
    <Link href={`./characters/${'name'}`} className='group w-[560px] h-[220px] rounded-[10px] bg-[#15181d] overflow-hidden ml-5'>
      <div className='relative w-full h-full opacity-100 translate-x-0'>
        <div className='absolute w-[560px] left-0 group-hover:scale-105 transition-transform duration-700 ease-out -top-[84px]'>
          <Image src={tempImage1} alt={'tempImage'} width={560} height={648} priority={false} placeholder={'blur'} />
        </div>
        <div className='absolute top-5 left-[26px]'>
          <Image src={NumberTwo} alt={'tempImage'} priority={false} />
        </div>
        <div className='absolute space-y-1 select-text bottom-5 left-[26px]'>
          <p className='text-xs font-light text-white'>캐릭터 직업</p>
          <p className='text-xl font-semibold text-white'>캐릭터 이름</p>
        </div>
      </div>
    </Link>
    <Link href={`./characters/${'name'}`} className='group w-[260px] h-[200px] rounded-[10px] bg-[#15181d] overflow-hidden ml-5'>
      <div className='relative w-full h-full opacity-100 translate-x-0'>
        <div className='absolute w-[450px] -left-[90px] group-hover:scale-105 transition-transform duration-700 ease-out -top-[60px]'>
          <Image src={tempImage3} alt={'tempImage'} width={450} height={521} priority={false} placeholder={'blur'} />
        </div>
        <div className='absolute top-5 left-5'>
          <Image src={NumberThree} alt={'tempImage'} priority={false} />
        </div>
        <div className='absolute space-y-1 select-text bottom-5 left-5'>
          <p className='text-xs font-light text-white'>캐릭터 직업</p>
          <p className='text-xl font-semibold text-white'>캐릭터 이름</p>
        </div>
      </div>
    </Link>
    </>
  )
}
