export interface CharacterInfo {
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

export interface CharacterInfoResponseType {
  data: null | CharacterInfo[]
  message: string
  status: number
}
