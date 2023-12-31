import React from 'react'

import TopTriadSpotlight from './TopTriadSpotlight'
import CharacterNavigator from './CharacterNavigator'
import CharacterList from './CharacterList'
import Footer from '@/components/Footer/Footer'

export default function Characters() {
  return (
    <>
    <div className='max-w-[1120px] pt-[30px] m-auto'>
      <TopTriadSpotlight />
      <CharacterNavigator />
      <CharacterList />
    </div>
    <Footer />
    </>
  )
}
