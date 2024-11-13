import { css } from '@emotion/react';

import RegisterFormInputRow from './RegisterFormInputRow';
import InputBox from '../../../../../shared/components/Input/InputBox';
import COLOR from '../../../../../shared/constant/colorset';

const inputBox = css`
  padding-bottom: 0;
  input {
    height: 44px;
    padding: 0 11px 0 15px;
    font-size: 14px;
    ::placeholder {
      font-size: 14px;
      color: ${COLOR.disabled};
    }
  }
`;

interface Props {
  value: string;
  onChange(e: any): void;
}

export default function RegisterFormInputSubject({ value, onChange }: Props) {
  const handleChange = (params: { name?: string; value: string }) => {
    onChange({ target: params });
  };
  return (
    <RegisterFormInputRow label="제목">
      <InputBox
        css={inputBox}
        name="subject"
        maxLength={34}
        height={42}
        placeholder="제목을 입력해 주세요"
        value={value}
        onChange={handleChange}
      />
    </RegisterFormInputRow>
  );
}
