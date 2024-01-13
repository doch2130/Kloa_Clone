'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { queryFilterType } from '@/types/rank'

import { IconDownArrow } from '/public/svgs'

import styled from '@/styles/ListBoxSelect.module.css'

type ListBoxSelectProps = {
  buttonClass: string
  listData: string[]
  type: string
  initData: string
  setQueryFilter: Function
};

export default function ListBoxSelect({ buttonClass, listData, type, initData, setQueryFilter}:ListBoxSelectProps) {
  const onChangeHandler = (value:string) => {
    // console.log('e ', value);
    setQueryFilter((prev:queryFilterType) => {
      if(type === 'server') {
        return (
          {
            ...prev,
            server: value
          }
        )
      } else if(type === 'job') {
        return (
          {
            ...prev,
            job: value,
            engraving: '전체'
          }
        )
      } else if(type === 'engraving') {
        return (
          {
            ...prev,
            engraving: value
          }
        )
      } else {
        return prev;
      }
    });
  }

  return (
    <Listbox value={initData} onChange={(e) => onChangeHandler(e)}>
      <Listbox.Button className={`${buttonClass}`}>
        <p className='ml-4 text-sm font-semibold'>{initData === '전체' ? '직업 각인' : initData === '전체 클래스' ? '클래스' : initData}</p>
        <Image src={IconDownArrow} alt='down arrow' className='mr-[10px]' />
      </Listbox.Button>
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Listbox.Options className='absolute left-0 right-0 top-full mt-1.5 max-h-[200px] rounded-[10px] border border-basicGrey dark:border-[#4d4f55] shadow-lg overflow-y-auto z-10 bg-white dark:bg-[#33353a] leading-5 text-sm'>
          <div className='p-1'>
            {listData.map((list, listIndex) => (
              <Listbox.Option
                key={listIndex}
                value={list}
                className={({ active }) =>
                  `text-head dark:text-[#eaf0ec] rounded-md px-[7px] py-[7px] cursor-pointer ${ active && `${styled.listActiveText} ${styled.listActiveBackground}` }`
                }
              >
                {({ selected }) => (
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>
                    {list}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </div>
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}
