export interface NoticePostResp {
  success: boolean,
  status: number,
  result: NoticePost[],
}


export interface NoticePost {
  id: number;
  category: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt?: string,
  viewCount: number,
  recomendCount: number,
  authorId?: number,
}

export type NoticesTopFive = {
  id: number,
  title: string,
  category: string,
  createdAt: string,
  link: string,
}

export type NoticesTopFiveResp = {
  Title: string,
  Date: string,
  Link: string,
  Type: string,
}
