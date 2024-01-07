'use client'
import React, { useEffect, useState } from 'react'
import { Stat } from '@/types/characters'
import { findValueInText } from './utils'

interface AbilityTabStatusProps {
  ArmoryProfileStats?: Stat[]
}

export default function AbilityTabStatusSection({ ArmoryProfileStats }:AbilityTabStatusProps) {
  const ArmoryProfileStatsCloenOne = ArmoryProfileStats !== undefined ? ArmoryProfileStats.slice(0, 3) : [];
  const ArmoryProfileStatsCloenTwo = ArmoryProfileStats !== undefined ? ArmoryProfileStats.slice(3, 6) : [];
  const [statusSum, setStatusSum] = useState(0);
  const [statusMaxValue, setStatusMaxValue] = useState(['치명', '치명']);

  useEffect(() => {
    if(ArmoryProfileStats !== undefined) {
      const sortedData = ArmoryProfileStats.slice(0, 6).sort((a, b) => parseInt(b.Value) - parseInt(a.Value));

      let sum = 0;
      sortedData.forEach((data) => {
        sum += Number(data.Value);
      });
      setStatusSum(sum);
      setStatusMaxValue([sortedData[0].Type, sortedData[1].Type]);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='px-[17px] py-4 w-full h-[300px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
      <div className='class="flex flex-col justify-between'>
        {/* 기본 특성 */}
        <div>
          <div className='flex justify-between items-center'>
            <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
              <p className='text-sm font-bold text-[#8045dd]'>기본 특성</p>
            </div>
            <hr className='grow ml-3 border-basicGrey dark:border-[#7d8395]' />
          </div>
          <div className='mt-4 text-sm leading-[17px] pl-1'>
            <div className='flex justify-between'>
              <p className='text-[#7d8395]'>공격력</p>
              <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && Number(ArmoryProfileStats[7].Value).toLocaleString()}</p>
            </div>
            <div className='flex justify-between text-sm mt-2.5'>
              <p className='text-[#7d8395]'>
                <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1 border-[#7d8395]'></span>기본</>
              </p>
              <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && findValueInText(ArmoryProfileStats[7].Tooltip[1])}</p>
            </div>
            <div className='flex justify-between text-sm mt-0.5'>
              <p className='text-[#7d8395]'>
                <><span className='ml-2.5 mr-2 w-[6px] h-[4px] border-l border-b inline-block mb-1  border-[#7d8395]'></span>효과</>
              </p>
              <p className='font-semibold text-[#353945] dark:text-inherit'>{ArmoryProfileStats !== undefined && findValueInText(ArmoryProfileStats[7].Tooltip[2])}</p>
            </div>
            <div className='flex justify-between mt-3'>
              <p className='text-[#7d8395]'>최대 생명력</p>
              <p className="font-semibold text-[#353945] dark:text-inherit">{ArmoryProfileStats !== undefined && Number(ArmoryProfileStats[6].Value).toLocaleString()}</p>
            </div>
          </div>
        </div>
        {/* 전투 특성 */}
        <div className='mt-7'>
          <div className='flex justify-between items-center'>
            <div className='w-20 h-6 bg-[#8045DD26] dark:bg-[#DECFF6] rounded-[13px] flex justify-center items-center'>
              <p className='text-sm font-bold text-[#8045dd]'>전투 특성</p>
            </div>
            <hr className='grow mx-3 border-[#e6e8ec] dark:border-[#7d8395]' />
            <p className='text-sm font-semibold'>합계 {statusSum}</p>
          </div>
          <div className='mt-4 pl-1'>
            <div className='space-y-2.5 text-[0.925rem] items-between'>
              {/* 가장 높은 값: #8045dd, 2번쨰 높은 값: 5865f2 */}
              {/* 치특신 */}
              <div className='flex justify-between'>
                {ArmoryProfileStatsCloenOne.map((status:Stat, index:number) => {
                  const valueStyle = status.Type === statusMaxValue[0] ? 'font-semibold text-[#8045dd] dark:text-[#a36bfc]' : status.Type === statusMaxValue[1] ? 'font-semibold text-[#5865f2] dark:text-[#8991ee]' : 'font-semibold text-[#353945] dark:text-inherit';
                  return (
                    <div className='flex justify-between max-w-[75px] w-full' key={index}>
                      <p className='text-[#7d8395]'>{status.Type}</p>
                      <p className={valueStyle}>{status.Value}</p>
                    </div>
                    )
                })}
              </div>
              {/* 제인숙 */}
              <div className='flex justify-between'>
                {ArmoryProfileStatsCloenTwo.map((status:Stat, index:number) => {
                  const valueStyle = status.Type === statusMaxValue[0] ? 'font-semibold text-[#8045dd] dark:text-[#a36bfc]' : status.Type === statusMaxValue[1] ? 'font-semibold text-[#5865f2] dark:text-[#8991ee]' : 'font-semibold text-[#353945] dark:text-inherit';
                  return (
                    <div className='flex justify-between max-w-[75px] w-full' key={index}>
                      <p className='text-[#7d8395]'>{status.Type}</p>
                      <p className={valueStyle}>{status.Value}</p>
                    </div>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
