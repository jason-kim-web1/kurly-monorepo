import { format } from 'date-fns';

export const getFormattedDate = (date?: string, formatStr?: string) => {
  if (!date) {
    return '';
  }
  return format(new Date(date), formatStr || 'yyyy.MM.dd');
};
