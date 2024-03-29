import { guildResponseType } from "@/types/guild";

export async function getGuildInfo(guildName:string):Promise<guildResponseType> {
  const response = await fetch(`/api/guild?guildName=${guildName}`);
  const guildInfo = (await response.json()) as guildResponseType;
  return guildInfo;
}
