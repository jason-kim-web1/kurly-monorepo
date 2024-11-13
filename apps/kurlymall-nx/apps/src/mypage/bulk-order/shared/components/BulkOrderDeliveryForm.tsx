import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import { useAppSelector } from '../../../../shared/store';
import { InputEventType } from '../../interfaces/BulkOrderForm.interface';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import Radio from '../../../../shared/components/Input/Radio';
import { handleChange } from '../../reducers/bulk-order.slice';

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${isPC ? 'row' : 'column'};
  width: 300px;

  > label > span {
    font-size: 14px;
  }
`;

export default function BulkOrderDeliveryForm() {
  const dispatch = useDispatch();

  const {
    form: { deliveryType },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  return (
    <InputGroup label="배송지">
      <RadioWrapper>
        <Radio
          label="여러 곳으로 수령"
          value="DELIVERY_MULTIPLE"
          name="deliveryType"
          id="variousPlaces"
          onChange={onChange}
          selectedValue={deliveryType}
        />
        <Radio
          label="한 곳으로 수령"
          value="DELIVERY_ONE"
          name="deliveryType"
          id="onePlaces"
          onChange={onChange}
          selectedValue={deliveryType}
        />
      </RadioWrapper>
    </InputGroup>
  );
}
