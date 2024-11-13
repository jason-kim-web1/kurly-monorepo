import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import { useAppSelector } from '../../../../shared/store';
import { setReasonCode } from '../../reducers/leave.slice';
import { InputEventType } from '../../interface/Leave.interface';
import InputGroup from '../../../../shared/components/InputGroup/m/InputGroup';
import { REASON_CODES } from '../../constants';
import SelectWithModal from '../../../../shared/components/Input/SelectWithModal';

export default function MobileSelectForm() {
  const dispatch = useDispatch();

  const { reasonCode } = useAppSelector(({ leave }) => leave);

  const handleSelect = useCallback(
    (event: InputEventType) => {
      dispatch(setReasonCode(event));
    },
    [dispatch],
  );

  return (
    <InputGroup label="무엇이 불편하였나요?">
      <SelectWithModal value={Object.assign(reasonCode)} options={REASON_CODES} onSelect={handleSelect} />
    </InputGroup>
  );
}
