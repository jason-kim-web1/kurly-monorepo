import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { isUndefined } from 'lodash';

import { PickupPeriod } from '../interfaces';

const convertStringToDateType = (date: Date | string) => {
  if (typeof date === 'string') {
    return utcToZonedTime(new Date(date), 'Asia/Seoul');
  }
  return date;
};

export default function getPickupDate(params?: PickupPeriod) {
  if (isUndefined(params)) {
    return {
      startYear: '',
      startMonth: '',
      startDay: '',
      endYear: '',
      endMonth: '',
      endDay: '',
    };
  }

  const { startDate, endDate } = params;
  const start = convertStringToDateType(startDate);
  const end = convertStringToDateType(endDate);

  const [startYear, startMonth, startDay] = format(start, 'yyyy-MM-dd').split('-');
  const [endYear, endMonth, endDay] = format(end, 'yyyy-MM-dd').split('-');

  return {
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay,
  };
}
