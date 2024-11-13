import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import IconCalendar from '../../../../../../icons/IconCalendar';
import DatePickerSlideModal from '../../../../../../../../shared/components/Input/DatePickerSlideModal';
import { isPC } from '../../../../../../../../../util/window/getDevice';
import DatePickerLayer from '../../../../../../../../shared/components/Input/DatePickerLayer';

import COLOR from '../../../../../../../../shared/constant/colorset';

const Button = styled.div<{ open: boolean; boardColor?: string }>`
  height: 2.5rem;
  border-radius: 3px;
  border: solid 1px ${({ open, boardColor }) => (open ? COLOR.kurlyGray800 : boardColor)};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.75rem;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-right: 0.375rem;
  }
`;

const DateText = styled.span({
  color: '#333333',
  fontWeight: 'bold',
  fontSize: '0.875rem',
});

interface Props {
  date: Date;
  onDateChange(date: Date): void;
  minDate?: Date;
  maxDate?: Date;
  position: string;
  boardColor?: string;
}

export default function DateSelector({
  date,
  onDateChange,
  minDate,
  maxDate,
  position,
  boardColor = COLOR.kurlyGray200,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPc, setIsPc] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsPc(isPC);
  }, []);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const DatePicker = isPc ? DatePickerLayer : DatePickerSlideModal;

  return (
    <>
      <Button onClick={handleOpen} open={open} boardColor={boardColor}>
        <DateText>{date && format(date, 'yyyy.MM.dd')}</DateText>
        <IconCalendar />
      </Button>
      <DatePicker
        selectedDate={date}
        open={open}
        anchorEl={anchorEl}
        onDateChange={onDateChange}
        onClose={handleClose}
        minDate={minDate}
        maxDate={maxDate}
        horizontal={position}
      />
    </>
  );
}
