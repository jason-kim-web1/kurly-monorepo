import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

interface HeaderRowProps {
  width?: number;
  grow?: number;
}

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray800};
  border-top: 2px solid ${COLOR.kurlyGray800};
`;

const Row = styled.div<{ width?: number; grow?: number }>`
  ${({ width }) => width && `flex-basis: ${width}px`};
  ${({ grow }) => grow && `flex-grow: ${grow}`};
  text-align: center;
  line-height: 20px;
  font-weight: 400;
  color: ${COLOR.kurlyGray800};
`;

const ListHeader = ({ children }: PropsWithChildrenOnly) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

const HeaderRow = ({ children, width, grow }: PropsWithChildren<HeaderRowProps>) => {
  return (
    <Row width={width} grow={grow}>
      {children}
    </Row>
  );
};

export const Header = Object.assign(ListHeader, { Row: HeaderRow });
