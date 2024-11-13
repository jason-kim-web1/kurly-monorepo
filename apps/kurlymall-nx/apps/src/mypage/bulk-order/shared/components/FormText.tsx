import styled from '@emotion/styled';

import { ReactNode } from 'react';

import COLOR from '../../../../shared/constant/colorset';

const WarningText = styled.p<{ warning?: boolean }>`
  padding-top: 8px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ warning }) => (warning ? COLOR.invalidRed : COLOR.kurlyGray600)};
`;

interface Props {
  warning?: boolean;
  children: ReactNode;
}

export default function FormText({ warning, children }: Props) {
  return <WarningText warning={warning}>{children}</WarningText>;
}
