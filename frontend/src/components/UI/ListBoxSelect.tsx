'use client'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import downArrow from '@/assets/Icon/downArrow.svg'

import styled from './ListBoxSelect.module.css'

type ListBoxSelectType = {
  buttonClass: string
  listData: string[];
};

export default function ListBoxSelectCopy(props:ListBoxSelectType) {
  const { listData } = props;
  const [selected, setSelected] = useState(listData[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button className={`${props.buttonClass}`}>
        <p className='ml-4 text-sm font-semibold'>{selected === '전체' ? '직업 각인' : selected === '전체 클래스' ? '클래스' : selected}</p>
        <Image src={downArrow} alt='down arrow' className='mr-[10px]' />
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
