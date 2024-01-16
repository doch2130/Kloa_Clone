export interface guildResponseType {
  data: guildListType[] | null
  message: string
  status: number
}

export interface guildListType {
  id: number
  name: string
  battleLevel: number
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