export const changeYear = (date:Date, year:number):Date => {
  const clone = new Date(date);
  clone.setFullYear(date.getFullYear() + year)
  return clone;
}

export const changeMonth = (date:Date, month:number, setCurrentDate:Function):void => {
  const clone = new Date(date);
  clone.setMonth(date.getMonth() + month)
  setCurrentDate(clone);
  return ;
}

export const changeDays = (date:Date, days:number):Date => {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days)
  return clone;
}

export const changeDate = (date:Date, setCurrentDate:Function):void => {
  setCurrentDate(date);
  return ;
}

export const isSameMonth = (date1:Date, date2:Date):Boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

export const isSameDate = (date1:Date, date2:Date):Boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

