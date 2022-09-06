import React, { useEffect } from 'react';
import { DATE_TYPE, TimeLevel } from '../type';
import { WEEK, MONTH } from '../index';
import './index.css';
import { generateWholeDecadList } from '../../../utils/calculate';
interface CaledarBodyProps {
  level: TimeLevel;
  days: DATE_TYPE[];
  year: number;
  setSelectDay(day: number): void;
  setSelectMonth(month: number): void;
  setSelectYear(year: number): void;
}

const CalendarBody: React.FC<CaledarBodyProps> = ({
  level,
  days,
  year,
  setSelectDay,
  setSelectMonth,
  setSelectYear,
}) => {
  switch (level) {
    case 'month': {
      return <ShowDate days={days} setSelectDay={setSelectDay} />;
    }
    case 'year': {
      return <ShowMonth setSelectMonth={setSelectMonth} />;
    }
    case 'decad': {
      return <ShowYear setSelectYear={setSelectYear} year={year} />;
    }
    default: {
      return <ShowDate days={days} setSelectDay={setSelectDay} />;
    }
  }
};

interface ShowDateProps {
  days: DATE_TYPE[];
  setSelectDay(day: number): void;
}

const ShowDate: React.FC<ShowDateProps> = ({ days, setSelectDay }) => {
  const rows = [
    days.slice(0, 7),
    days.slice(7, 14),
    days.slice(14, 21),
    days.slice(21, 28),
    days.slice(28, 35),
    days.slice(35),
  ];

  return (
    <div className="date-wrap">
      <div className="week-row">
        {WEEK.map((w) => (
          <div key={w} className="week-col">
            {w}
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <div key={index} className="days-row">
          {row.map((day) => (
            <div
              className={`day-col ${day.isCurrentMonth ? 'current-day' : 'not-current-day'}`}
              onClick={() => setSelectDay(day.value)}
            >
              {day.value}
            </div>
          ))}
        </div>
      ))}
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
      {decadList.map((d, index) => (
        <div className="year-col" onClick={() => setSelectYear(d.value)}>
          {d.value}
        </div>
      ))}
    </div>
  );
};

export default React.memo(CalendarBody);
