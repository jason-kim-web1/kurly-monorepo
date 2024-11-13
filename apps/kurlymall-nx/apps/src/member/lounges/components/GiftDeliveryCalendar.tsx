import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';

import { StyledDeliveryCalendar } from '../shared/styled';
import { isPC } from '../../../../util/window/getDevice';
import { VipGiftDeliveryAvailableDate } from '../shared/type';

type GiftDeliveryCalendarProps = {
  selectedDate?: Date;
  setDate: (date: Date) => void;
  isEdit: boolean;
  deliveryAvailableDate?: VipGiftDeliveryAvailableDate;
  excludeDates?: Date[];
};

function GiftDeliveryCalendar({
  selectedDate,
  setDate,
  isEdit,
  deliveryAvailableDate,
  excludeDates,
}: GiftDeliveryCalendarProps) {
  const handleDeliveryDate = (date: Date) => {
    setDate(date);
  };

  const filterDate = (date: Date) => {
    return deliveryAvailableDate?.available.includes(date.getDay()) || false;
  };

  const { minDate, maxDate } = useMemo(
    () => ({
      minDate: new Date(deliveryAvailableDate?.start || ''),
      maxDate: new Date(deliveryAvailableDate?.end || ''),
    }),
    [deliveryAvailableDate],
  );

  const dayClassName = useCallback(
    (d) => {
      return excludeDates?.some((date) => date.getMonth() === d.getMonth() && date.getDate() === d.getDate())
        ? 'exclude-date'
        : '';
    },
    [excludeDates],
  );

  return (
    <StyledDeliveryCalendar className={`${isPC ? 'pc' : 'mobile'} ${isEdit ? 'edit' : ''}`}>
      <div className="div-title">
        <img src="https://res.kurly.com/images/member-lounges/0701/gift_title02_v2.png" alt="02 수령날짜 선택하기" />
      </div>
      {isEdit ? (
        <div className="div-calendar">
          <ReactDatePicker
            dateFormatCalendar="yyyy. M"
            onChange={handleDeliveryDate}
            selected={selectedDate}
            inline
            maxDate={maxDate}
            minDate={minDate}
            locale={ko}
            filterDate={filterDate}
            dayClassName={dayClassName}
            excludeDates={excludeDates}
          />
        </div>
      ) : (
        <div className="div-saved-data">{selectedDate ? format(selectedDate, 'yyyy.MM.dd') : ''}</div>
      )}
    </StyledDeliveryCalendar>
  );
}

export default GiftDeliveryCalendar;
