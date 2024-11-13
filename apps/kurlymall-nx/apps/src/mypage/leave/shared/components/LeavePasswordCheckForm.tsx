import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';

import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { InputEventType } from '../../interface/Leave.interface';
import { useAppSelector } from '../../../../shared/store';

const inputStyle = css`
  width: ${isPC ? '332px' : '100%'};
  padding: 0;

  input {
    font-size: 14px;
  }
`;

interface Props {
  onChange(e: InputEventType): void;
}

export default function LeavePasswordCheckForm({ onChange }: Props) {
  const {
    form: { password },
  } = useAppSelector(({ leave }) => leave);

  return (
    <InputGroup label="비밀번호 입력" htmlFor="password">
      <InputBox
        id="password"
        name="password"
        type="password"
        placeholder="현재 비밀번호를 입력해주세요"
        value={password}
        css={inputStyle}
        onChange={onChange}
      />
    </InputGroup>
  );
}
