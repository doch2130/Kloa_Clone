export type StringOrNumber = string | number;

export interface RewardItem {
  Name: string;
  Icon: string;
}

export interface AdventureIsland {
  data: AdventureIsland;
  ContentsName: string;
  ContentsIcon: string;
  RewardItemType: string;
  StartTimes: string[];
  RewardItems: RewardItem[];
}

export interface AdventureIslandList {
  [date: string]: number | AdventureIsland[];
}

export interface OrganizeAdventureIslandList {
  [date: string]: AdventureIsland[];
}

export interface AdventureIslandResp {
  data: AdventureIsland[] | [];
  status: number;
}
