import { useCallback, useMemo } from 'react';

import { format } from 'date-fns';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import { InputEventType } from '../../interfaces/BulkOrderForm.interface';
import { useAppSelector } from '../../../../shared/store';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import DateSelector from '../../../personal-inquiry/form/components/shared/input/product/search/DateSelector';
import FormText from './FormText';
import { handleChange } from '../../reducers/bulk-order.slice';

const DateSelectorWrapper = styled.div<{ isPC: boolean }>`
  width: ${({ isPC }) => (isPC ? '300px' : '100%')};

  > div {
    height: 42px;
  }

  > div > span {
    font-weight: normal;
  }
`;

export default function BulkOrderDateForm({ isPC = true }: { isPC: boolean }) {
  const dispatch = useDispatch();

  const {
    form: { receiveDate },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  const currentDate = useMemo(() => new Date(), []);
  const selectedDate = useMemo(() => new Date(receiveDate), [receiveDate]);

  const handleDateChange = useCallback(
    (date: Date) => {
      const value = format(date, 'yyyy-MM-dd');
      onChange({ name: 'receiveDate', value });
    },
    [onChange],
  );

  return (
    <>
      <InputGroup label="수령 희망일" isRequired colspan={true}>
        <DateSelectorWrapper isPC={isPC}>
          <DateSelector
            boardColor={COLOR.lightGray}
            position="left"
            date={selectedDate}
            minDate={currentDate}
            onDateChange={handleDateChange}
          />
        </DateSelectorWrapper>
        <FormText warning={isPC}>
          수령 희망일이 명확하지 않을 경우, 가장 빠른 예상 일자를 선택바랍니다.
          <br />
          대량 주문은 모두 택배로 배송되며, 희망 수령일은 화/수/목/금/토요일 중 선택 가능합니다.(일/월요일 제외)
        </FormText>
      </InputGroup>
    </>
  );
}
