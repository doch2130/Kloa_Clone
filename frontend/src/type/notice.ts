export interface NoticePostResp {
  success: true,
  status: 200,
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
  Title: string,
  Date: string,
  Link: string,
  Type: string,
}
