import { rankResponseType } from "@/types/rank";

export async function getRankList():Promise<rankResponseType> {
  const response = await fetch(`/api/rank`);
  const rankList = (await response.json()) as rankResponseType;
  return rankList;
}