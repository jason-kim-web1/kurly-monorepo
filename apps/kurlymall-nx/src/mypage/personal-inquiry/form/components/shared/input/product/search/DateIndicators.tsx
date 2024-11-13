import styled from '@emotion/styled';

import { addMonths, subDays, subYears } from 'date-fns';

import DateSelector from './DateSelector';
import { getFormattedEndDayDateTime, getFormattedStartDayDateTime } from './OrderProductSearchDateTab';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.375rem;
`;

interface Props {
  startDate: string;
  endDate: string;
  setStartDate(date: string): void;
  setEndDate(date: string): void;
}

const MAX_SELECTABLE_YEAR_AGO = 3; // 최대 3년 전 까지 조회 가능
const MAX_SELECTABLE_MONTH_RANGE = 6; // 최대 6개월 단위로 조회 가능

const getSmallerDate = (a: Date, b: Date) => {
  if (a > b) {
    return b;
  }
  return a;
};

export default function DateIndicators({ startDate, setStartDate, setEndDate, endDate }: Props) {
  const handleStartDateChange = (date: Date) => {
    setStartDate(getFormattedStartDayDateTime(date));

    const maxEndDate = addMonths(date, MAX_SELECTABLE_MONTH_RANGE);

    if (new Date(endDate) > maxEndDate) {
      setEndDate(getFormattedEndDayDateTime(maxEndDate));
    }
  };
  const handleEndDateChange = (date: Date) => {
    setEndDate(getFormattedEndDayDateTime(date));
  };

  return (
    <Container>
      <DateSelector
        date={new Date(startDate)}
        onDateChange={handleStartDateChange}
        maxDate={subDays(new Date(endDate), 1)}
        minDate={subYears(new Date(), MAX_SELECTABLE_YEAR_AGO)}
        position="left"
      />
      <DateSelector
        date={new Date(endDate)}
        onDateChange={handleEndDateChange}
        maxDate={getSmallerDate(addMonths(new Date(startDate), MAX_SELECTABLE_MONTH_RANGE), new Date())}
        minDate={new Date(startDate)}
        position="right"
      />
    </Container>
  );
}
