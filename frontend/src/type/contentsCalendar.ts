export interface RewardItem {
  Name: string;
  Icon: string;
  Grade:string;
  StartTimes: string[] | null;
}

export interface OrganizeRewardItem {
  Name: string;
  Icon: string;
}

export interface ContentsCalendar {
  CategoryName: string;
  ContentsName: string;
  ContentsIcon: string;
  MinItemLevel: number;
  StartTimes: string[] | null;
  Location: string;
  RewardItems: RewardItem[];
}

export interface OrganizeContentsCalendar {
  ContentsName: string;
  ContentsIcon: string;
  RewardItemType: string;
  StartTimes: string[];
  RewardItems: OrganizeRewardItem[];
}

// 상속 받을 때 특정 속성을 제외하는 방법 (Grade, StartTimes 제외)
// export interface OrganizeRewardItem extends Omit<RewardItem, 'Grade' | 'StartTimes'> {
//   Name: string;
//   Icon: string;
// }


export interface OrganizeAdventureIslandList {
  [date: string]: OrganizeContentsCalendar[];
}