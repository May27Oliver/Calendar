import { DATE_TYPE, CurrentDecadYear } from '../components/Calendar/type';

/*leap year or not*/
export const isLeapYear = (year: number): boolean => {
  return (year % 100 !== 0 && year % 4 == 0) || year % 400 == 0;
};

/*取得該月有幾天*/
export const getMonthDays = (month: number, year: number): number => {
  let isLeap = isLeapYear(year);
  switch (month) {
    case 2:
      if (isLeap) {
        return 29;
      } else {
        return 28;
      }
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
};

export const generateCurrentMonthArray = (days: number): DATE_TYPE[] => {
  let dateArr: DATE_TYPE[] = [];
  for (let i = 1; i <= days; i++) {
    dateArr = [...dateArr, { value: i, isCurrentMonth: true }];
  }
  return dateArr;
};

/*該月第一天是禮拜幾？*/
export const getFirstDayAtWeek = (month: number, year: number): number => {
  return new Date(`${year},${month},1`).getDay();
};

/*投入該月有幾天的陣列後，前後補滿42日，取得完整的月份*/
export const generateWholeMonthArray = (currentMonth: DATE_TYPE[], month: number, year: number): DATE_TYPE[] => {
  let wholeMonth = [...currentMonth];
  let firstDay = getFirstDayAtWeek(month, year);
  let prevMonthDays: number;
  if (month === 1) {
    prevMonthDays = getMonthDays(12, year - 1);
  } else {
    prevMonthDays = getMonthDays(month - 1, year);
  }
  // 向前補
  // 取得上月最後一日幾號
  let j = 0;
  for (let i = firstDay - 1; i >= 0; i--) {
    wholeMonth = [{ value: prevMonthDays - j, isCurrentMonth: false }, ...wholeMonth];
    ++j;
  }
  let totalDays = wholeMonth.length;
  //向後補
  j = 1;
  for (let i = totalDays + 1; i <= 42; i++) {
    wholeMonth = [...wholeMonth, { value: j, isCurrentMonth: false }];
    ++j;
  }

  return wholeMonth;
};

export const generateWholeDecadList = (year: number): CurrentDecadYear[] => {
  let beginYear = Math.floor(year / 10) * 10;
  let yearList: CurrentDecadYear[] = [];
  for (let i = -1; i < 11; i++) {
    if (i === -1) {
      yearList = [...yearList, { value: beginYear + i, isCurrentDecadYear: false }];
    } else if (i === 11) {
      yearList = [...yearList, { value: beginYear + i, isCurrentDecadYear: false }];
    } else {
      yearList = [...yearList, { value: beginYear + i, isCurrentDecadYear: true }];
    }
  }
  return yearList;
};
