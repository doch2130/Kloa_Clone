export interface NoticePost {
  id: string,
  category: string,
  title: string,
  textData: string,
  writeTime: string,
  viewCount: number,
  recomendCount: number,
}

export type NoticesTopFive = {
  Title: string,
  Date: string,
  Link: string,
  Type: string,
}
