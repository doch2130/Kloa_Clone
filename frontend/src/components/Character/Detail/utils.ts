import { CharacterInfoResponseType } from "@/types/siblings";

export async function getOwnedCharacter(characterName:string):Promise<CharacterInfoResponseType> {
  const response = await fetch(`/api/lostark/siblings?characterName=${characterName}`);
  const ownedCharacter = (await response.json()) as CharacterInfoResponseType;
  return ownedCharacter;
}

// export async function getGuildData(characterName:string):Promise<CharacterInfoResponseType> {
//   const response = await fetch(`/api/lostark/siblings?characterName=${characterName}`);
//   const ownedCharacter = (await response.json()) as CharacterInfoResponseType;
//   return ownedCharacter;
// }


export const itemLevelBorderStyleFunction = (level:number) => {
  let result = '';

  if(level >= 1620) {
    result = 'border-l-[#D9AB48]';
  } else if (level >= 1600) {
    result = 'border-l-[#e39231]';
  } else if (level >= 1580) {
    result = 'border-l-[#f07516]';
  } else if (level >= 1540) {
    result = 'border-l-[#FA5D00]';
  } else if (level >= 1490) {
    result = 'border-l-[#f99400]';
  } else if (level >= 1475) {
    result = 'border-l-[#F9AE00]';
  } else if (level >= 1300) {
    result = 'border-l-[#8045DD]';
  } else if (level >= 1250) {
    result = 'border-l-[#2AB1F6]';
  } else if( level > 0) {
    result = 'border-l-[#93BC46]';
  } else {
    result = 'border-l-[#e6e8ec]';
  }

  return result;
}