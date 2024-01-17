import React, { ChangeEvent, useEffect, useState } from 'react'
import { dungeonGoldList } from '@/data/DungeonData'

type GoldSelectProps = {
  characterName: string
  dungeonList: string[]
  setTotalGoldList: Function
  itemLevel: Number
}

export default function GoldSelect({ characterName, dungeonList, setTotalGoldList, itemLevel }:GoldSelectProps) {
  const [selectDungeon, setSelectDungeon] = useState<string[]>([]);

  useEffect(() => {
    let updateSelectDungeon = dungeonList.slice(0, 3);

    if(updateSelectDungeon.includes('카멘 하드 4')) {
      updateSelectDungeon = dungeonList.slice(0, 4);
    }

    if(updateSelectDungeon.includes('아브렐슈드 하드 4') && !updateSelectDungeon.includes('아브렐슈드 하드 1~3')) {
      updateSelectDungeon.push('아브렐슈드 하드 1~3');
    }

    if(updateSelectDungeon.includes('아브렐슈드 노말 4')) {
      if(itemLevel.valueOf() >= 1550 && !updateSelectDungeon.includes('아브렐슈드 하드 1~3')) {
        updateSelectDungeon.push('아브렐슈드 하드 1~3');

      } else if(itemLevel.valueOf() >= 1540) {

        if(!updateSelectDungeon.includes('아브렐슈드 하드 1~2')) {
          updateSelectDungeon.push('아브렐슈드 하드 1~2');
        }

        if(!updateSelectDungeon.includes('아브렐슈드 노말 3')) {
          updateSelectDungeon.push('아브렐슈드 노말 3');
        }
      
      } else if(itemLevel.valueOf() >= 1500 && !updateSelectDungeon.includes('아브렐슈드 노말 1~3')) {
        updateSelectDungeon.push('아브렐슈드 노말 1~3');
      }
    }
    
    setSelectDungeon(updateSelectDungeon);

  }, [dungeonList, itemLevel]);

  useEffect(() => {
    let updateTotalGold = 0;
  
    selectDungeon.forEach((list) => {
      updateTotalGold += Number(dungeonGoldList[list]);
    })

    // setTotalGoldList((prev:Number[]) => [...prev, updateTotalGold]);

    // setTotalGold((prevTotalGold:number) => prevTotalGold + updateTotalGold);
  
  }, [selectDungeon]);

  const selectDungeonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (!isChecked) {
      const filteredSelectDungeon = selectDungeon.filter((selectedValue) => selectedValue !== value);
      setSelectDungeon(filteredSelectDungeon);
    } else {
      setSelectDungeon((prevSelectDungeon) => [...prevSelectDungeon, value]);
    }
  };
  
  return (
    <>
    {dungeonList.map((list:string, idx:number) => {
      const disabledCheck = (selectDungeon.includes('카멘 하드 4') || selectDungeon.includes('아브렐슈드 하드 4') || selectDungeon.includes('아브렐슈드 노말 4'))
        ? selectDungeon.length >= 4 && !selectDungeon.includes(list)
        : selectDungeon.length >= 3 && !selectDungeon.includes(list);
      return (
        <label key={`${characterName}_${list}_${idx}`} className='flex items-center'>
          <input type='checkbox' checked={selectDungeon.includes(list)}
            disabled={disabledCheck}
            value={list} onChange={(e) => selectDungeonHandler(e)} />
          <span className='ml-2 inline-block w-[130px] text-[0.82rem] leading-5 text-[#7d8395]'>{list}
            {(list === '카멘 하드 4' || list === '아브렐슈드 하드 4' || list === '아브렐슈드 노말 4') &&
            <svg className='inline ml-1 -mt-0.5 w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth="2">
              <g>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="m20,11a8.1,8.1 0 0 0 -15.5,-2m-0.5,-4l0,4l4,0"></path>
                <path d="m18,15l2,0a1,1 0 0 1 1,1l0,1a1,1 0 0 1 -1,1l-1,0a1,1 0 0 0 -1,1l0,1a1,1 0 0 0 1,1l2,0"></path>
                <path d="m4.12232,13.12232c0.59032,4.57859 4.17911,7.52459 9.50764,7.12232"></path>
              </g>
            </svg>
            }
          </span>
          <span className='inline-block w-[58px] justify-self-end text-right text-sm font-semibold'>{dungeonGoldList[list]}G</span>
        </label>
      )
    })}
    </>
  )
}
