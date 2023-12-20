'use client'
import { Fragment, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'

export default function PopoverDefault() {
  // HeadlessUI PopOver Hover 방식
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
            <Popover.Button ref={triggerRef} >
              {'label text'}
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
