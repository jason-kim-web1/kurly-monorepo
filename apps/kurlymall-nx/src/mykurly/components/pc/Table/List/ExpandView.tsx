import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import COLOR from '../../../../../shared/constant/colorset';

interface BoardExpandViewProps {
  isOpen: boolean;
}

const ExpendView = styled.li`
  border-bottom: 1px solid ${COLOR.bg};
`;

export default function TableExpandView({ children, isOpen }: PropsWithChildren<BoardExpandViewProps>) {
  if (!isOpen) {
    return null;
  }

  return <ExpendView>{children}</ExpendView>;
}
