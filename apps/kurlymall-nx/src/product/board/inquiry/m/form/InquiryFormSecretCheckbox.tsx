import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { ChangeEvent } from 'react';

import Checkbox from '../../../../../shared/components/Input/Checkbox';

const Container = styled.div`
  margin-top: 16px;
`;

const checkbox = css`
  font-size: 14px;
  line-height: 24px;
  padding: 0;
  img {
    margin-right: 10px;
  }
`;

interface Props {
  value: boolean;
  onChange(e: ChangeEvent): void;
}

export default function InquiryFormSecretCheckbox({ value, onChange }: Props) {
  return (
    <Container>
      <Checkbox name="isSecret" css={checkbox} checked={value} label="비밀글로 문의하기" onChange={onChange} />
    </Container>
  );
}
