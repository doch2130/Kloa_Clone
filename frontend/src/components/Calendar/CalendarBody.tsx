'use client'
import React from 'react'
import { changeDays, isSameDate, isSameMonth } from '../Home/ScheduleSection/scheduleUtils'

type CalendarBodyProps = {
  currentDate: Date
  onChangeDateHandler: Function
}

const getStartOfWeekInMonth =(date:Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const diff = firstDayOfMonth.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 0);
  return new Date(firstDayOfMonth.setDate(diff));
}

const getLastDayOfMonth = (date:Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  // 마지막 날짜를 구하기 위해 다음 달의 0일을 설정합니다.
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth;
}

export default function CalendarBody({ currentDate, onChangeDateHandler }:CalendarBodyProps) {
  const startOfWeekInMonth = getStartOfWeekInMonth(currentDate);
  // console.log("현재 달의 첫 번째 주 시작 날짜:", startOfWeekInMonth);
  const lastDay = getLastDayOfMonth(currentDate);
  // console.log("현재 달의 마지막 날짜:", lastDay);

  const days = [];
  let day = startOfWeekInMonth;

  do {
    for(let i = 0; i < 7; i++) {
      // day 변수를 복제하지 않고 사용했더니, 이벤트의 모든 데이터에 마지막으로 변경된 day 값이 들어가는 현상 확인
      // cloneDay를 생성하여 매번 day를 이용한 Date 객체를 새로 생성 후 사용하여 변수 값 적용 완료
      const cloneDay = new Date(day);
      // 스타일 기본 값
      let btnStyle = 'w-[48px] h-[48px] rounded-full flex items-center justify-center ';
      if(isSameMonth(currentDate, cloneDay)) {
        if(isSameDate(currentDate, cloneDay)) {
          {/* 현재 달, 오늘 날짜 */}
          btnStyle += `bg-gradient-to-b from-[#5865f2] to-[#8045dd] text-white`;
        } else if(cloneDay.getDay() === 0) {
          // 현재 달, 일요일, 빨강
          btnStyle += `text-[#f95126]`
        }
      } else {
        if(cloneDay.getDay() === 0) {
          // 이전 달, 다음 달 일요일, 연한 빨강
          btnStyle += `text-[#ff997e]`
        } else {
          {/* 이전 달 날짜, 다음 달 날짜 */}
          btnStyle += `text-[#a5acb8] dark:text-[#646870]`;
        }
      }

      days.push(
        <button type='button' key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`} className={btnStyle} onClick={() => onChangeDateHandler(cloneDay)}>
          <p className='font-semibold text-[18px] leading-[18px]'>{cloneDay.getDate()}</p>
        </button>
      );
      day = changeDays(day, 1);
    }
  } while(day <= lastDay)

  return <>{days}</>;
}