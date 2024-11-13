import { addMonths, format } from 'date-fns';

import { GiftHistoryList } from '../../../shared/api/events/member/benefit.api';

export default function useGiftHistoryStatus(giftHistory: GiftHistoryList[]) {
  const giftHistoryReverse = [...giftHistory].reverse();
  const firstHistoryDate = giftHistory[0].id;
  const lastHistoryDate = giftHistoryReverse[0].id;
  const firstHistoryDateFormat = firstHistoryDate.replace(/[.]/g, '-');

  const currentMonth = format(new Date(firstHistoryDateFormat), 'M');
  const nextMonth = format(addMonths(new Date(firstHistoryDateFormat), 1), 'M');
  const prevMonth = format(addMonths(new Date(firstHistoryDateFormat), -1), 'M');

  return {
    firstHistoryDate,
    lastHistoryDate,
    currentMonth,
    nextMonth,
    prevMonth,
  };
}
