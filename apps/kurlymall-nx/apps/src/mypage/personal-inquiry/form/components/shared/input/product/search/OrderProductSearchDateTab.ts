import { format } from 'date-fns-tz';
import { subDays, subMonths } from 'date-fns';

export const getFormattedStartDayDateTime = (date: Date) => format(date, "yyyy-MM-dd'T'00:00:00.000xxx");

export const getFormattedEndDayDateTime = (date: Date) => format(date, "yyyy-MM-dd'T'23:59:59.000xxx");

const currentDate = new Date();
const endOfCurrentDayDateTime = getFormattedEndDayDateTime(currentDate);
const weekAgo = getFormattedStartDayDateTime(subDays(currentDate, 7));
const monthAgo = getFormattedStartDayDateTime(subMonths(currentDate, 1));
const threeMonthsAgo = getFormattedStartDayDateTime(subMonths(currentDate, 3));
const sixMonthsAgo = getFormattedStartDayDateTime(subMonths(currentDate, 6));

export const orderProductSateSelectorTabs = [
  {
    displayName: '1주일',
    dates: [weekAgo, endOfCurrentDayDateTime],
  },
  {
    displayName: '1개월',
    dates: [monthAgo, endOfCurrentDayDateTime],
  },
  {
    displayName: '3개월',
    dates: [threeMonthsAgo, endOfCurrentDayDateTime],
  },
  {
    displayName: '상세조회',
    dates: [sixMonthsAgo, endOfCurrentDayDateTime],
  },
];

export const DEFAULT_DATE_SELECTOR_TAB_NUMBER = 0; // 1주일 탭
export const CUSTOM_DATE_SELECTOR_TAB_NUMBER = 3; // 상세조회 탭
