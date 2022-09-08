import React from 'react';
import { DATE_TYPE, TimeLevel } from '../type';
import { WEEK, MONTH } from '../index';
import './index.css';
import { generateWholeDecadList } from '../../../utils/calculate';
interface CaledarBodyProps {
  level: TimeLevel;
  days: DATE_TYPE[];
  selectedDay: number;
  year: number;
  month: number;
  setSelectDay(day: number): void;
  setSelectMonth(month: number): void;
  setSelectYear(year: number): void;
  presentDay: {
    date: number;
    month: number;
    year: number;
  };
}

const CalendarBody: React.FC<CaledarBodyProps> = ({
  level,
  days,
  selectedDay,
  year,
  month,
  setSelectDay,
  setSelectMonth,
  setSelectYear,
  presentDay,
}) => {
  switch (level) {
    case 'year': {
      return <ShowMonth setSelectMonth={setSelectMonth} />;
    }
    case 'decad': {
      return <ShowYear setSelectYear={setSelectYear} year={year} />;
    }
    default: {
      return (
        <ShowDate
          days={days}
          setSelectDay={setSelectDay}
          year={year}
          month={month}
          selectedDay={selectedDay}
          presentDay={presentDay}
        />
      );
    }
  }
};

interface ShowDateProps {
  days: DATE_TYPE[];
  setSelectDay(day: number): void;
  selectedDay: number;
  year: number;
  month: number;
  presentDay: {
    date: number;
    month: number;
    year: number;
  };
}

const ShowDate: React.FC<ShowDateProps> = ({ days, setSelectDay, selectedDay, year, month, presentDay }) => {
  return (
    <div className="date-wrap">
      <div className="week-row">
        {WEEK.map((w) => (
          <div key={w} className="week-col">
            {w}
          </div>
        ))}
      </div>
      <div className="days-wrap">
        {days.map((day) => (
          <div
            key={`${day.isCurrentMonth ? 1 : 0}-${day.value}`}
            className={`day-col ${day.isCurrentMonth ? 'current-day' : 'not-current-day'} ${
              selectedDay === day.value && day.isCurrentMonth ? 'selected-day' : ''
            }
          ${
            year === presentDay.year &&
            month === presentDay.month &&
            day.value === presentDay.date &&
            day.isCurrentMonth &&
            presentDay.date !== selectedDay
              ? 'present-day'
              : ''
          }`}
            onClick={() => day.isCurrentMonth && setSelectDay(day.value)}
          >
            {day.value}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ShowMonthProps {
  setSelectMonth(month: number): void;
}

const ShowMonth: React.FC<ShowMonthProps> = ({ setSelectMonth }) => {
  return (
    <div className="month-wrap">
      {MONTH.map((m, index) => (
        <div
          key={m}
          className="month-col"
          onClick={() => {
            setSelectMonth(index);
          }}
        >
          {m}
        </div>
      ))}
    </div>
  );
};

interface ShowYearProps {
  setSelectYear(year: number): void;
  year: number;
}
interface CurrentDecadYear {
  value: number;
  isCurrentDecadYear: boolean;
}

const ShowYear: React.FC<ShowYearProps> = ({ setSelectYear, year }) => {
  const [decadList, setDecadList] = React.useState<CurrentDecadYear[]>([]);
  React.useLayoutEffect(() => {
    setDecadList(generateWholeDecadList(year));
  }, [year]);
  return (
    <div className="year-wrap">
      {decadList.map((d) => (
        <div
          key={d.value}
          className={`year-col ${d.isCurrentDecadYear ? 'current-year' : 'not-current-decad'}`}
          onClick={() => d.isCurrentDecadYear && setSelectYear(d.value)}
        >
          {d.value}
        </div>
      ))}
    </div>
  );
};

export default React.memo(CalendarBody);
