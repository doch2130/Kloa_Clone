'use client'
import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'

import AbilitySection from './AbilitySection'
import { ArmoryEquipment, ArmoryEquipmentPoint, ArmoryGem, CharacterArmories, Gem } from './CharacterResponseType'

interface CharacterDetailRight {
  data?: CharacterArmories | null | undefined
}

const findValuesInText = (str: string) => {
  const regex = /<FONT COLOR='#FFD200'>([^<]+)<\/FONT>\s([^<]+)\s?/;
  const match = str.match(regex);

  return match ? { skilName: match[1].trim(), skilEffect: match[2].trim() } : { skilName: '', skilEffect: '' };
};

const tooltipJsonChange = (tooltip: string) => {
  try {
    return JSON.parse(tooltip);
  } catch (error) {
    console.error('Error parsing Tooltip JSON:', error);
    return null;
  }
};

const abilityStoneExtractedData = (str: string) => {
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

export default function CharacterDetailRight({ data }:CharacterDetailRight) {
  const [updatedArmoryGemData, setUpdatedArmoryGemData] = useState<ArmoryGem  | undefined>(data?.ArmoryGem);
  
  useEffect(() => {
    const updateStats = () => {
      if (data) {
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
    
            const gemTooltipJson = tooltipJsonChange(gem.Tooltip);
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

        const updateArmoryEquipmentAbilityStone = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment, index: number) => {
            let result: ArmoryEquipmentPoint[] = [];
            if (armoryEquipment.Type === '어빌리티 스톤') {
              const abilityStoneJson = tooltipJsonChange(armoryEquipment.Tooltip);

              if(abilityStoneJson.Element_004.value.Element_001) {
                abilityStoneHealthy = abilityStoneJson.Element_004.value.Element_001;
              }

              if (abilityStoneJson.Element_006.value.Element_000) {
                const tempArray = [0, 1, 2]
                result = await Promise.all(
                  tempArray.map(async (el: number) => {
                    const contentStrElement = abilityStoneJson.Element_006.value.Element_000?.contentStr
                    const elementNumber = `Element_00${el}`

                    const extractedData = abilityStoneExtractedData(contentStrElement[elementNumber].contentStr);
                
                    return extractedData || { Name: '', Value: '' }; // 만약 값이 undefined이면 기본값을 반환
                  })
                )
              } else if (abilityStoneJson.Element_005.value.Element_000) {
                const tempArray = [0, 1, 2]
                result = await Promise.all(
                  tempArray.map(async (el: number) => {
                    const contentStrElement = abilityStoneJson.Element_005.value.Element_000?.contentStr
                    const elementNumber = `Element_00${el}`

                    const extractedData = abilityStoneExtractedData(contentStrElement[elementNumber].contentStr);
                
                    return extractedData || { Name: '', Value: '' }; // 만약 값이 undefined이면 기본값을 반환
                  })
                )
              } else {
                // 이벤트 돌은 각인이 없음
                result.push({ Name: '', Value: '' });
                result.push({ Name: '', Value: '' });
                result.push({ Name: '', Value: '' });
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
            'Healthy': abilityStoneHealthy
          };
        }
      }
    }

    const updateBracelet = async () => {
      if (data?.ArmoryEquipment) {
        const updateArmoryEquipmentBracelet = await Promise.all(
          data.ArmoryEquipment?.map(async (armoryEquipment: ArmoryEquipment, index: number) => {
            if (armoryEquipment.Type === '팔찌') {
              const braceletJson = tooltipJsonChange(armoryEquipment.Tooltip);

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
          'Effects': updateArmoryEquipmentBracelet[braceletIndex]
        }
      }
    }


  

    async function fetchData() {
      updateStats();
      await updateGems();
      sortedGems();
      await updateAbilityStone();
      await updateBracelet();
      setUpdatedArmoryGemData(data?.ArmoryGem);
    }

    fetchData();

  }, [data]);
  
  return (
    <section className='grow pb-[50px]'>
      <div className='pl-[60px] pt-[25px] h-full'>
        <div className='flex justify-end select-none'>
          <div className='flex justify-end items-center gap-x-1.5 mb-[10px] mr-[1px]'>
            {/* 갱신 2분 이후부터 활성화 되는 방식 */}
            {/* 1분 이내면 몇 초 전, 1분 이후부터는 X분전 */}
            <p className='text-sm'>14분전</p>
            {/* 임시로 disabled 즐겨찾기 변수 사용 */}
            <button type='button' disabled={false} className='w-16 h-6 bg-[#dadada] dark:bg-[#44474d] disabled:bg-[#ececec] dark:disabled:bg-[#33353a] disabled:text-[#7d8395] rounded-lg flex items-center justify-center select-none'>
              <p className='text-sm'>갱신하기</p>
            </button>
          </div>
        </div>
        {/* 탭에 따른 데이터 출력 위치 */}
        <Tab.Panels>
          <Tab.Panel>
            <AbilitySection ArmoryEquipment={data?.ArmoryEquipment} ArmoryProfileStats={data?.ArmoryProfile.Stats} ArmoryCard={data?.ArmoryCard} ArmoryGem={updatedArmoryGemData} ArmoryEngraving={data?.ArmoryEngraving} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
          <Tab.Panel>Content 4</Tab.Panel>
          <Tab.Panel>Content 5</Tab.Panel>
          <Tab.Panel>Content 6</Tab.Panel>
          <Tab.Panel>Content 7</Tab.Panel>
        </Tab.Panels>
      </div>
    </section>
  )
}
