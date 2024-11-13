import { isToday, isTomorrow, isAfter, format } from 'date-fns';

const hour = (time: string) => {
  if (/23:59:59/g.test(time)) {
    return '24시';
  }
  return 'HH시';
};

export const couponExpired = (endAt?: string | null) => {
  if (!endAt) {
    return '만료기간 없음';
  }

  const endDate = new Date(endAt);

  if (isAfter(new Date(), endDate)) {
    return '유효기간 만료';
  }

  if (isToday(endDate)) {
    return `오늘 (${format(endDate, `MM월dd일) ${hour(endAt)}`)} 만료`;
  }

  if (isTomorrow(endDate)) {
    return `내일 (${format(endDate, `MM월dd일) ${hour(endAt)}`)} 만료`;
  }

  return `${format(endDate, `yyyy년 MM월dd일 ${hour(endAt)}`)} 만료`;
};
