import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'

import { ArmoryEquipment, ArmoryGem, ArmorySkill, EngravingEffect, Stat } from '@/types/characters'

import SkillPointCanvas from './SkillPointCanvas'
import Skill from './Skill'

type SkillsTabProps = {
  ArmoryProfileStats?: Stat[]
  ArmoryEngravingEffects?: EngravingEffect[]
  ArmoryEquipment?: ArmoryEquipment[]
  ArmoryProfileSkillPoint: {
    TotalSkillPoint: number
    UsingSkillPoint: number
  }
  ArmorySkills?: ArmorySkill[]
  ArmoryGem?: ArmoryGem
  characterClassName?: string
}

type setNameCountType = {
  [key:string]:number
}

type skillAttributeType = {
  levelFiveTripod: number
  counter: number
  neutralize: number
  partDestruction: number
}

const classEngraving = {
  '스카우터': '진화의 유산',
  '블래스터': '포격 강화',
  '데모닉': '멈출 수 없는 충동',
}

const classEngravingSkill = {
  '스카우터': '싱크 스킬',
  '블래스터': '포격 모드',
  '데모닉': '악마 스킬',
}

export default function SkillsTab({ ArmoryProfileStats, ArmoryEngravingEffects, ArmoryEquipment, ArmoryProfileSkillPoint, ArmorySkills, ArmoryGem, characterClassName }:SkillsTabProps) {
  const [stats, setStats] = useState<Stat[]>([]);
  const [setEffect, setSetEffect] = useState<string[][]>([]);
  const [filterArmorySkills, setFilterArmorySkills] = useState<ArmorySkill[]>([]);
  const [skillAttributeType, setSkillAttributeType] = useState<skillAttributeType>();

  useEffect(() => {
    if(ArmoryProfileStats !== undefined) {
      const updateArmoryProfileStats = ArmoryProfileStats?.filter((el) => el.Type !== '최대 생명력' && el.Type !== '공격력');
      updateArmoryProfileStats?.sort((a, b) => Number(b.Value) - Number(a.Value));
      setStats(updateArmoryProfileStats);
    }

  }, [ArmoryProfileStats]);

  useEffect(() => {
    if(ArmoryEquipment !== undefined) {
      const filterArmoryEquipment = ArmoryEquipment?.filter((el) => el.Type === '무기' || el.Type === '투구' || el.Type === '상의' || el.Type === '하의' || el.Type === '장갑' || el.Type === '어깨');
      
      const setNameList = filterArmoryEquipment?.map((el) => {
        let setName = '';
        if(el.Type === '무기') {
          setName = el?.WeaponAttribute?.setEffectName?.setName || '';
        } else {
          setName = el?.ArmoryAttribute?.setEffectName?.setName || '';
        }
        return setName;
      });

      const setNameCount:setNameCountType = {};
      setNameList?.forEach((list) => {
        setNameCount[list] = (setNameCount[list] || 0) + 1
      })

      const updateSetName: string[][] = [];
      Object.keys(setNameCount)?.forEach((name) => {
        if(name !== '') {
          updateSetName.push([name, setNameCount[name].toString()]);
        }
      })

      setSetEffect(updateSetName);
    }

  }, [ArmoryEquipment]);

  useEffect(() => {
    if(ArmorySkills !== undefined) {
      const filterArmorySkills = ArmorySkills?.filter((skill) => {
        if(characterClassName === '스카우터' || characterClassName === '블래스터' || characterClassName === '데모닉') {
          const engraving = ArmoryEngravingEffects?.filter((effect) => effect?.Name?.includes(classEngraving[characterClassName]));
          if(engraving !== undefined && engraving.length !== 0) {
            if(skill.SkillType === classEngravingSkill[characterClassName] || skill.Level !== 1 || skill.SkillType === '각성기') {
              return skill;
            } else {
              return ;
            }
          } else {
            if(skill.SkillType !== classEngravingSkill[characterClassName] && skill.Level !== 1 || skill.SkillType === '각성기') {
              return skill
            }
            return ;
          }
        } else {
          if(skill.Level !== 1 || skill.SkillType === '각성기') {
            return skill;
          } else {
            return ;
          }
        }
      });


      let levelFiveTripod = 0;
      let counter = 0;
      let neutralize = 0;
      let partDestruction = 0;

      filterArmorySkills?.forEach((skill) => {
        if(skill.SkillAttributes?.['카운터'] !== '') {
          counter++
        }
        if(skill.SkillAttributes?.['무력화'] !== '') {
          neutralize++
        }
        if(skill.SkillAttributes?.['부위 파괴'] !== '') {
          partDestruction++
        }

        skill.Tripods?.forEach((tripod) => {
          if(tripod.Level === 5) {
            levelFiveTripod++
          }
        });
      });

      const updateskillAttributeType = {
        levelFiveTripod: levelFiveTripod,
        counter: counter,
        neutralize: neutralize,
        partDestruction: partDestruction
      }

      setFilterArmorySkills(filterArmorySkills);
      setSkillAttributeType(updateskillAttributeType);
      
    }
  }, [ArmoryEngravingEffects, ArmorySkills, characterClassName]);


  return (
    <>
    <div className='flex gap-x-6'>
      <div className='grow'>
        {/* 특성, 각인, 세트 */}
        <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z'></path>
                <path d='M5 13l6 6'></path>
                <path d='M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365'></path>
                <path d='M10 5.5l-2 -2.5h-5v5l3 2.5'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>{stats?.[0]?.Type !== undefined ? stats?.[0]?.Type : '치명'} {stats?.[0]?.Value !== undefined ? stats?.[0]?.Value : 0} · {stats?.[1]?.Type !== undefined ? stats?.[1]?.Type : '특화'} {stats?.[1]?.Value !== undefined ? stats?.[1]?.Value : 0}</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z'></path>
                <path d='M19 16h-12a2 2 0 0 0 -2 2'></path>
                <path d='M9 8h6'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>{ArmoryEngravingEffects?.map((effect, index:number) => <Fragment key={index}>{effect.Name.slice(0, 1)}</Fragment>)}</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <svg className='w-6 text-[#7d8395]' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0'></path>
              </svg>
              <p className='font-semibold leading-[15px] text-lg'>{setEffect.length <= 1 ? `${setEffect?.[0]?.[1] || ''} ${setEffect?.[0]?.[0] || ''}`
              : setEffect?.map((list, index:number) => <Fragment key={index}>{`${list[1]}${list[0].slice(0, 1)} `}</Fragment>)}</p>
            </div>
          </div>
        </div>
        {/* 스킬 특성 종류 */}
        <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
          <div className='grid grid-cols-4 place-items-center text-lg font-semibold text-[#353945] dark:text-white'>
            <p>5렙 트포</p>
            <p>카운터</p>
            <p>무력화</p>
            <p>부위 파괴</p>
          </div>
          <div className='grid grid-cols-4 h-full place-items-center text-lg font-semibold text-[#8045dd] dark:text-[#a36bfc]'>
            <p>{skillAttributeType?.levelFiveTripod}개</p>
            <p>{skillAttributeType?.counter}개</p>
            <p>{skillAttributeType?.neutralize}개</p>
            <p>{skillAttributeType?.partDestruction}개</p>
          </div>
        </div>
      </div>
      {/* 스킬 포인트 */}
      <div className='px-[17px] py-4 w-[146px] bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] flex flex-col justify-between'>
        <p className='text-lg font-semibold text-center'>스킬 포인트</p>
        <div className='w-28 h-28 relative'>
          <SkillPointCanvas usePoint={ArmoryProfileSkillPoint.UsingSkillPoint} maxPoint={ArmoryProfileSkillPoint.TotalSkillPoint} />
          <div className='absolute left-0 right-0 top-2 bottom-0 w-fit h-fit m-auto text-center'>
            <p className='text-2xl leading-6 font-bold'>{ArmoryProfileSkillPoint.UsingSkillPoint}</p>
            <p className='mt-1 ml-2 text-lg leading-5 font-semibold text-[#7d8395]'>/ {ArmoryProfileSkillPoint.TotalSkillPoint}</p>
          </div>
        </div>
      </div>
    </div>

    {/* SKill */}
    <div className='px-[17px] py-4 w-full bg-white dark:bg-[#33353a] dark:border-[#4d4f55] rounded-xl border box-border shadow-[1px_1px_10px_0_rgba(72,75,108,.08)] mt-6'>
      {filterArmorySkills?.map((skill, index:number) => {
        return <Skill key={`${skill.Name}_${index}`} skill={skill} Gem={ArmoryGem?.Gems} />
      })}
    </div>
    </>
  )
}
