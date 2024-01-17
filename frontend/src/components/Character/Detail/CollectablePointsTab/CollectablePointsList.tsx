import React from 'react'
import { Tab, Switch, Transition } from '@headlessui/react'
import { Collectible, CollectiblePoint } from '@/types/characters'

type CollectablePointsListProps = {
  filterCollect:Collectible[]
  category: string
  enabled: boolean
  setEnabled: Function
}

export default function CollectablePointsList({ filterCollect, category, enabled, setEnabled }:CollectablePointsListProps) {
  return (
    <Tab.Panel>
      <div className='flex justify-between'>
        <h2 className='text-base font-semibold text-[#353945] dark:text-white'>{`${category} ${filterCollect[0].Point}/${filterCollect[0].MaxPoint}`}</h2>
        <div className='flex items-center'>
          <span className='text-[0.85rem] leading-4 font-semibold text-[#353945] dark:text-white'>미획득만 보기</span>
          <Switch checked={enabled} onChange={() => setEnabled((prev:boolean) => !prev)}
            className={`${
              enabled ? 'bg-gradient-to-r from-[#5865f2] to-[#8045dd]' : 'bg-[#A8ACB8]'
            } rounded-full inline-flex shrink-0 cursor-pointer self-center h-[22px] w-[44px] outline-none ml-2.5`}
          >
            <span className="sr-only">스위치</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } h-[16px] w-[16px] rounded-full ring-0 pointer-events-none self-center bg-white transition ease-in-out duration-300`}
            />
          </Switch>
        </div>
      </div>
      <div className='mt-5'>
        {filterCollect[0].CollectiblePoints.map((collectibles:CollectiblePoint, index:number) => {
          const isPercentCheck = (collectibles.Point/collectibles.MaxPoint === 1);
          if(isPercentCheck) {
            return (
              <Transition show={!enabled} key={`${collectibles.PointName}_${index}`}
                enter="ease-in-out duration-300 transition-[opacity, height]"
                enterFrom="ease-in-out duration-300 transition-[opacity, height] opacity-0 h-0"
                enterTo="opacity-100 h-[40px]"
                leave="ease-in-out duration-300 transition-[opacity, height]"
                leaveFrom="ease-in-out duration-300 transition-[opacity, height] opacity-100 h-[40px]"
                leaveTo="ease-in-out duration-300 transition-[opacity, height] opacity-0 h-0"
              >
                <div className='flex items-center h-[40px] gap-x-2.5'>
                  <div className='flex items-center'>
                    <span className="flex justify-center items-center w-[26px] h-[26px] rounded-[4px] bg-[#e6e8ec] dark:bg-[#7d8395] font-semibold text-sm">{index+1}</span>
                    <p className="ml-[14px] w-[218px] text-[0.9rem] font-semibold select-text">{collectibles.PointName}</p>
                  </div>
                  {/* 획득 여부 */}
                  <div className='flex items-center gap-x-5 shrink-0'>
                    {category === '모코코 씨앗' &&
                      <p className='w-[75px] text-right text-[0.95rem] leading-6 font-semibold'>{`${collectibles.Point} / ${collectibles.MaxPoint}`}</p>
                    }

                    {(collectibles.Point/collectibles.MaxPoint) === 1 ? 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-7 text-[#8045dd] dark:text-[#a36bfc]">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    : <div className='h-5 w-7'></div>
                    }
                  </div>
                  {category !== '모코코 씨앗' &&
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="30" viewBox="0 0 2 40">
                    <line id="characters_skill_dash" y2="40" transform="translate(1)" fill="none" stroke="#e6e8ec" strokeWidth="2" strokeDasharray="2 4"></line>
                  </svg>
                  {/* 얻는 방법, 위치 */}
                  <span className='!ml-[14px] text-[#7d8395] font-semibold text-sm select-text'>테스트</span>
                  </>
                  }
                </div>
              </Transition>
            )
          } else {
            return (
              <div key={`${collectibles.PointName}_${index}`}>
                <div className='flex items-center h-[40px] gap-x-2.5'>
                  <div className='flex items-center'>
                    <span className="flex justify-center items-center w-[26px] h-[26px] rounded-[4px] bg-[#e6e8ec] dark:bg-[#7d8395] font-semibold text-sm">{index+1}</span>
                    <p className="ml-[14px] w-[218px] text-[0.9rem] font-semibold select-text">{collectibles.PointName}</p>
                  </div>
                  {/* 획득 여부 */}
                  <div className='flex items-center gap-x-5 shrink-0'>
                    {category === '모코코 씨앗' &&
                      <p className='w-[75px] text-right text-[0.95rem] leading-6 font-semibold'>{`${collectibles.Point} / ${collectibles.MaxPoint}`}</p>
                    }

                    {(collectibles.Point/collectibles.MaxPoint) === 1 ? 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-7 text-[#8045dd] dark:text-[#a36bfc]">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    : <div className='h-5 w-7'></div>
                    }
                  </div>
                  {category !== '모코코 씨앗' &&
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="30" viewBox="0 0 2 40">
                    <line id="characters_skill_dash" y2="40" transform="translate(1)" fill="none" stroke="#e6e8ec" strokeWidth="2" strokeDasharray="2 4"></line>
                  </svg>
                  {/* 얻는 방법, 위치 */}
                  <span className='!ml-[14px] text-[#7d8395] font-semibold text-sm select-text'>테스트</span>
                  </>
                  }
                </div>
              </div>
            )
          }
        })}
      </div>
    </Tab.Panel>
  )
}
