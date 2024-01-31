export interface merchantResponseType {
  data: {
    guildList: merchantListType[],
  } | null
  message: string
  status: number
}

export interface merchantListType {
  id: number
  server: string
  location: string
  npcName: string
  informant: string
  itemList: string
  reportTime: Date
}

