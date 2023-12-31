import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { IconDiscord } from '/public/svgs'

export default function Footer() {
  return (
    <footer className='dark:border-[#42464D] mlg:justify-between relative z-[20]'>
      <p className='copy-description dark:text-[#eaf0ec] dark:text-opacity-70 mlg:w-2/3'>
        © 2023 PHH. PHH isn’t endorsed by Smilegate RPG and doesn’t reflect the views or opinions of Smilegate RPG or anyone officially involved in producing or managing Lostark. Lostark and Smilegate RPG are trademarks or registered trademarks of Smilegate RPG, Inc. Lostark © Smilegate RPG, Inc.
      </p>
      <div className='mlg:w-1/3 mlg:min-w-[155px] mlg:items-end'>
        <p className='privacy-text dark:text-[#eaf0ec] dark:text-opacity-70'>
          <Link href='/' as='/' target='_blank' className='none-decoration'>이용약관</Link>
          |
          <Link href='/' as='/' target='_blank' className='none-decoration'>개인정보처리방침</Link>
        </p>
        <div className='discord-wrap'>
          <Image src={IconDiscord} alt='discord icon' />
        </div>
      </div>
    </footer>
  )
}
