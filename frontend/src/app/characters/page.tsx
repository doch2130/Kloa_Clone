import React from 'react'

import styled from './Characters.module.css'

import TopSection from './TopSection'


export default function Characters() {
  return (
    <div className={`${styled.body}`}>
      <div className={`${styled.topThreeSection}`}>
        <TopSection />
      </div>
      <div className='list'>
        characters list
      </div>
    </div>
  )
}
