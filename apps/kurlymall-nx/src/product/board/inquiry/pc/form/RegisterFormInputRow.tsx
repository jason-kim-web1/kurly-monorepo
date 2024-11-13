import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Label = styled.div`
  display: flex;
  margin-top: 16px;
`;

const LabelTextWrap = styled.div`
  width: 100px;
  padding-top: 12px;
  span {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${COLOR.kurlyGray800};
  }
`;

const InputWrap = styled.div`
  flex: 6.5;
`;

interface Props {
  label?: string;
  children: ReactNode;
}

export default function RegisterFormInputRow({ label, children }: Props) {
  return (
    <Label>
      <LabelTextWrap>
        <span>{label}</span>
      </LabelTextWrap>
      <InputWrap>{children}</InputWrap>
    </Label>
  );
}
