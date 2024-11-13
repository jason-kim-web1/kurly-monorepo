import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Menu, withStyles } from '@material-ui/core';

const StyledMenu = withStyles({
  list: {
    paddingTop: 12,
  },
})((props: any) => (
  <Menu
    open
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: props.horizontal,
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: props.horizontal,
    }}
    {...props}
  />
));

interface Props {
  selectedDate: Date;
  open: boolean;
  onClose(): void;
  anchorEl: any;
  onDateChange(date: Date): void;
  maxDate?: Date;
  minDate?: Date;
  horizontal: string;
}

const DatePickerLayer = ({
  open,
  onClose,
  selectedDate,
  onDateChange,
  maxDate,
  minDate,
  anchorEl,
  horizontal,
}: Props) => {
  const [date, setDate] = useState<Date>(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleChange = (changedDate: Date) => {
    setDate(changedDate);
    onDateChange(changedDate);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <StyledMenu anchorEl={anchorEl} open={open} onClose={onClose} horizontal={horizontal}>
      <DatePicker
        locale="ko"
        inline
        dateFormatCalendar="yyyy년 M월"
        calendarClassName="pc"
        onChange={handleChange}
        selected={date}
        minDate={minDate}
        maxDate={maxDate}
      />
    </StyledMenu>
  );
};

export default DatePickerLayer;
