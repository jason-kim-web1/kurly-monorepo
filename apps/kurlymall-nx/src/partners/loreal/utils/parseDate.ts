import { parseISO, format } from 'date-fns';

export const parseDate = (date: string): string => {
  if (!date) {
    return '';
  }
  return format(parseISO(date), 'yyyy.MM.dd');
};
