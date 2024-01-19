import { characterInfoUpdateResponseType, characterResponseType } from "@/types/characters";

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

// export async function updateCharacterInfo(characterName:string):Promise<characterInfoUpdateResponseType> {
export async function updateCharacterInfo(characterName:string, characterImage:string, engravingList:string[], weapon:string, battleLevel:number):Promise<characterInfoUpdateResponseType> {
  const response = await fetch(`/api/lostark/characters/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      characterName: characterName,
      characterImage: characterImage,
      engravingList: engravingList,
      weapon: weapon,
      battleLevel: battleLevel,
    }),
  });
  const characterInfoUpdate = (await response.json()) as characterInfoUpdateResponseType;
  return characterInfoUpdate;
}

type itemGradeStyleBackgroundType = {
  [key:string]: { background: string }
}

type itemGradeStyleColorType = {
  [key:string]: { color: string }
}

export const itemGradeStyleBackground:itemGradeStyleBackgroundType = {
  '에스더': {
    background: `linear-gradient(135deg, #0c2e2c, #2faba8)`
  },
  '고대': {
    background: `linear-gradient(135deg, #3d3325, #dcc999)`
  },
  '유물': {
    background: `linear-gradient(135deg, #341a09, #a24006)`
  },
  '전설': {
    background: `linear-gradient(135deg, #362003, #9e5f04)`
  },
  '영웅': {
    background: `linear-gradient(135deg, #261331, #480d5d)`
  },
  '희귀': {
    background: `linear-gradient(135deg, #111f2c, #113d5d)`
  },
  '고급': {
    background: `linear-gradient(135deg, #1a230e, #374e18)`
  },
  '일반': {
    background: `linear-gradient(135deg, #323232, #6d6d6d)`
  }
}

export const itemGradeStyleColor:itemGradeStyleColorType = {
  '에스더': {
    color: '#1AB9B6'
  },
  '고대': {
    color: '#D9AB48'
  },
  '유물': {
    color: '#FA5D00'
  },
  '전설': {
    color: '#F9AE00'
  },
  '영웅': {
    color: '#8045DD'
  },
  '희귀': {
    color: '#2AB1F6'
  },
  '고급': {
    color: '#2AB1F6'
  },
  '일반': {
    color: '#d7d7d7'
  }
}

export const characterSummaryBackgroundColor = (grade:string, level:number) => {
  let result = 'bg-[000]';

  if(grade === '에스더') {
    result = 'bg-[#00FFFD]';
  } else if (level >= 24) {
    result = 'bg-[#EAC072]';
  } else if (level >= 22) {
    result = 'bg-[#F25068]';
  } else if (level >= 21) {
    result = 'bg-[#315AFE]';
  } else if (level >= 20) {
    result = 'bg-[#F9F9FC]';
  } else if (level >= 18) {
    result = 'bg-[#D26A50]';
  } else if (level >= 15) {
    result = 'bg-[#C05EA9]';
  } else if (level >= 13) {
    result = 'bg-[#325AB7]';
  } else if (level >= 10) {
    result = 'bg-[#274026]';
  }
  
  return result;
}


export const itemQualityCheckFunction = (quality:number, type:'background'|'font') => {
  let result = '';

  if(type === 'background') {
    if(quality === 100) {
      result = 'bg-[#f9ae00] dark:bg-[#eba70c]';
    } else if (quality >= 90) {
      result = 'bg-[#8045dd]';
    } else if (quality >= 70) {
      result = 'bg-[#2AB1F6]';
    } else if (quality >= 30) {
      result = 'bg-[#A0E71C]';
    } else if (quality >= 10) {
      result = 'bg-[#FFE81D] dark:bg-[#d9c514]';
    } else if (quality >= 1) {
      result = 'bg-[#FF7F37]';
    } else if (quality <= 0) {
      result = 'bg-[#CBCDD4]';
    }
  } else if ('font') {
    if(quality === 100) {
      result = 'text-[#f9ae00] dark:text-[#eba70c]';
    } else if (quality >= 90) {
      result = 'text-[#8045dd]';
    } else if (quality >= 70) {
      result = 'text-[#2AB1F6]';
    } else if (quality >= 30) {
      result = 'text-[#A0E71C]';
    } else if (quality >= 10) {
      result = 'text-[#FFE81D] dark:text-[#d9c514]';
    } else if (quality >= 1) {
      result = 'text-[#FF7F37]';
    } else if (quality <= 0) {
      result = 'text-[#CBCDD4]';
    }
  }

  return result;
}



export const findValuesInText = (str: string) => {
  const regex = /<FONT COLOR='#FFD200'>([^<]+)<\/FONT>\s([^<]+)\s?/;
  const match = str.match(regex);

  return match ? { skilName: match[1].trim(), skilEffect: match[2].trim() } : { skilName: '', skilEffect: '' };
};

export const findSetEffectValuesInText = async (str: string) => {
  const regex = /([^<]+)\s<FONT COLOR='#FFD200'>([^<]+)<\/FONT>/;
  const match = str.match(regex);

  return match ? { setName: match[1].trim(), setLevel: match[2].trim() } : { setName: '', setLevel: '' };
};

export const findElixirEffectValuesInText = async (str: string) => {
  const regex = /<FONT color='#FFD200'>\[(.*?)\]<\/FONT>\s(.*?)\s<FONT color='#FFD200'>Lv\.(.*?)<\/FONT><br>([\s\S]*)/;
  const match = str.match(regex);

  if (match) {
    const elixirType = match[1]?.trim();
    const elixirEffectName = match[2]?.trim();
    const elixirEffectLevel = match[3]?.trim();
    const additionalEffects = match[4]?.trim().split('<BR>').filter(effect => effect.trim() !== '');

    return { elixirType, elixirEffectName, elixirEffectLevel, additionalEffects };
  } else {
    return { elixirType: '', elixirEffectName: '', elixirEffectLevel: '', additionalEffects: [] };
  }
};

export const findTranscendenceData = async (str: string) => {
  const regex = /<FONT COLOR='#FF9632'>\[초월\]<\/FONT>\s<FONT COLOR='#FFD200'>(\d+)<\/FONT>단계.*?<img src='emoticon_Transcendence_Grade'.*?>(\d+)/;
  const match = str.match(regex);

  return match ? [`${match[1]}단계`, parseInt(match[2], 10)] : ['', 0];
};


export const tooltipJsonChange = async (tooltip: string) => {
  try {
    return JSON.parse(tooltip);
  } catch (error) {
    console.error('Error parsing Tooltip JSON:', error);
    return null;
  }
};

export const abilityStoneExtractedData = (str: string) => {
  // 정규 표현식을 사용하여 데이터 추출
  const regex = /<FONT COLOR='#[A-Fa-f0-9]+?'>(.*?)<\/FONT>.*?활성도\s*\+(-?\d+)/;
  const match = str.match(regex);

  // 매치 결과에서 데이터 추출
  if (match && match.length >= 3) {
    const name = match[1];
    const value = match[2];

    return { Name: name, Value: value };
  }

  return null; // 매치가 실패한 경우
};

export const findSkillTypeExtracted = (input:string) => {
  // 정규표현식을 사용하여 원하는 문자열 추출
  const awakeningSkillRegex = /<FONT SIZE='14'><FONT COLOR='#E73517'>(.*?)<\/FONT><\/FONT>/g;
  const notAwakeningSkillRegex = /<FONT SIZE='12'><FONT COLOR='#B7DEE8'><FONT COLOR='(#[0-9A-Fa-f]{6})'>\[(.*?)\]<\/FONT><\/FONT><\/FONT>/g;

  // 추출된 문자열을 반환
  let result = '';

  if(awakeningSkillRegex.test(input)) {
    result = '각성기';
  } else {
    const match = notAwakeningSkillRegex.exec(input);
    result = match?.[2] || '';
  }

  return result;
}

export const findAdditionalSkillAttributesExtract = (input: string) => {
  const attributes: Record<string, string> = {
    '부위 파괴': '',
    '무력화': '',
    '공격 타입': '',
    '슈퍼아머': '',
    '카운터': ''
  };

  const attributeCount = Object.keys(attributes).filter(attr => input.includes(attr)).length;

  // 정규표현식을 사용하여 각 속성의 값을 추출
  const attributeString = `<BR><FONT SIZE='12'><FONT COLOR='#EEA839'>(.*?)<\/FONT><\/FONT>`.repeat(attributeCount);
  const attributeRegex = new RegExp(attributeString, 'g');
  const match = attributeRegex.exec(input);

  if(match === null) {
    return attributes; 
  }

  for(let index = 1; index < match.length; index++) {
    const el = match[index];
    if (el !== undefined && el !== '') {
      const splitText = el.split(' : ');
      attributes[splitText[0]] = splitText[1];
    }
  }

  return attributes;
};
