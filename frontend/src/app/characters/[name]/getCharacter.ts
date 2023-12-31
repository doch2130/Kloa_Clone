import { characterResponseType } from "./CharacterResponseType";

// 기존에 임시로 사용하던 Type
export interface equipArray {
  reinforcementLevel: string;
  name: string;
  itemLevel: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  setEffect: string;
  basicEffect: string;
  additionalEffects: string;
  imageSrc: string;
}

export interface equipAccessoriesArray {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  quality: string;
  basicEffect: string;
  additionalEffectOne: string,
  additionalEffectTwo?: string,
  gagInOne: string,
  gagInTwo: string,
  gagInDecrease: string,
  imageSrc: string;
}

export interface equipAccessorieBracelet {
  name: string;
  tear: string;
  rating: string;
  equipmentType: string;
  basicEffectArray: string[];
  imageSrc: string;
}

export async function getCharacter(characterName:string):Promise<characterResponseType> {
  const response = await fetch(`/api/lostark/characters?characterName=${characterName}`);
  const character = (await response.json()) as characterResponseType;
  return character;
}


// const dataLoadHandler = async (name:string) => {
//   const characterName = decodeURIComponent(name.trim());
//   try {
//     const resposneCharacter = await fetch(`/api/lostark/characters?characterName=${characterName}`, {
//       method: 'get'
//     });

//     if(resposneCharacter.ok) {
//       const result = await resposneCharacter.json();

//       if(result.status === 200) {
//         // 최근 검색 로컬 스토리지 저장
//         // localStorageSaveHandler('recently', searchValueRef.current.value, setRecentlyData);
//         console.log('result ', result);
//       } else if(result.status === 404) {
//         console.log('not found character');
//       } else {
//         alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
//       }
//       return ;

//     } else {
//       throw new Error('Network response was not ok');
//     }
//   } catch (error) {
//     alert('캐릭터 검색 중 에러가 발생하였습니다. 잠시 후 다시 시도 해주세요.');
//     return ;
//   }
// }