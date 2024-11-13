import { css } from '@emotion/react';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { TEXT_DENY_REGEX } from '../../../../shared/constant';
import { useAppSelector } from '../../../../shared/store';
import { InputEventType } from '../../interfaces/BulkOrderForm.interface';
import { handleChange } from '../../reducers/bulk-order.slice';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import InputBox from '../../../../shared/components/Input/InputBox';
import PhoneNumberBox from '../../../../shared/components/Input/PhoneNumberBox';
import FormText from './FormText';

const inputStyle = (isPC: boolean) => css`
  padding: 0;

  > div {
    height: 42px;
  }

  input {
    width: ${isPC ? '300px' : '100%'};
    height: 42px;
    font-size: 14px;
  }
`;

export default function BulkOrderBasicForm({ isPC = true }: { isPC: boolean }) {
  const dispatch = useDispatch();

  const {
    form: { name, contact, email },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  return (
    <>
      <InputGroup htmlFor="name" label="신청하는 분 이름" isRequired>
        <InputBox
          id="name"
          name="name"
          required
          placeholder="신청하는 분 이름을 입력해주세요."
          denyPattern={TEXT_DENY_REGEX}
          maxLength={20}
          value={name}
          onChange={onChange}
          css={inputStyle(isPC)}
        />
      </InputGroup>
      <InputGroup htmlFor="contact" label="신청하는 분 연락처" isRequired>
        <PhoneNumberBox
          id="contact"
          name="contact"
          required
          placeholder="'-' 없이 숫자만"
          value={contact}
          onChange={onChange}
          css={inputStyle(isPC)}
        />
      </InputGroup>
      <InputGroup htmlFor="email" label="신청하는 분 이메일" isRequired>
        <InputBox
          id="email"
          name="email"
          required
          placeholder="kurly@example.com"
          value={email}
          onChange={onChange}
          css={inputStyle(isPC)}
        />
        <FormText>이메일 주소를 작성해주시면 원활한 소통이 가능합니다.</FormText>
      </InputGroup>
    </>
  );
}
