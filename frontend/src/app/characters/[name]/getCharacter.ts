export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


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

export async function getCharacter(characterName:string) {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await fetch(`/api/lostark/characters?characterName=${characterName}`);
  const character = (await response.json()) as any;
  return character;
}