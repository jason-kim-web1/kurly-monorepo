import { ReactNode } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div<{ hasBottomLine?: boolean }>`
  border-bottom: 8px solid ${COLOR.bg};
  ${({ hasBottomLine }) => !hasBottomLine && 'border: none; padding-bottom: 22px;'}
`;

interface Props {
  children: ReactNode;
  hasBottomLine?: boolean;
}

export default function SectionWrapper({ children, hasBottomLine = true }: Props) {
  return <Container hasBottomLine={hasBottomLine}>{children}</Container>;
}
