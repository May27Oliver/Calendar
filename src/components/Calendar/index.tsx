import React from 'react';
import './index.css';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import DatePicker from './DatePicker';
import { TimeLevel, DATE_TYPE } from './type';
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
  const presentDay = { date: dateTime.getDate(), month: dateTime.getMonth(), year: dateTime.getFullYear() };

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
    setTheDate(1);
  }, [selectedLevel]);

  //month
  const setNextMonth = React.useCallback((): void => {
    if (theMonth === 11) {
      setTheMonth(0);
      setTheYear((prev) => prev + 1);
    } else {
      setTheMonth((prev) => prev + 1);
    }
    setTheDate(1);
  }, [theMonth]);

  const setPrevMonth = React.useCallback((): void => {
    if (theMonth === 0) {
      setTheMonth(11);
      setTheYear((prev) => prev - 1);
    } else {
      setTheMonth((prev) => prev - 1);
    }
    setTheDate(1);
  }, [theMonth]);

  //year
  const setPrevYear = React.useCallback(() => {
    setTheYear((prev) => prev - 1);
  }, []);
  const setNextYear = React.useCallback(() => {
    setTheYear((prev) => prev + 1);
  }, []);

  //decad
  const setPrevDecad = React.useCallback(() => {
    setTheYear((prev) => prev - 10);
  }, []);
  const setNextDecad = React.useCallback(() => {
    setTheYear((prev) => prev + 10);
  }, []);

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
  }, [selectedLevel, setPrevMonth, setPrevYear, setPrevDecad]);

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
  }, [selectedLevel, setNextDecad, setNextMonth, setNextYear]);

  React.useEffect(() => {
    let days = getMonthDays(theMonth + 1, theYear);
    let currentMonthArray = generateCurrentMonthArray(days);
    let wholeMonthArray = generateWholeMonthArray(currentMonthArray, theMonth, theYear);
    setDays(wholeMonthArray);
  }, [theYear, theMonth]);

  return (
    <>
      <DatePicker
        year={theYear}
        month={theMonth}
        date={theDate}
        setYearFromDatePicker={(year: number) => setTheYear(year)}
        setMonthFromDatePicker={(month: number) => setTheMonth(month)}
        setDateFromDatePicker={(date: number) => setTheDate(date)}
      />
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
          month={theMonth}
          presentDay={presentDay}
          selectedDay={theDate}
          setSelectDay={React.useCallback(
            (day: number) => {
              setTheDate(day);
            },
            [setTheDate]
          )}
          setSelectMonth={React.useCallback(
            (month: number) => {
              setTheMonth(month);
              setSelectedLevel('month');
            },
            [setTheMonth, setSelectedLevel]
          )}
          setSelectYear={React.useCallback(
            (year: number) => {
              setTheYear(year);
              setSelectedLevel('year');
            },
            [setTheYear, setSelectedLevel]
          )}
        />
      </div>
    </>
  );
};

export default Calendar;
