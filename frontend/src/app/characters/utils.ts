import { queryFilterType, rankResponseType } from "@/types/rank";

export async function getRankList(queryFilter:queryFilterType):Promise<rankResponseType> {
  const paramsUrl = `server=${queryFilter.server}&job=${queryFilter.job}&engraving=${queryFilter.engraving}&minLevel=${queryFilter.minLevel}&maxLevel=${queryFilter.maxLevel}`;
  const response = await fetch(`/api/rank?${paramsUrl}`);
  const rankList = (await response.json()) as rankResponseType;
  return rankList;
}