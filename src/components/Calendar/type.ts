export type TimeLevel = 'month' | 'year' | 'decad';

export enum WEEK_TYPE {
  SU = 'su',
  MO = 'Mo',
  TU = 'Tu',
  WE = 'We',
  TH = 'Th',
  FR = 'Fr',
  SA = 'Sa',
}

export enum MONTH_TYPE {
  JAN = 'Jan',
  FEB = 'Feb',
  MAR = 'Mar',
  APR = 'Apr',
  MAY = 'May',
  JUN = 'Jun',
  JUL = 'Jul',
  AUG = 'Aug',
  SEP = 'Sep',
  OCT = 'Oct',
  NOV = 'Nov',
  DEC = 'Dec',
}

export interface DATE_TYPE {
  value: number;
  isCurrentMonth: boolean;
}

export interface CurrentDecadYear {
  value: number;
  isCurrentDecadYear: boolean;
}
