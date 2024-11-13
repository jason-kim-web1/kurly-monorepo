import { format } from 'date-fns';

export const getOrderDateFormat = (date: string | number) => {
  const dateCasting = new Date(date);
  return format(dateCasting, 'yyyy.MM.dd (HH시 mm분)');
};

export const getJoinOrderDateFormat = (date: string | number) => {
  const dateCasting = new Date(date);
  return format(dateCasting, 'yyyy-MM-dd HH:mm');
};
