import React, { Fragment, useState } from 'react'
import { Tab, Switch, Transition } from '@headlessui/react'
import { ArmoryEquipment, Collectible, CollectiblePoint } from '@/types/characters'
import CollectablePointsList from './CollectablePointsList'

type CollectablePointsProps = {
  compass?: ArmoryEquipment
  charm?: ArmoryEquipment 
  sentence?: ArmoryEquipment 
  collectibles?: Collectible[]
}

const categories:string[] = ['섬의 마음', '거인의 심장', '오르페우스의 별', '위대한 미술품', '기억의 오르골', '모코코 씨앗', '이그네아의 징표', '세계수의 잎', '항해 모험물'];
const categoriesBackgroundPosition = ['-234px -24px', '-205px -173px', '-234px -70px', '-181px -172px', '0px -216px', '-234px -94px', '-234px 0px', '-234px -48px', '-234px -117px'];

export default function CollectablePointsTab({ compass, charm, sentence, collectibles }:CollectablePointsProps) {
  const [enabled, setEnabled] = useState<boolean>(false);

  console.log('collectibles ',collectibles);
  
  return (
    <Tab.Group>
      {/* 생활 레벨, 특수 장비 */}
      {/* 생활 스킬 레벨 데이터 가져오는 방법 체크 필요, 일단 보류 */}
      {/* <div className='flex gap-x-6'></div> */}
      {/* 데이터 선택 종류 */}
      <Tab.List className="grid grid-cols-2 gap-2">
        {collectibles !== undefined && categories.map((category, index:number) => {
          const filterCollect = collectibles.filter((collect:Collectible) => collect.Type === category);
          const percentage = (filterCollect[0].Point/filterCollect[0].MaxPoint) * 100;
          const formattedPercentage = Math.ceil(percentage * 10) / 10;
          return (
            <Tab key={category} as={Fragment}>
              {({ selected }) => (
                <div className={`w-full h-[75px] rounded-xl overflow-hidden relative select-none text-[#353945] dark:text-[#b6b9c2]  bg-white dark:bg-[#33353a] border shadow-[1px_1px_8px_0_rgba(72,75,108,.06)] ${selected ? 'border-[#353945] dark:border-[#7d8395]' : 'border-[#e6e8ec] dark:border-[#4d4f55]'}`}>
                  <div className={`absolute top-0 bottom-0 left-0 from-[#5865f2] to-[#8045dd] bg-gradient-to-r opacity-[15%] dark:opacity-[35%] scale-x-100`} style={{width: `${formattedPercentage}%`}}></div>
                  <div className='absolute inset-0 px-[17px] py-4 flex items-center justify-between z-10 dark:text-white'>
                    <div className='flex items-center'>
                      <span className='inline-block mr-2 drop-shadow' style={{backgroundImage: `url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/sprite/sprite_profile.png)`, backgroundPosition: categoriesBackgroundPosition[index], width: '20px', height: '20px'}}></span>
                      <p className='text-sm font-semibold'>{category}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold'>{formattedPercentage}%</p>
                      <p className='text-sm text-[#7d8395]'>{filterCollect[0].Point}/{filterCollect[0].MaxPoint}</p>
                    </div>
                  </div>
                </div>
              )}
            </Tab>
          )
        })}
      </Tab.List>

      {/* 선택에 따른 데이터 출력 */}
      <Tab.Panels className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
      {collectibles !== undefined && categories.map((category, index:number) => {
        const filterCollect = collectibles.filter((collect:Collectible) => collect.Type === category);
        return (
          <CollectablePointsList key={`${category}_${index}`} filterCollect={filterCollect} category={category} enabled={enabled} setEnabled={setEnabled} />
        )
      })}
      </Tab.Panels>
    </Tab.Group>
  )
}
