'use client'
import React, { useEffect, useRef, useState } from 'react'

import { serverList } from '@/data/ServerListData'
import { characterJobList, characterJobSkillList } from '@/data/CharacterJobData'

import ListBoxSelect from '@/components/UI/ListBoxSelect'

import styled from './CharacterNavigator.module.css'

const buttonClass = 'w-full h-full border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] flex justify-between items-center text-placeholder';

export default function MouseTest() {
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const [leftButtonX, setLeftButtonX] = useState(-12);

  // console.log('mouseDownClientX ', mouseDownClientX);
  // console.log('mouseDownClientY ', mouseDownClientY);
  // console.log('mouseUpClientX ', mouseUpClientX);
  // console.log('mouseUpClientY ', mouseUpClientY);
  
  //   transform: translate(-12px, -8px);
  // 버튼의 위치는 translate X 값으로 결정 됨
  
  // const tempStyle = .levelBar {
  //   background: linear-gradient(
  //     to right, 
  //     왼쪽 스크롤 이동하면 오른쪽 범위가 바뀜
  //     범위에 포함하지 않는 색을 표현하는 구간
  //     rgb(230, 232, 236) 0%, rgb(230, 232, 236) 0%,
  //     왼쪽 스크롤 이동하면 왼쪽 범위가 바뀜, 오른쪽 스크롤 이동하면 오른쪽 범위가 바뀜
  //     범위에 따른 색을 표현하는 구간
  //     rgb(118, 77, 226) 0%, rgb(118, 77, 226) 100%,
  //     범위에 포함하지 않는 색을 표현하는 구간
  //     오른쪽 스크롤 이동하면 오른쪽 범위가 바뀜
  //     rgb(230, 232, 236) 100%, rgb(230, 232, 236) 100%
  //     );
  // }

  const leftButton = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  // console.log('temp1.current.offsetTop ', temp1 !== null && temp1.current?.offsetTop);
  // console.log('temp1.current.offsetLeft ', temp1 !== null && temp1.current?.offsetLeft);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('cli');
    setIsMoved(true);
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMoved(false);
    // setMouseUpClientX(e.clientX);
    // setMouseUpClientY(e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('ck');
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };

  // const onMouseOut = () => {
  //   setIsMoved(false);
  // }

  

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    // if (mouseDownClientX !== 0 && dragSpaceX > 0 && vector > 2) {
    if (mouseDownClientX !== 0 && dragSpaceX > 0) {
      console.log('mouseDownClientX - mouseUpClientX ', mouseDownClientX - mouseUpClientX);
      if (mouseUpClientX < mouseDownClientX) {
        console.log('left Move');
        // setLeftButtonX((prev) => {
        //   const dragSpaceResultX = mouseDownClientX - mouseUpClientX;
        //   console.log('left dragSpaceResultX ', dragSpaceResultX);
        //   const result = dragSpaceResultX < -12 ? -12 : dragSpaceResultX;
        //   return result;
        // })
      } else if (mouseUpClientX > mouseDownClientX) {
        console.log('right Move');
        setLeftButtonX((prev) => {
          const dragSpaceResultX = mouseDownClientX - mouseUpClientX;
          const result = dragSpaceResultX < -238 ? -238 : -dragSpaceResultX;
          return result;
        });
      }
    }
  }, [mouseUpClientX]);

  // console.log('leftbuttonX ', leftButtonX);

  useEffect(() => {
    if(leftButton.current === null) {
      return;
    }

    if(isMoved) {
      const translateX = leftButtonX;
      leftButton.current.style.transform = `translate(${translateX}px, -8px)`;
      leftButton.current.style.cursor = 'grabbing';
    } else {
      leftButton.current.style.cursor = 'grab';
    }
    
  }, [isMoved, leftButtonX]);

  return (
    <div className='w-full h-[54px] bg-white dark:bg-[#33353a] dark:border-0 border-2 border-lightGrey rounded-[10px] flex justify-between items-center px-[10px] mt-[28px]'>
      <div className='flex items-center space-x-5'>
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={serverList} />
        </div>
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={characterJobList} />
        </div>
        {/* 데이터에 따른 밑에 UI 출력 */}
        {characterJobSkillList[characterJobList[0]].length > 0 &&
        <div className='relative w-[150px] h-[38px]'>
          <ListBoxSelect buttonClass={buttonClass} listData={characterJobSkillList[characterJobList[0]]} />
        </div>
        }
      </div>
      <div className='flex items-center space-x-5'>
        <input type='number' defaultValue={0} 
        className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]' />
        
        <div className='w-[250px]'>
          <div className={`flex items-center justify-center ${styled.levelWrap}`}>
            <div className={`h-[8px] w-full rounded ${styled.levelBar}`}>
              <div ref={leftButton} className={`flex items-center justify-center w-6 h-6 bg-white rounded-full ${styled.levelLeftButton}`}
              onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
                <div className='w-4 h-4 rounded-full'></div>
              </div>
              {/* <div className={`flex items-center justify-center w-6 h-6 bg-white rounded-full ${styled.levelRightButton}`} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
                <div className='w-4 h-4 rounded-full'></div>
              </div> */}
            </div>
          </div>
        </div>

        <input type='number' defaultValue={1655}
        className='w-[68px] h-[38px] flex justify-center items-center border-2 border-basicGrey dark:border-[#4d4f55] rounded-[10px] font-base text-placeholder dark:text-[#eaf0ec] text-center outline-none bg-white dark:bg-[#33353a]' />
      </div>
    </div>
  )
}
