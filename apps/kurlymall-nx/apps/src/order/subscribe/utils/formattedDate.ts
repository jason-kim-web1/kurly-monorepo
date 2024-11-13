import { format, isValid } from 'date-fns';

export const getFormattedDate = (date: string | null): string => {
  if (!date || !isValid(new Date(date))) {
    return '';
  }
  return format(new Date(date), 'yyyy년 MM월 dd일');
};
