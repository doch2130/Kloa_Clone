export interface SearchCharacter {
  name: string
  job: string
  itemLevel: string
  server: string
}

export interface rankResponseType {
  data: rankListType[] | null
  message: string
  status: number
}

export interface rankListType {
  id: number
  name: string
  itemLevel: number
  server: string
  jobClass: string
  guildName: string | null
  guildMaster: boolean
  setArmorEffect: string | null
  jobEngraving: string | null
  itemLevelUpdateDate: Date | null
  imgAddress: string | null
  ranking: number
}

export interface queryFilterType {
  server: string
  job: string
  engraving: string
  minLevel: number
  maxLevel: number
}

export interface rankResponseInfiniteQueryType {
  pageParams: Array<{
    start: number
    limit: number
  }>
  pages: Array<{
    data: rankListType[];
    message: string;
    status: number;
  }>;
}