import React from 'react';
import './index.css';
interface DatePickerProps {
  year: number;
  month: number;
  date: number;
  setYearFromDatePicker(year: number): void;
  setMonthFromDatePicker(month: number): void;
  setDateFromDatePicker(date: number): void;
}
const DatePicker: React.FC<DatePickerProps> = ({
  year,
  month,
  date,
  setYearFromDatePicker,
  setMonthFromDatePicker,
  setDateFromDatePicker,
}) => {
  const generateDateString = (year: number, month: number, date: number): string => {
    let monthVal: string;
    let dateVal: string;
    if (month === 9) {
      monthVal = '10';
    } else if (month + 1 < 10 && month !== 9) {
      monthVal = `0${month + 1}`;
    } else {
      monthVal = (month + 1).toString();
    }
    if (date < 10) {
      dateVal = `0${date}`;
    } else {
      dateVal = date.toString();
    }
    return `${year}-${monthVal}-${dateVal}`;
  };
  const [dateVal, setDateVal] = React.useState<string>(generateDateString(year, month, date));

  React.useEffect(() => {
    setDateVal(generateDateString(year, month, date));
  }, [year, month, date]);

  return (
    <div className="date-pick-wrap">
      <input
        className="date-picker"
        type="date"
        value={dateVal}
        onChange={(event) => {
          const timeArr = event.target.value.split('-');
          setYearFromDatePicker(+timeArr[0]);
          setMonthFromDatePicker(+timeArr[1] - 1);
          setDateFromDatePicker(+timeArr[2]);
        }}
      />
      ;
    </div>
  );
};

export default React.memo(DatePicker);
