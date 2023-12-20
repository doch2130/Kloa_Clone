'use client'
import { Fragment, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'

type PopoverEquipType = {
  label?: string;
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

export default function PopOverEquip(props:PopoverEquipType) {
  const { label, title, content, children } = props;


  // {
  //   reinforcementLevel: '+23',
  //   name: '차오른 몽환의 환각 모자',
  //   itemLevel: '1620',
  //   tear: '티어 3',
  //   rating: '고대',
  //   equipmentType: '모자',
  //   quality: '95',
  //   setEffect: '환각 Lv3',
  //   basicEffect: '물리 방어력 +5435\r\n마법 방어력+6039\r\n민첩 +35394\r\n체력 +5081',
  //   additionalEffects: '생명 활성력 +1264',
  //   imageSrc: 'https://pica.korlark.com/efui_iconatlas/sc_item/sc_item_162.png',
  // },

  // popover 기본 설정
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeOutRef = useRef<NodeJS.Timeout>();
  const timeoutDuration = 150;

  const onMouseEnterHandler = (isOpen:boolean) => {
    clearTimeout(timeOutRef.current);
    !isOpen && triggerRef.current?.click();
  }

  const onMouseLeaveHandler = (isOpen:boolean) => {
    timeOutRef.current = setTimeout(() => {
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  }

  return (
    <Popover className={"relative"}>
      {({ open }) => (
          <div  onMouseEnter={() => onMouseEnterHandler(open)} onMouseLeave={() => onMouseLeaveHandler(open)}>
            <Popover.Button ref={triggerRef}>
              {/* {'label text'} */}
              {children}
            </Popover.Button>
            <Transition as={Fragment} enter="transition ease-out duration-150" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-50 mt-3 -translate-x-1/2 transform px-4">
                  {'content content'}
              </Popover.Panel>
            </Transition>
          </div>
        )
      }
    </Popover>
  )
}
