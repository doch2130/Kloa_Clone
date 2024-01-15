'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import { ArmoryEquipment, ArmoryEquipmentPoint, ArmoryGem, CharacterArmories, Gem } from '@/types/characters'

import { findValuesInText, findSetEffectValuesInText, findElixirEffectValuesInText, findTranscendenceData, tooltipJsonChange, abilityStoneExtractedData, updateCharacterInfo } from './utils'
import { elixirSpecialOptionDescript } from '@/data/ElixirSpecialOptionDescript'
import { jobEngravingDescriptionList } from '@/data/EngravingsData'

import AbilityTab from '@/components/Character/Detail/AbilityTab/AbilityTab'
import AvatarTab from '@/components/Character/Detail/AvatarTab/AvatarTab'
import OwnedCharacterTab from '@/components/Character/Detail/OwnedCharacterTab/OwnedCharacterTab'
import GuildTab from '@/components/Character/Detail/GuildTab/GuildTab'

interface CharacterDetailRightProps {
  data?: CharacterArmories | null | undefined
}

export default function CharacterDetailRight({ data }:CharacterDetailRightProps) {
  const [updatedArmoryGemData, setUpdatedArmoryGemData] = useState<ArmoryGem  | undefined>(data?.ArmoryGem);
  const transcendanceTotalRef = useRef<number>(0);
  const transcendanceAverageRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const updateStats = () => {
      if (data && data.ArmoryProfile.Stats !== null) {
        [data.ArmoryProfile.Stats[2], data.ArmoryProfile.Stats[3]] = [data.ArmoryProfile.Stats[3], data.ArmoryProfile.Stats[2]];
      }
    };

    const updateGems = async () => {
      if (data?.ArmoryGem) {
        let prominenceJewelCount = 0;
        let extinctionJewelCount = 0;
    
        const updatedGems = await Promise.all(
          data.ArmoryGem.Gems?.map(async (gem: Gem) => {
            const gemType = gem.Name.includes('홍염') ? '홍염' : gem.Name.includes('멸화') ? '멸화' : '';
            gemType === '홍염' ? prominenceJewelCount++ : gemType === '멸화' ? extinctionJewelCount++ : null;
    
            const gemTooltipJson = await tooltipJsonChange(gem.Tooltip);
            let skilName = '';
            let skilEffect = '';
            if (gemTooltipJson.Element_004.value.Element_001) {
              const values = findValuesInText(gemTooltipJson.Element_004.value.Element_001);
              skilName = values.skilName;
              skilEffect = values.skilEffect;
            } else {
              const values = findValuesInText(gemTooltipJson.Element_005.value.Element_001);
              skilName = values.skilName;
              skilEffect = values.skilEffect;
            }
    
            return {
              ...gem,
              Type: gemType,
              SkilName: skilName,
              SkilEffect: skilEffect,
            };
          }) || []
        );
    
        const updatedArmoryGem = {
          Gems: updatedGems,
          Effects: data.ArmoryGem.Effects,
          Total: [extinctionJewelCount, prominenceJewelCount],
        };
    
        // 업데이트된 ArmoryGem 객체로 상태를 업데이트합니다.
        // 이렇게 함으로써 React는 변경 사항을 올바르게 감지하고 다시 렌더링을 트리거할 수 있습니다.
        data.ArmoryGem = updatedArmoryGem;
      }
    };

    const sortedGems = () => {
      if(data?.ArmoryGem) {
        const sortedArmoryGemData = data?.ArmoryGem.Gems.sort((a, b) => {
          const typeA = a.Type || '';
          const typeB = b.Type || '';
          const typeComparison = typeA.localeCompare(typeB);
          if (typeComparison !== 0) {
            return typeComparison;
          }
          return b.Level - a.Level;
        });

        data.ArmoryGem.Gems = sortedArmoryGemData;
      }
    }

    const updateAbilityStone = async () => {
      if (data?.ArmoryEquipment) {
        let abilityStoneHealthy = '';
        let itemTear = '';

        const updateArmoryEquipmentAbilityStone = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment) => {
            let result: ArmoryEquipmentPoint[] = [];
            if (armoryEquipment.Type === '어빌리티 스톤') {
              const abilityStoneJson = await tooltipJsonChange(armoryEquipment.Tooltip);

              if(abilityStoneJson.Element_001.value.leftStr2) {
                itemTear = abilityStoneJson.Element_001.value.leftStr2.slice(-12, -7).trim();
              }

              if(abilityStoneJson.Element_004.value.Element_001) {
                abilityStoneHealthy = abilityStoneJson.Element_004.value.Element_001;
              }

              if (abilityStoneJson.Element_006.value.Element_000) {
                result = await Promise.all(
                  [0, 1, 2].map(async (el: number) => {
                    const contentStrElement = abilityStoneJson.Element_006.value.Element_000?.contentStr
                    const elementNumber = `Element_00${el}`

                    const extractedData = abilityStoneExtractedData(contentStrElement[elementNumber].contentStr);
                
                    return extractedData || { Name: '', Value: '' }; // 만약 값이 undefined이면 기본값을 반환
                  })
                )
              } else if (abilityStoneJson.Element_005.value.Element_000) {
                result = await Promise.all(
                  [0, 1, 2].map(async (el: number) => {
                    const contentStrElement = abilityStoneJson.Element_005.value.Element_000?.contentStr
                    const elementNumber = `Element_00${el}`

                    const extractedData = abilityStoneExtractedData(contentStrElement[elementNumber].contentStr);
                
                    return extractedData || { Name: '', Value: '' }; // 만약 값이 undefined이면 기본값을 반환
                  })
                )
              } else {
                // 이벤트 돌은 각인이 없음
                result = [
                  { Name: '', Value: '' },
                  { Name: '', Value: '' },
                  { Name: '', Value: '' }
                ];
              }
              return result
            }
            return undefined
          })
        );

        const abilityStoneIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '어빌리티 스톤');
        if (updateArmoryEquipmentAbilityStone[abilityStoneIndex] !== null && updateArmoryEquipmentAbilityStone[abilityStoneIndex] !== undefined) {
          data.ArmoryEquipment[abilityStoneIndex] = {
            ...data.ArmoryEquipment[abilityStoneIndex],
            'ArmoryEquipmentPoint': updateArmoryEquipmentAbilityStone[abilityStoneIndex] as ArmoryEquipmentPoint[],
            'Healthy': abilityStoneHealthy,
            'Tear': itemTear
          };
        }
      }
    }

    const updateBracelet = async () => {
      if (data?.ArmoryEquipment) {
        let itemTear = '';

        const updateArmoryEquipmentBracelet = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment) => {
            if (armoryEquipment.Type === '팔찌') {
              const braceletJson = await tooltipJsonChange(armoryEquipment.Tooltip);

              if(braceletJson.Element_001.value.leftStr2) {
                itemTear = braceletJson.Element_001.value.leftStr2.slice(-12, -7).trim();
              }

              if(braceletJson.Element_004.value.Element_001) {
                let braceletArraySplitImg = braceletJson.Element_004.value.Element_001.split('</img>');
                braceletArraySplitImg.shift();

                let braceletJsonStr = braceletArraySplitImg.map((braceletSplitImg:string) => {
                  const updateBraceletSplitImg = braceletSplitImg.replace(/<[^>]*>/g, '').trim();
                  if(updateBraceletSplitImg.indexOf(']') >= 0) {
                    return [updateBraceletSplitImg.slice(1, updateBraceletSplitImg.indexOf(']')).trim(), updateBraceletSplitImg.slice(updateBraceletSplitImg.indexOf(']')+1).trim()];
                  } else {
                    return [updateBraceletSplitImg.slice(0, updateBraceletSplitImg.indexOf(' +')).trim(), updateBraceletSplitImg.slice(updateBraceletSplitImg.indexOf(' +')+1).trim()];
                  }
                });

                // console.log('braceletJsonStr ', braceletJsonStr);

                // 정렬할 순서를 정의한 배열
                const order = ['치명', '신속', '특화', '제압', '숙련', '인내'];
                // split을 이용하여 배열로 만들기
      
                // 정렬 함수
                braceletJsonStr.sort((a:string, b:string) => {
                  // console.log('a.includes(str.trim().slice(0, 2)) ', a.trim().includes(a.trim().slice(0, 2)), a);
                    let indexA = order.findIndex(str => a.slice(0, 2).includes(str));
                    let indexB = order.findIndex(str => b.slice(0, 2).includes(str));

                    // 해당 문자열이 order 배열에 없으면 맨 뒤로 보내기
                    if (indexA === -1) indexA = order.length;
                    if (indexB === -1) indexB = order.length;

                    return indexA - indexB;
                });
                
                const result = braceletJsonStr.filter((braceletJson:string) => braceletJson[1] !== '효과 부여 가능');
                // console.log('result ', result);
                
                return result;
              }
            }
            return undefined
          })
        );

        const braceletIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '팔찌');
        // console.log('updateArmoryEquipmentBracelet[braceletIndex] ', updateArmoryEquipmentBracelet[braceletIndex]);

        data.ArmoryEquipment[braceletIndex] = {
          ...data.ArmoryEquipment[braceletIndex],
          'Effects': updateArmoryEquipmentBracelet[braceletIndex],
          'Tear': itemTear,
        }
      }
    }

    const updateEquipmentWeapon = async () => {
      if (data?.ArmoryEquipment) {
        const updateArmoryEquipmentWeapon = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment) => {
            let itemTear = '';
            let qualityValue = 0;
            let basicEffect = '';
            let addEffect = '';
            let itemLevel = '';
            let setEffectName = {
              setName: '',
              setLevel: ''
            };
            
            const tooltipJson = await tooltipJsonChange(armoryEquipment.Tooltip);

            if(armoryEquipment.Type === '무기') {

              if (tooltipJson.Element_001?.value?.leftStr2) {
                // 티어, 품질
                itemTear = tooltipJson.Element_001.value.leftStr2.slice(-12, -8).trim();
                const itemLevelStartIndex = tooltipJson.Element_001.value.leftStr2.indexOf('레벨 ');
                const itemLevelEndIndex = tooltipJson.Element_001.value.leftStr2.indexOf(' (티어');
                itemLevel = tooltipJson.Element_001.value.leftStr2.slice(itemLevelStartIndex+3, itemLevelEndIndex).trim();
                qualityValue = tooltipJson.Element_001.value.qualityValue;
              }

              // 기본 효과
              if(tooltipJson.Element_005.value.Element_001) {
                basicEffect = tooltipJson.Element_005.value.Element_001;
              }

              // 추가 효과
              if(tooltipJson.Element_006.value.Element_001) {
                addEffect = tooltipJson.Element_006.value.Element_001;
              }

              // 세트 효과
              if(tooltipJson.Element_008?.value.Element_001) {
                const setFindValue = await findSetEffectValuesInText(tooltipJson.Element_008.value.Element_001);
                setEffectName = setFindValue;
              }
            }

            return { itemTear, qualityValue, basicEffect, addEffect, itemLevel, setEffectName };
          })
        );

        // 무기 업데이트
        const weaponIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '무기');
        if (weaponIndex >= 0) {
          const weaponAttributeData = {
            basicEffect: updateArmoryEquipmentWeapon[weaponIndex].basicEffect,
            addEffect: updateArmoryEquipmentWeapon[weaponIndex].addEffect,
            itemLevel: updateArmoryEquipmentWeapon[weaponIndex].itemLevel,
            setEffectName: updateArmoryEquipmentWeapon[weaponIndex].setEffectName
          }

          data.ArmoryEquipment[weaponIndex] = {
            ...data.ArmoryEquipment[weaponIndex],
            'Tear': updateArmoryEquipmentWeapon[weaponIndex].itemTear,
            'QualityValue': updateArmoryEquipmentWeapon[weaponIndex].qualityValue,
            'WeaponAttribute': weaponAttributeData
          }
        }
      }
    }

    const updateEquipmentArmors = async () => {
      if (data?.ArmoryEquipment) {
        let transcendanceLevelTotal = 0;
        let averageCount = 0;
        let elixirTotal = 0;
        let elixirSpecialOption = '';

        const updateArmoryEquipmentArmors = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment) => {
            let itemTear = '';
            let qualityValue = 0;
            let basicEffect = [];
            let addEffect = '';
            let itemLevel = '';
            let setEffectName = {
              setName: '',
              setLevel: ''
            };

            let elixirEffect = [];
            let transcendance: (string | number)[] = [];
            
            const tooltipJson = await tooltipJsonChange(armoryEquipment.Tooltip);

            if(armoryEquipment.Type === '투구' || armoryEquipment.Type === '어깨' || armoryEquipment.Type === '상의' || armoryEquipment.Type === '하의' || armoryEquipment.Type === '장갑') {

              if (tooltipJson.Element_001?.value?.leftStr2) {
                // 티어, 품질
                itemTear = tooltipJson.Element_001.value.leftStr2.slice(-12, -8).trim();
                const itemLevelStartIndex = tooltipJson.Element_001.value.leftStr2.indexOf('레벨 ');
                const itemLevelEndIndex = tooltipJson.Element_001.value.leftStr2.indexOf(' (티어');
                itemLevel = tooltipJson.Element_001.value.leftStr2.slice(itemLevelStartIndex+3, itemLevelEndIndex).trim();
                qualityValue = tooltipJson.Element_001.value.qualityValue;
              }

              // 기본 효과
              if(tooltipJson.Element_005.value.Element_001) {
                basicEffect = tooltipJson.Element_005.value.Element_001.split('<BR>');
              }

              // 추가 효과
              if(tooltipJson.Element_006.value.Element_001) {
                addEffect = tooltipJson.Element_006.value.Element_001;
              }

              // 세트 효과
              if (typeof tooltipJson?.Element_011?.value?.Element_000 === 'string' && tooltipJson.Element_011.value.Element_000.includes('세트 효과 레벨')) {
                const setFindValue = await findSetEffectValuesInText(tooltipJson.Element_011.value.Element_001);
                setEffectName = setFindValue;
              } else if (typeof tooltipJson?.Element_010?.value?.Element_000 === 'string' && tooltipJson.Element_010.value.Element_000.includes('세트 효과 레벨')) {
                const setFindValue = await findSetEffectValuesInText(tooltipJson.Element_010.value.Element_001);
                setEffectName = setFindValue;
              } else if (typeof tooltipJson?.Element_009?.value?.Element_000 === 'string' && tooltipJson.Element_009.value.Element_000.includes('세트 효과 레벨')) {
                const setFindValue = await findSetEffectValuesInText(tooltipJson.Element_009.value.Element_001);
                setEffectName = setFindValue;
              } else if (typeof tooltipJson?.Element_008?.value?.Element_000 === 'string' && tooltipJson.Element_008.value.Element_000.includes('세트 효과 레벨')) {
                const setFindValue = await findSetEffectValuesInText(tooltipJson.Element_008.value.Element_001);
                setEffectName = setFindValue;
              }

              // 엘릭서
              // 특옵은 파일에서 데이터로 가져오기
              if(typeof tooltipJson?.Element_008?.value?.Element_000?.topStr === 'string' && tooltipJson?.Element_008?.value?.Element_000?.topStr.includes('엘릭서 효과')) {
                if(tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_000) {
                  const findElixir = await findElixirEffectValuesInText(tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_000?.contentStr);
                  elixirEffect.push(findElixir);
                }
                if(tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_001) {
                  const findElixir = await findElixirEffectValuesInText(tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_001?.contentStr);
                  elixirEffect.push(findElixir);
                }
              } else if(typeof tooltipJson?.Element_009?.value?.Element_000?.topStr === 'string' && tooltipJson?.Element_009?.value?.Element_000?.topStr.includes('엘릭서 효과')) {
                if(tooltipJson?.Element_009?.value?.Element_000?.contentStr?.Element_000) {
                  const findElixir = await findElixirEffectValuesInText(tooltipJson?.Element_009?.value?.Element_000?.contentStr?.Element_000?.contentStr);
                  elixirEffect.push(findElixir);
                }
                if(tooltipJson?.Element_009?.value?.Element_000?.contentStr?.Element_001) {
                  const findElixir = await findElixirEffectValuesInText(tooltipJson?.Element_009?.value?.Element_000?.contentStr?.Element_001?.contentStr);
                  elixirEffect.push(findElixir);
                }
              }

              elixirEffect.forEach((effect) => {
                elixirTotal += Number(effect.elixirEffectLevel);

                const elixirSpecialOptionName = effect.elixirEffectName.replace('(질서)', '').replace('(혼돈)', '').trim();
                if(elixirSpecialOptionDescript[elixirSpecialOptionName] !== undefined) {
                  elixirSpecialOption = elixirSpecialOptionName;
                }
              });

              // 초월
              if(typeof tooltipJson?.Element_007?.value?.Element_000?.topStr === 'string' && tooltipJson?.Element_007?.value?.Element_000?.topStr.includes('[초월]')) {
                if(tooltipJson?.Element_007?.value?.Element_000?.contentStr?.Element_000) {
                  const transcendanceAddEffect = tooltipJson?.Element_007?.value?.Element_000?.contentStr?.Element_000?.contentStr;
                  const findTranscendence = await findTranscendenceData(tooltipJson?.Element_007?.value?.Element_000?.topStr);
                  findTranscendence?.push(transcendanceAddEffect);
                  transcendance = findTranscendence;
                }
              } else if(typeof tooltipJson?.Element_008?.value?.Element_000?.topStr === 'string' && tooltipJson?.Element_008?.value?.Element_000?.topStr.includes('[초월]')) {
                if(tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_000) {
                  const transcendanceAddEffect = tooltipJson?.Element_008?.value?.Element_000?.contentStr?.Element_000?.contentStr;
                  const findTranscendence = await findTranscendenceData(tooltipJson?.Element_008?.value?.Element_000?.topStr);
                  findTranscendence?.push(transcendanceAddEffect);
                  transcendance = findTranscendence;
                }
              }
            }

            return { itemTear, qualityValue, basicEffect, addEffect, itemLevel, setEffectName, elixirEffect, elixirTotal, elixirSpecialOption, transcendance };
          })
        );

        // console.log('updateArmoryEquipmentArmors ', updateArmoryEquipmentArmors);

        ['투구', '어깨', '상의', '하의', '장갑'].forEach((el:string) => {
          const armorIndex = data?.ArmoryEquipment.findIndex(item => item.Type === el);
          if(armorIndex >= 0) {
            const armorAttributeData = {
              basicEffect: updateArmoryEquipmentArmors[armorIndex].basicEffect,
              addEffect: updateArmoryEquipmentArmors[armorIndex].addEffect,
              elixirEffect: updateArmoryEquipmentArmors[armorIndex].elixirEffect,
              elixirTotal: updateArmoryEquipmentArmors[armorIndex].elixirTotal,
              elixirSpecialOption: updateArmoryEquipmentArmors[armorIndex].elixirSpecialOption,
              itemLevel: updateArmoryEquipmentArmors[armorIndex].itemLevel,
              setEffectName: updateArmoryEquipmentArmors[armorIndex].setEffectName,
              transcendance: updateArmoryEquipmentArmors[armorIndex].transcendance,
            }

            transcendanceTotalRef.current += Number(updateArmoryEquipmentArmors[armorIndex].transcendance[1]);
            averageCount++
            transcendanceLevelTotal += Number(updateArmoryEquipmentArmors[armorIndex].transcendance[0]?.toString().replace('단계', ''));

            data.ArmoryEquipment[armorIndex] = {
              ...data.ArmoryEquipment[armorIndex],
              'Tear': updateArmoryEquipmentArmors[armorIndex].itemTear,
              'QualityValue': updateArmoryEquipmentArmors[armorIndex].qualityValue,
              'ArmoryAttribute': armorAttributeData,
            }
          }
        });

        if(transcendanceLevelTotal > 0 && averageCount > 0) {
          transcendanceAverageRef.current = transcendanceLevelTotal/averageCount
        }
      }
    }

    const updateAccessories = async () => {
      if (data?.ArmoryEquipment) {
        let result:ArmoryEquipmentPoint[] = [];
        let necklacetAddEffectArray:string[][] = [];
        let earringAddEffectArray:string[][] = [];
        let ringAddEffectArray:string[][] = [];

        const updateArmoryEquipmentAccessrie = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment) => {
            let itemTear = '';
            let qualityValue = 0;
            
            const tooltipJson = await tooltipJsonChange(armoryEquipment.Tooltip);

            if(armoryEquipment.Type === '목걸이' || armoryEquipment.Type === '귀걸이' || armoryEquipment.Type === '반지') {

              if (tooltipJson.Element_001?.value?.leftStr2) {
                // 티어, 품질
                itemTear = tooltipJson.Element_001.value.leftStr2.slice(-12, -7).trim();
                qualityValue = tooltipJson.Element_001.value.qualityValue;
              }

              // 추가 효과
              if(tooltipJson.Element_005.value.Element_001) {
                if(armoryEquipment.Type === '목걸이') {
                  necklacetAddEffectArray = tooltipJson.Element_005.value.Element_001.split('<BR>');
                  necklacetAddEffectArray = necklacetAddEffectArray.map((necklacetAddEffect:string[]) => {
                    const updateNecklacetAddEffect = necklacetAddEffect.toString().split(' ');
                    return updateNecklacetAddEffect;
                  });
                } else if(armoryEquipment.Type === '귀걸이') {
                  earringAddEffectArray = tooltipJson.Element_005.value.Element_001.split(' ');
                } else if(armoryEquipment.Type === '반지') {
                  ringAddEffectArray = tooltipJson.Element_005.value.Element_001.split(' ');
                }
              }

              // 각인
              if (tooltipJson.Element_006.value.Element_000) {
                result = await Promise.all(
                  [0, 1, 2].map(async (el: number) => {
                    const contentStrElement = tooltipJson.Element_006.value.Element_000?.contentStr
                    const elementNumber = `Element_00${el}`

                    let extractedData = null;

                    if(contentStrElement[elementNumber]?.contentStr) {
                      extractedData = abilityStoneExtractedData(contentStrElement[elementNumber]?.contentStr);
                    }
                
                    return extractedData || { Name: '', Value: '' }; // 만약 값이 undefined이면 기본값을 반환
                  })
                )
              } else {
                result = [
                  { Name: '', Value: '' },
                  { Name: '', Value: '' },
                  { Name: '', Value: '' }
                ];
              }
            }

            return { itemTear, qualityValue, result };
          })
        );

        // 목걸이 업데이트
        const necklaceIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '목걸이');
        if (necklaceIndex >= 0) {
          data.ArmoryEquipment[necklaceIndex] = {
            ...data.ArmoryEquipment[necklaceIndex],
            'Effects': necklacetAddEffectArray,
            'ArmoryEquipmentPoint': updateArmoryEquipmentAccessrie[necklaceIndex].result,
            'Tear': updateArmoryEquipmentAccessrie[necklaceIndex].itemTear,
            'QualityValue': updateArmoryEquipmentAccessrie[necklaceIndex].qualityValue
          }
        }

        // 귀걸이 업데이트
        const earringOneIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '귀걸이');
        const earringTwoIndex = data?.ArmoryEquipment.findIndex((item, index) => index > earringOneIndex && item.Type === '귀걸이');

        if (earringOneIndex >= 0) {
          data.ArmoryEquipment[earringOneIndex] = {
            ...data.ArmoryEquipment[earringOneIndex],
            'Effects': earringAddEffectArray,
            'ArmoryEquipmentPoint': updateArmoryEquipmentAccessrie[earringOneIndex].result,
            'Tear': updateArmoryEquipmentAccessrie[earringOneIndex].itemTear,
            'QualityValue': updateArmoryEquipmentAccessrie[earringOneIndex].qualityValue
          }
        }

        if (earringTwoIndex >= 0) {
          data.ArmoryEquipment[earringTwoIndex] = {
            ...data.ArmoryEquipment[earringTwoIndex],
            'Effects': earringAddEffectArray,
            'ArmoryEquipmentPoint': updateArmoryEquipmentAccessrie[earringTwoIndex].result,
            'Tear': updateArmoryEquipmentAccessrie[earringTwoIndex].itemTear,
            'QualityValue': updateArmoryEquipmentAccessrie[earringTwoIndex].qualityValue
          }
        }

        // 반지 업데이트
        const ringOneIndex = data?.ArmoryEquipment.findIndex(item => item.Type === '반지');
        const ringTwoIndex = data?.ArmoryEquipment.findIndex((item, index) => index > ringOneIndex && item.Type === '반지');

        if (ringOneIndex >= 0) {
          data.ArmoryEquipment[ringOneIndex] = {
            ...data.ArmoryEquipment[ringOneIndex],
            'Effects': ringAddEffectArray,
            'ArmoryEquipmentPoint': updateArmoryEquipmentAccessrie[ringOneIndex].result,
            'Tear': updateArmoryEquipmentAccessrie[ringOneIndex].itemTear,
            'QualityValue': updateArmoryEquipmentAccessrie[ringOneIndex].qualityValue
          }
        }

        if (ringTwoIndex >= 0) {
          data.ArmoryEquipment[ringTwoIndex] = {
            ...data.ArmoryEquipment[ringTwoIndex],
            'Effects': ringAddEffectArray,
            'ArmoryEquipmentPoint': updateArmoryEquipmentAccessrie[ringTwoIndex].result,
            'Tear': updateArmoryEquipmentAccessrie[ringTwoIndex].itemTear,
            'QualityValue': updateArmoryEquipmentAccessrie[ringTwoIndex].qualityValue
          }
        }
      }
    }

    async function fetchData() {
      updateStats();
      await updateEquipmentWeapon();
      await updateEquipmentArmors();
      await updateAccessories();
      await updateBracelet();
      await updateAbilityStone();
      await updateGems();
      sortedGems();
      setUpdatedArmoryGemData(data?.ArmoryGem);
      setIsLoading(true);
      fetchInfoData();
    }

    async function fetchInfoData() {
      if(data !== null && data !== undefined) {
        // console.log('data ', data);

        const characterName = data.ArmoryProfile.CharacterName;
        const characterImage = data.ArmoryProfile.CharacterImage || '';

        const weaponArray = data.ArmoryEquipment.filter((armory) => armory.Type === '무기')?.[0];
        const weaponGrade = weaponArray?.Grade;
        const weaponLevel = weaponArray?.Name?.slice(0, weaponArray.Name.indexOf(' ')).trim();
        const weapon = weaponGrade === '에스더' ? `${weaponLevel} ${weaponGrade}` : '';

        const engravingList:string[] = [];

        data?.ArmoryEngraving?.Effects?.forEach((effect) => {
          // console.log('effect.Name ', effect.Name);
          // const regex = /Lv\.\s(\d+)\s(.+)/;
          const regex = /(.*)(?:\sLv\.\s\d+)/;
          const match = effect.Name.match(regex);
          // console.log('match ', match);
          if(match) {
            const jobEngraving = match[1].trim();
            // console.log('test ', jobEngravingDescriptionList[jobEngraving]);
            if(jobEngravingDescriptionList[jobEngraving] !== undefined) {
              engravingList.push(effect.Name);
            }
          }
        });

        updateCharacterInfo(characterName, characterImage, engravingList, weapon);

      }
    }

    fetchData();

  }, [data]);

  if(!isLoading) {
    return (
      <div className='w-full h-full absolute z-[150] flex items-center justify-center opacity-[0.9]'>
        <h1 className='text-5xl font-bold'>Loading...</h1>
      </div>
    )
  }

  console.log('data ', data);
  
  return (
    <section className='grow pb-[50px]'>
      <div className='pl-[60px] pt-[25px] h-full'>
        <div className='flex justify-end select-none'>
          <div className='flex justify-end items-center gap-x-1.5 mb-[10px] mr-[1px]'>
            {/* 갱신 2분 이후부터 활성화 되는 방식 */}
            {/* 1분 이내면 몇 초 전, 1분 이후부터는 X분전 */}
            <p className='text-sm'>0분전</p>
            {/* 임시로 disabled 즐겨찾기 변수 사용 */}
            <button type='button' disabled={true} className='w-16 h-6 bg-[#dadada] dark:bg-[#44474d] disabled:bg-[#ececec] dark:disabled:bg-[#33353a] disabled:text-[#7d8395] rounded-lg flex items-center justify-center select-none'>
              <p className='text-sm'>갱신하기</p>
            </button>
          </div>
        </div>
        {/* 탭에 따른 데이터 출력 위치 */}
        {isLoading &&
        <Tab.Panels>
          <Tab.Panel>
            <AbilityTab ArmoryEquipment={data?.ArmoryEquipment} ArmoryProfileStats={data?.ArmoryProfile.Stats} ArmoryCard={data?.ArmoryCard}
              ArmoryGem={updatedArmoryGemData} ArmoryEngraving={data?.ArmoryEngraving} CharacterClassName={data?.ArmoryProfile.CharacterClassName}
              transcendanceTotal={transcendanceTotalRef.current} transcendanceAverage={transcendanceAverageRef.current}
            />
          </Tab.Panel>
          <Tab.Panel>스킬</Tab.Panel>
          <Tab.Panel>
            <AvatarTab characterTendencies={data?.ArmoryProfile.Tendencies} characterName={data?.ArmoryProfile.CharacterName}
            characterImage={data?.ArmoryProfile.CharacterImage} armoryAvatars={data?.ArmoryAvatars} />
          </Tab.Panel>
          <Tab.Panel>히스토리</Tab.Panel>
          <Tab.Panel>수집형 포인트</Tab.Panel>
          <Tab.Panel>
            <OwnedCharacterTab />
          </Tab.Panel>
          <Tab.Panel>
            길드 탭은 보류
            {/* <GuildTab /> */}
          </Tab.Panel>
        </Tab.Panels>
        }
      </div>
    </section>
  )
}
