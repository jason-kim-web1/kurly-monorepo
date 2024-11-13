import DatePicker, { registerLocale } from 'react-datepicker';

import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import ko from 'date-fns/locale/ko';

import SlideModal from '../modal/SlideModal';

registerLocale('ko', ko);

const Bottom = styled.div({
  display: 'flex',
  padding: '.5rem .75rem',
});

const Button = styled.div({
  height: '3.25rem',
  width: '100%',
  display: 'flex',
  backgroundColor: '#5f0080',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
  borderRadius: 6,
  fontSize: '1rem',
  marginTop: 2,
});

const Container = styled.div`
  height: 29.2rem;
`;

interface Props {
  selectedDate: Date;
  open: boolean;
  onClose(): void;
  onDateChange(date: Date): void;
  maxDate?: Date;
  minDate?: Date;
}

export default function DatePickerSlideModal({ selectedDate, open, onClose, onDateChange, minDate, maxDate }: Props) {
  const [date, setDate] = useState<Date>(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleComplete = () => {
    if (date) {
      onDateChange(date);
    }
    onClose();
  };

  const handleChange = (changedDate: Date) => {
    setDate(changedDate);
  };

  return (
    <SlideModal open={open} onClose={onClose} disablePortal={true}>
      <Container>
        <DatePicker
          locale="ko"
          inline
          dateFormatCalendar="yyyy년 M월"
          calendarClassName="mobile"
          onChange={handleChange}
          selected={date}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Bottom>
          <Button onClick={handleComplete}>선택 완료</Button>
        </Bottom>
      </Container>
    </SlideModal>
  );
}
