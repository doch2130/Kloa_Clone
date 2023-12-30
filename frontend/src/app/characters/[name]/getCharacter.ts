// 기존에 임시로 사용하던 Type
export interface equipArray {
  reinforcementLevel: string;
  name: string;
  itemLevel: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  setEffect: string;
  basicEffect: string;
  additionalEffects: string;
  imageSrc: string;
}

export interface equipAccessoriesArray {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  basicEffect: string;
  additionalEffectOne: string,
  additionalEffectTwo?: string,
  gagInOne: string,
  gagInTwo: string,
  gagInDecrease: string,
  imageSrc: string;
}

export interface equipAccessorieBracelet {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  basicEffectArray: string[];
  imageSrc: string;
}


// API 공식 문서 Type
export interface ArmoryProfile {
  CharacterImage: string
  ExpeditionLevel: Number
  PvpGradeName: string
  TownLevel: Number
  default: null
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: Number
  TotalSkillPoint: Number
  Stats: Stat[]
  Tendencies: Tendency[]
  ServerName: string
  CharacterName: string
  CharacterLevel: Number
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
  Point: Number
  MaxPoint: Number
}

export interface ArmoryEquipment {
  Type: string
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
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
  Level: Number
  Type: string
  IsAwakening: boolean
  Tripods: SkillTripod[]
  Rune: SkillRune
  Tooltip: string
}

export interface SkillTripod {
  Tier: Number
  Slot: Number
  Name: string
  Icon: string
  Level: Number
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
  Slot: Number
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
  Slot: Number
  Name: string
  Icon: string
  AwakeCount: Number
  AwakeTotal: Number
  Grade: string
  Tooltip: string
}

export interface CardEffect {
  Index: Number
  CardSlots: Number[]
  Items: Effect[]
}

export interface Effect {
  Name: string
  Description: string
}

export interface ArmoryGem {
  Gems: Gem[]
  Effects: GemEffect[]
}

export interface Gem {
  Slot: Number
  Name: string
  Icon: string
  Level: Number
  Grade: string
  Tooltip: string
}

export interface GemEffect {
  GemSlot: Number
  Name: string
  Description: string
  Icon: string
  Tooltip: string
}

export interface ColosseumInfo {
  Rank: Number
  PreRank: Number
  Exp: Number
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
  Rank: Number
  RankName: string
  RankIcon: string
  RankLastMmr: Number
  PlayCount: Number
  VictoryCount: Number
  LoseCount: Number
  TieCount: Number
  KillCount: Number
  AceCount: Number
  DeathCount: Number
}

export interface Aggregation {
  PlayCount: Number
  VictoryCount: Number
  LoseCount: Number
  TieCount: Number
  KillCount: Number
  AceCount: Number
  DeathCount: Number
}

export interface AggregationElimination {
  FirstWinCount: Number
  SecondWinCount: Number
  ThirdWinCount: Number
  FirstPlayCount: Number
  SecondPlayCount: Number
  ThirdPlayCount: Number
  AllKillCount: Number
  PlayCount: Number
  VictoryCount: Number
  LoseCount: Number
  TieCount: Number
  KillCount: Number
  AceCount: Number
  DeathCount: Number
}

export interface Collectible {
  Type: string
  Icon: string
  Point: Number
  MaxPoint: Number
  CollectiblePoints: CollectiblePoint[]
}

export interface CollectiblePoint {
  PointName: string
  Point: Number
  MaxPoint: Number
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
}

export interface characterResponseType {
  data: null | CharacterArmories;
  message: string;
  status: number;
}

export async function getCharacter(characterName:string):Promise<characterResponseType> {
  const response = await fetch(`/api/lostark/characters?characterName=${characterName}`);
  const character = (await response.json()) as characterResponseType;
  return character;
}


// const dataLoadHandler = async (name:string) => {
//   const characterName = decodeURIComponent(name.trim());
//   try {
//     const resposneCharacter = await fetch(`/api/lostark/characters?characterName=${characterName}`, {
//       method: 'get'
//     });

//     if(resposneCharacter.ok) {
//       const result = await resposneCharacter.json();

//       if(result.status === 200) {
//         // 최근 검색 로컬 스토리지 저장
//         // localStorageSaveHandler('recently', searchValueRef.current.value, setRecentlyData);
//         console.log('result ', result);
//       } else if(result.status === 404) {
//         console.log('not found character');
//       } else {
//         alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
//       }
//       return ;

//     } else {
//       throw new Error('Network response was not ok');
//     }
//   } catch (error) {
//     alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
//     return ;
//   }
// }