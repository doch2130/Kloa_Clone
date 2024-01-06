// API 공식 문서 Type
export interface ArmoryProfile {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel: number
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: Stat[]
  Tendencies: Tendency[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

export interface Stat {
  Type: string
  Value: string
  Tooltip: string[]
}

export interface Tendency {
  Type: string
  Point: number
  MaxPoint: number
}

export interface ArmoryEquipment {
  Type: string
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
  ArmoryEquipmentPoint?: ArmoryEquipmentPoint[]
  Healthy?: string
  Effects?: string[][]
  Tear?: string
  QualityValue?: number
  WeaponAttribute?: ArmoryEquipmentWeapon
  ArmoryAttribute?: ArmoryEquipmentArmor
}

export interface ArmoryEquipmentWeapon {
  basicEffect: string
  addEffect: string
  itemLevel: string
  setEffectName: {
    setName: string
    setLevel: string
  }
}

export interface ArmoryEquipmentArmor {
  basicEffect: string[]
  addEffect: string
  elixirEffect: ElixirEffect[]
  elixirTotal: number
  elixirSpecialOption: string
  itemLevel: string
  setEffectName: {
    setName: string
    setLevel: string
  }
  transcendance: (string | number)[]
}

export interface ElixirEffect {
  additionalEffects: string[]
  elixirEffectLevel: string
  elixirEffectName: string
  elixirType: string
}

export interface ArmoryEquipmentPoint {
  Name: string
  Value: string
}

export interface ArmoryAvatar {
  Type: string
  Name: string
  Icon: string
  Grade: string
  IsSet: boolean
  IsInner: boolean
  Tooltip: string
}

export interface ArmorySkill {
  Name: string
  Icon: string
  Level: number
  Type: string
  IsAwakening: boolean
  Tripods: SkillTripod[]
  Rune: SkillRune
  Tooltip: string
}

export interface SkillTripod {
  Tier: number
  Slot: number
  Name: string
  Icon: string
  Level: number
  IsSelected: boolean
  Tooltip: string
}

export interface SkillRune {
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}

export interface ArmoryEngraving {
  Engravings: Engraving[]
  Effects: EngravingEffect[]
}

export interface Engraving {
  Slot: number
  Name: string
  Icon: string
  Tooltip: string
}

export interface EngravingEffect {
  Icon: string
  Name: string
  Description: string
}

export interface ArmoryCard {
  Cards: Card[]
  Effects: CardEffect[]
}

export interface Card {
  Slot: number
  Name: string
  Icon: string
  AwakeCount: number
  AwakeTotal: number
  Grade: string
  Tooltip: string
}

export interface CardEffect {
  Index: number
  CardSlots: number[]
  Items: Effect[]
}

export interface Effect {
  Name: string
  Description: string
}

export interface ArmoryGem {
  Gems: Gem[]
  Effects: GemEffect[]
  Total?: number[]
}

export interface Gem {
  Slot: number
  Name: string
  Icon: string
  Level: number
  Grade: string
  Tooltip: string
  Type?: string
  SkilName?: string | null
  SkilEffect?: string | null
}

export interface GemEffect {
  GemSlot: number
  Name: string
  Description: string
  Icon: string
  Tooltip: string
}

export interface ColosseumInfo {
  Rank: number
  PreRank: number
  Exp: number
  Colosseums: Colosseum[]
}

export interface Colosseum {
  SeasonName: string
  Competitive: AggregationTeamDeathMatchRank
  TeamDeathmatch: Aggregation
  Deathmatch: Aggregation
  TeamElimination: AggregationElimination
  CoOpBattle: Aggregation
}

export interface AggregationTeamDeathMatchRank {
  Rank: number
  RankName: string
  RankIcon: string
  RankLastMmr: number
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface Aggregation {
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface AggregationElimination {
  FirstWinCount: number
  SecondWinCount: number
  ThirdWinCount: number
  FirstPlayCount: number
  SecondPlayCount: number
  ThirdPlayCount: number
  AllKillCount: number
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface Collectible {
  Type: string
  Icon: string
  Point: number
  MaxPoint: number
  CollectiblePoints: CollectiblePoint[]
}

export interface CollectiblePoint {
  PointName: string
  Point: number
  MaxPoint: number
}

export interface CharacterArmories {
  ArmoryAvatars: ArmoryAvatar[]
  ArmoryCard: ArmoryCard
  ArmoryEngraving: ArmoryEngraving
  ArmoryEquipment: ArmoryEquipment[]
  ArmoryGem: ArmoryGem
  ArmoryProfile: ArmoryProfile
  ArmorySkills: ArmorySkill[]
  Collectibles: Collectible[]
  ColosseumInfo: ColosseumInfo
  transcendanceTotal?: number
}

export interface characterResponseType {
  data: null | CharacterArmories;
  message: string;
  status: number;
}
