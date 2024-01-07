import { elixirSpecialOptionDescript } from "@/data/ElixirSpecialOptionDescript";
import { Effect, EngravingEffect, ArmoryEquipment } from "@/types/characters";



export const findArmoryEngravingValue = (armoryEngravingEffects:EngravingEffect[]) => {
  // str = engraving.Name
  const valueList: string[] = [];
  const styleList: string[] = [];

  armoryEngravingEffects?.forEach((effects:Effect) => {
    const value = effects.Name.slice(effects.Name.indexOf('Lv. ')+4, effects.Name.indexOf('Lv. ')+5);
    valueList.push(value);
    
    const style = effects.Name.includes('감소') ? 'text-[#f95126]' : effects.Name.includes('Lv. 3') ? 'text-[#8045dd] dark:text-[#a36bfc]' : 'text-[#5865f2] dark:text-[#8991ee]';
    styleList.push(style);
  });

  return [valueList, styleList];
}

export const findValueInEngravingPoint = (str: string) => {
  const startIndex = str.indexOf('각인 활성 포인트 ')+10;
  const endIndex = str.indexOf('<\/FONT>', startIndex);

  return str.slice(startIndex, endIndex);
}


export const elixirSpecialEffectCheck = (ArmoryEquipment:ArmoryEquipment[]) => {
  let isCheck = false;
  let optionList:string[] = [];
  let resultDescription:string[] = [];

  ['투구', '장갑'].forEach((el:string) => {
    const armorIndex = ArmoryEquipment?.findIndex(item => item.Type === el);

    if(armorIndex !== undefined && armorIndex >= 0) {
      ArmoryEquipment[armorIndex].ArmoryAttribute?.elixirEffect.forEach((effect) => {
        if(effect.elixirEffectName.includes('(질서)') || effect.elixirEffectName.includes('(혼돈)')) {
          optionList.push(effect.elixirEffectName);
        }
      });
    }
  });

  if(optionList.length === 2) {
    isCheck = optionList[0].replace('(질서)', '').replace('(혼돈)', '').trim() === optionList[1].replace('(질서)', '').replace('(혼돈)', '').trim();
  }

  if(isCheck) {
    const armorIndex = ArmoryEquipment?.findIndex(item => item.Type === '투구');

    if (armorIndex !== undefined && ArmoryEquipment?.[armorIndex]?.ArmoryAttribute?.elixirTotal !== undefined) {
      const elixirTotal = ArmoryEquipment[armorIndex]?.ArmoryAttribute?.elixirTotal;

      if (elixirTotal !== undefined && elixirTotal >= 40) {
        resultDescription = elixirSpecialOptionDescript[optionList[0].replace('(질서)', '').replace('(혼돈)', '').trim()];
      } else if (elixirTotal !== undefined && elixirTotal >= 35) {
        resultDescription.push(elixirSpecialOptionDescript[optionList[0].replace('(질서)', '').replace('(혼돈)', '').trim()][0]);
      } else {
        resultDescription.push('');
      }
    }
  } else {
    resultDescription.push('');
  }

  return resultDescription;
}

export const findValueInText = (str:string) => {
  // 정규 표현식을 사용하여 숫자를 찾습니다.
  const regex = /<font color='#99ff99'>(\d+)<\/font>/;
  const match = str.match(regex);
  // 매치된 값이 있다면 반환하고, 없으면 null을 반환합니다.
  return match ? parseInt(match[1], 10).toLocaleString() : null;
}

export const transformSetString = (input:string, isTitle:boolean) => {
  const regex = /(\d+)세트(?: \((\d+)각성합계\))?/g;
  const matches = input.match(regex);
  if(matches !== null) {
    if(isTitle) {
      return matches[0].replace(regex, (match, set, awakening) => {
        if (awakening) {
          return awakening + '각';
        } else {
          return set + '세트';
        }
      });
    } else {
      return matches[0].replace(regex, (match, set, awakening) => {
        if (awakening) {
          return awakening + '각성';
        } else {
          return set + '세트';
        }
      });
    }
  }
}