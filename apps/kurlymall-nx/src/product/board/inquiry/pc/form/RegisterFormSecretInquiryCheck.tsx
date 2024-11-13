import { css } from '@emotion/react';

import { ChangeEvent } from 'react';

import RegisterFormInputRow from './RegisterFormInputRow';
import Checkbox from '../../../../../shared/components/Input/Checkbox';

const checkbox = css`
  font-size: 14px;
  line-height: 24px;
  padding: 0 0 20px;
`;

interface Props {
  checked: boolean;
  onChange(e: ChangeEvent): void;
}

export default function RegisterFormSecretInquiryCheck({ checked, onChange }: Props) {
  return (
    <RegisterFormInputRow>
      <Checkbox name="isSecret" css={checkbox} checked={checked} label="비밀글로 문의하기" onChange={onChange} />
    </RegisterFormInputRow>
  );
}
