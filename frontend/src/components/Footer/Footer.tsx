import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import DiscordIcon from '@/assets/Icon/discord.svg'

export default function Footer() {
  return (
    <footer>
      <p className='copy-description'>© 2023 KorLARK. KorLARK isn’t endorsed by Smilegate RPG and doesn’t reflect the views or opinions of Smilegate RPG or anyone officially involved in producing or managing Lostark. Lostark and Smilegate RPG are trademarks or registered trademarks of Smilegate RPG, Inc. Lostark © Smilegate RPG, Inc.</p>
      <div>
        <p className='privacy-text'>
          <Link href='/' className='none-decoration'>이용약관</Link>
          |
          <Link href='/' className='none-decoration'>개인정보처리방침</Link>
        </p>
        <div className='discord-wrap'>
          <Image src={DiscordIcon} alt='discord icon' />
        </div>
      </div>
    </footer>
  )
}
