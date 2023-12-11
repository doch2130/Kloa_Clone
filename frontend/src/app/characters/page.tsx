import React from 'react'

import styled from './Characters.module.css'

import TopTriadSpotlight from './TopTriadSpotlight'
import CharacterNavigator from './CharacterNavigator'


export default function Characters() {
  return (
    <div className={`${styled.body}`}>
      <div className={`${styled.TopTriadSpotlightSection}`}>
        <TopTriadSpotlight />
      </div>
      <div className={`${styled.CharacterNavigatorSection}`}>
        <CharacterNavigator />
      </div>
    </div>
  )
}
