import { format, parseISO } from 'date-fns';

import { padZero } from './number';

export const getTimeFromDate = (year: number, month: number, day: number, hours = 0, minutes = 0): number =>
  new Date(`${year}-${padZero(month)}-${padZero(day)}T${padZero(hours)}:${padZero(minutes)}:00+09:00`).getTime();

export const unixTimeStampToFormattedDate = (timestamp: number, formatStr: string): string =>
  format(timestamp, formatStr);

export const getFormattedDate = (timestamp?: number, formatStr?: string) => {
  if (!timestamp) {
    return '';
  }
  return unixTimeStampToFormattedDate(timestamp, formatStr || 'yy.MM.dd');
};

export const parseDate = (date: string, formatString = 'yyyy.MM.dd'): string => {
  if (!date) {
    return '';
  }

  return format(parseISO(date), formatString);
};
