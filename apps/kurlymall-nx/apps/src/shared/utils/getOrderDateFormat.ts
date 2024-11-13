import { format, isValid } from 'date-fns';

export const getOrderDateFormat = (date: string | number) => {
  const dateCasting = isValid(new Date(date)) ? new Date(date) : new Date();
  return format(dateCasting, 'yyyy.MM.dd (HH시 mm분)');
};

export const getOrderDetailDateFormat = (date: string | number) => {
  const dateCasting = isValid(new Date(date)) ? new Date(date) : new Date();
  return format(dateCasting, 'yyyy-MM-dd HH:mm:ss');
};

export const getKurlyMembersStartSettlementDate = (date: string | number) => {
  const dateCasting = isValid(new Date(date)) ? new Date(date) : new Date();
  return format(dateCasting, 'yyyy년 MM월 dd일');
};
