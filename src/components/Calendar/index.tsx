import React from 'react';
import './index.css';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import { TimeLevel, WEEK_TYPE, MONTH_TYPE, DATE_TYPE } from './type';
import { generateCurrentMonthArray, getMonthDays, generateWholeMonthArray } from '../../utils/calculate';
/*
1.show present month at the begining
=> what date is today?
=> what month is present month?
=> what the first day of the week is in this month?（ 這個月的第一天星期幾 ）
*/

export const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Calendar: React.FC = () => {
  const dateTime = new Date();
  const [selectedLevel, setSelectedLevel] = React.useState<TimeLevel>('month');
  const [days, setDays] = React.useState<DATE_TYPE[]>([]);
  const [theDate, setTheDate] = React.useState<number>(dateTime.getDate());
  const [theMonth, setTheMonth] = React.useState<number>(dateTime.getMonth());
  const [theYear, setTheYear] = React.useState<number>(dateTime.getFullYear());

  const setHigherLevel = React.useCallback(() => {
    switch (selectedLevel) {
      case 'month':
        setSelectedLevel('year');
        break;
      case 'year':
        setSelectedLevel('decad');
        break;
      case 'decad':
        break;
    }
  }, [selectedLevel]);

  //month
  const setNextMonth = React.useCallback((): void => {
    if (theMonth === 11) {
      setTheMonth(0);
      setTheYear((prev) => prev + 1);
    } else {
      setTheMonth((prev) => prev + 1);
    }
  }, [theMonth]);

  const setPrevMonth = React.useCallback((): void => {
    if (theMonth === 0) {
      setTheMonth(11);
      setTheYear((prev) => prev - 1);
    } else {
      setTheMonth((prev) => prev - 1);
    }
  }, [theMonth]);

  //year
  const setPrevYear = React.useCallback(() => {
    setTheYear((prev) => prev - 1);
  }, [theYear]);
  const setNextYear = React.useCallback(() => {
    setTheYear((prev) => prev + 1);
  }, [theYear]);

  //decad
  const setPrevDecad = React.useCallback(() => {
    setTheYear((prev) => prev - 10);
  }, [theYear]);
  const setNextDecad = React.useCallback(() => {
    setTheYear((prev) => prev + 10);
  }, [theYear]);

  const setPrev = React.useCallback(() => {
    switch (selectedLevel) {
      case 'month':
        setPrevMonth();
        break;
      case 'year':
        setPrevYear();
        break;
      case 'decad':
        setPrevDecad();
        break;
    }
  }, [theMonth, theYear]);

  const setNext = React.useCallback(() => {
    switch (selectedLevel) {
      case 'month':
        setNextMonth();
        break;
      case 'year':
        setNextYear();
        break;
      case 'decad':
        setNextDecad();
        break;
    }
  }, [theMonth, theYear]);

  React.useEffect(() => {
    let days = getMonthDays(theMonth + 1, theYear);
    let currentMonthArray = generateCurrentMonthArray(days);
    let wholeMonthArray = generateWholeMonthArray(currentMonthArray, theMonth + 1, theYear);
    setDays(wholeMonthArray);
  }, [theYear, theMonth]);
  return (
    <div className="calendar-wrap">
      <CalendarHeader
        level={selectedLevel}
        month={MONTH[theMonth]}
        year={theYear}
        setPrev={setPrev}
        setNext={setNext}
        setHigherLevel={setHigherLevel}
      />
      <CalendarBody
        level={selectedLevel}
        days={days}
        year={theYear}
        setSelectDay={(day: number) => {
          setTheDate(day);
        }}
        setSelectMonth={(month: number) => {
          setTheMonth(month);
          setSelectedLevel('month');
        }}
        setSelectYear={(year: number) => {
          setTheYear(year);
          setSelectedLevel('year');
        }}
      />
    </div>
  );
};

export default Calendar;
