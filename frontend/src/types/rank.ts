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
  setArmorEffect: string | null
  jobEngraving: string | null
  itemLevelUpdateDate: Date | null
  imgAddress: string | null
}
