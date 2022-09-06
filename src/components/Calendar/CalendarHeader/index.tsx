import React from 'react';
import { TimeLevel } from '../type';
import './index.css';

interface CalendarHeaderProps {
  level: TimeLevel;
  month: string;
  year: number;
  setPrev(): void;
  setNext(): void;
  setHigherLevel(): void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ level, month, year, setNext, setPrev, setHigherLevel }) => {
  const [title, setTitle] = React.useState<string>(month + ' ' + year);

  React.useEffect(() => {
    switch (level) {
      case 'month':
        setTitle(month + ' ' + year);
        break;
      case 'year':
        setTitle(year.toString());
        break;
      case 'decad':
        let beginYear = Math.floor(year / 10) * 10;
        let endYear = beginYear + 9;
        setTitle(beginYear + '-' + endYear);
        break;
    }
  }, [level, month, year]);

  return (
    <div className="cal-header-wrap">
      <div className="btn before" onClick={setPrev}>
        {'<'}
      </div>
      <div className="header-content" onClick={setHigherLevel}>
        {title}
      </div>
      <div className="btn later" onClick={setNext}>
        {'>'}
      </div>
    </div>
  );
};

export default CalendarHeader;
