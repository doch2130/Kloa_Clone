import React from 'react'
import { ArmoryCard, ArmoryEquipment, Stat, ArmoryGem, ArmoryEngraving} from './CharacterResponseType'

import AbilityTapCardSection from './AbilityTapCardSection'
import AbilityTabGemSection from './AbilityTabGemSection'
import AbilityTabStatusSection from './AbilityTabStatusSection'
import AbilityTabEngraving from './AbilityTabEngraving'
import AbilityTabEquipSection from './AbilityTabEquipSection'

interface AbilityTabProps {
  ArmoryEquipment?: ArmoryEquipment[]
  ArmoryProfileStats?: Stat[]
  ArmoryCard?: ArmoryCard
  ArmoryGem?: ArmoryGem
  ArmoryEngraving?: ArmoryEngraving
  CharacterClassName?: string
  transcendanceTotal?: number
  transcendanceAverage?: number
}

export default function AbilityTab({ ArmoryEquipment, ArmoryProfileStats, ArmoryCard, ArmoryGem, ArmoryEngraving, CharacterClassName, transcendanceTotal, transcendanceAverage }:AbilityTabProps) {
  return (
    <>
    {/* 장착 장비 정보 */}
    <AbilityTabEquipSection ArmoryEquipment={ArmoryEquipment} ArmoryEngraving={ArmoryEngraving} CharacterClassName={CharacterClassName} transcendanceTotal={transcendanceTotal} transcendanceAverage={transcendanceAverage} />

    {/* 보석 정보 */}
    <AbilityTabGemSection ArmoryGem={ArmoryGem} />
    
    {/* 특성, 각인 정보 */}
    <div className='flex gap-x-6 mt-6'>
      {/* 특성 */}
      <AbilityTabStatusSection ArmoryProfileStats={ArmoryProfileStats} />
      {/* 각인 리스트 */}
      <AbilityTabEngraving ArmoryEngraving={ArmoryEngraving} />
    </div>
    
    {/* 카드 정보 */}
    <AbilityTapCardSection ArmoryCard={ArmoryCard} />
    </>
  )
}
