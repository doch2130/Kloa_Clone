'use client'
import React from 'react'
import { changeDate, isSameDate } from './scheduleUtils'

import styled from './ScheduleCalendar.module.css'

type ScheduleCalendarProps = {
  today: Date;
  currentDate: Date;
  setCurrentDate: Function;
};

const dateCalArray = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const dayParsing = ['일', '월', '화', '수', '목', '금', '토'];

export default function ScheduleCalendar({ today, currentDate, setCurrentDate }:ScheduleCalendarProps) {

  return (
    <div className={styled.calendarWrap}>
      <div className={styled.calendarRow}>
        {dateCalArray.map((el:number) => {
          const clone = new Date(currentDate);
          clone.setDate(currentDate.getDate() + el);

          const todayStyled = isSameDate(today, clone);
          const activeStyled = isSameDate(currentDate, clone);

          const minDate = new Date(today);
          minDate.setDate(today.getDate()-8);
          const maxDate = new Date(today);
          maxDate.setDate(today.getDate()+7);
      
          if(minDate >= currentDate) {
            // 선택 날짜가 현재 날짜 -8 이하인 경우
            if(el === 7) {
              return (
                <div className={`${styled.calendarDateWrap} ${styled.calendarToday}`}
                  key={el} onClick={() => changeDate(today, setCurrentDate)}>
                  <p className={`${styled.calendarDay} text-[#7d8395] dark:text-[#eaf0ec]`}>{dayParsing[today.getDay()]}</p>
                  <p className={`${styled.calendarDate} text-[#7d8395] dark:text-[#eaf0ec]`}>{today.getDate()}</p>
                </div>
              )
            } else {
              return (
                <div className={`${todayStyled ? `${styled.calendarDateWrap} ${styled.calendarToday}` : 
                  activeStyled ? `${styled.calendarActiveDate} ${styled.calendarDateWrap}` : `${styled.calendarDateWrap} hover:bg-[#f5f6f7] dark:hover:bg-[#40434a]`}`}
                  key={el} onClick={() => changeDate(clone, setCurrentDate)}>
                  <p className={`${styled.calendarDay} text-[#7d8395] dark:text-[#eaf0ec]`}>{dayParsing[clone.getDay()]}</p>
                  <p className={`${styled.calendarDate} text-[#7d8395] dark:text-[#eaf0ec] ${clone.getDay() === 0 && styled.calendarSunday}`}>{clone.getDate()}</p>
                </div>
              )
            }
          } else if(maxDate <= currentDate) {
            // 선택 날짜가 현재 날짜 +8 이상인 경우
            if(el === -7) {
              return (
                <div className={`${styled.calendarDateWrap} ${styled.calendarToday}`}
                key={el} onClick={() => changeDate(today, setCurrentDate)}>
                  <p className={`${styled.calendarDay} text-[#7d8395] dark:text-[#eaf0ec]`}>{dayParsing[today.getDay()]}</p>
                  <p className={`${styled.calendarDate} text-[#7d8395] dark:text-[#eaf0ec]`}>{today.getDate()}</p>
                </div>
              )
            } else {
              return (
                <div className={`${todayStyled ? `${styled.calendarDateWrap} ${styled.calendarToday}` : 
                activeStyled ? `${styled.calendarActiveDate} ${styled.calendarDateWrap}` : `${styled.calendarDateWrap} hover:bg-[#f5f6f7] dark:hover:bg-[#40434a]`}`}
                key={el} onClick={() => changeDate(clone, setCurrentDate)}>
                  <p className={`${styled.calendarDay} text-[#7d8395] dark:text-[#eaf0ec]`}>{dayParsing[clone.getDay()]}</p>
                  <p className={`${styled.calendarDate} text-[#7d8395] dark:text-[#eaf0ec] ${clone.getDay() === 0 && styled.calendarSunday}`}>{clone.getDate()}</p>
                </div>
              )
            }
          } else {
            // 현재 날짜가 -7~+7범위에 있는 경우
            return (
              <div className={`${todayStyled ? `${styled.calendarDateWrap} ${styled.calendarToday}` : 
              activeStyled ? `${styled.calendarActiveDate} ${styled.calendarDateWrap}` : `${styled.calendarDateWrap} hover:bg-[#f5f6f7] dark:hover:bg-[#40434a]`}`}
              key={el} onClick={() => changeDate(clone, setCurrentDate)}>
                <p className={`${styled.calendarDay} text-[#7d8395] dark:text-[#eaf0ec]`}>{dayParsing[clone.getDay()]}</p>
                <p className={`${styled.calendarDate} text-[#7d8395] dark:text-[#eaf0ec] ${clone.getDay() === 0 && styled.calendarSunday}`}>{clone.getDate()}</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
