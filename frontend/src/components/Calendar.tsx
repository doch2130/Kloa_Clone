'use client'
import React, { useState } from 'react'
import styled from './Calendar.module.css'

export default function Calendar() {
  const dateCalArray = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
  const today = new Date();
  const [currentDate, setCrrentDate] = useState(new Date());
  const dayParsing = ['일', '월', '화', '수', '목', '금', '토'];

  function changeYear(date:Date, year:number):Date {
    const clone = new Date(date);
    clone.setFullYear(date.getFullYear() + year)
    return clone;
  }

  function changeMonth(date:Date, month:number):Date {
    const clone = new Date(date);
    clone.setMonth(date.getMonth() + month)
    return clone;
  }

  function changeDays(date:Date, days:number):Date {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days)
    return clone;
  }

  const changeDate = (date:Date):void => {
    setCrrentDate(date);
    return ;
  }

  const isSameDate = (date1:Date, date2:Date):Boolean => {
    return date1.getFullYear() === date2.getFullYear()
     && date1.getMonth() === date2.getMonth()
     && date1.getDate() === date2.getDate();
  }


  function dateRange(tDate:Date, curDate:Date) {
    // tDate = today
    // curDate = currentDate
    const minDate = new Date(tDate);
    minDate.setDate(tDate.getDate()-8);
    const maxDate = new Date(tDate);
    maxDate.setDate(tDate.getDate()+7);

    if(minDate >= curDate) {
      console.log('작은 값');
    } else if(maxDate <= curDate) {
      console.log('큰 값');
    } else {
      console.log('같음');
    }
  }

  dateRange(today, currentDate);



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
            // console.log('작은 값');
            return (
              <></>
            )
          } else if(maxDate <= currentDate) {
            // console.log('큰 값');
            if(el === -7) {
              return (
                <></>
              )
            } else {
              return (
                <></>
              )
            }
          } else {
            // console.log('같음');
            return (
              <div className={`${todayStyled ? `${styled.calendarDateWrap} ${styled.calendarToday}` : 
              activeStyled ? `${styled.calendarActiveDate} ${styled.calendarDateWrap}` : `${styled.calendarDateWrap}`}`}
              key={el} onClick={() => changeDate(clone)}>
                <p className={styled.calendarDay}>{dayParsing[clone.getDay()]}</p>
                <p className={`${styled.calendarDate} ${clone.getDay() === 0 && styled.calendarSunday}`}>{clone.getDate()}</p>
              </div>
            )
          }

          
          // return (
          //   <div className={`${todayStyled ? `${styled.calendarDateWrap} ${styled.calendarToday}` : 
          //   activeStyled ? `${styled.calendarActiveDate} ${styled.calendarDateWrap}` : `${styled.calendarDateWrap}`}`}
          //   key={el} onClick={() => changeDate(clone)}>
          //     <p className={styled.calendarDay}>{dayParsing[clone.getDay()]}</p>
          //     <p className={`${styled.calendarDate} ${clone.getDay() === 0 && styled.calendarSunday}`}>{clone.getDate()}</p>
          //   </div>
          // )
        })}
      </div>
    </div>
  )
}
