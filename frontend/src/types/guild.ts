export interface guildResponseType {
  data: {
    guildList: guildListType[],
    jobClassListCount: jobClassListCountType
  } | null
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


export interface jobClassListCountType {
  [key:string]:number
}
