import React from 'react'
import styled from './Calendar.module.css'

export default function Calendar() {
  const temp = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  return (
    <div className={styled.calendarWrap}>
      <div className={styled.calendarRow}>
        {temp.map((el:number) => {
          return (
            <div className={styled.calendarDateWrap} key={el}>
              <p className={styled.calendarDay}>토</p>
              <p className={styled.calendarDate}>21</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
