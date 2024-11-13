import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { Interpolation, Theme } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { PropsWithChildrenOnly } from '../../../../shared/interfaces';

interface HeaderRowProps {
  style?: Interpolation<Theme>;
}

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray800};
  border-top: 2px solid ${COLOR.kurlyGray800};
`;

const Row = styled.div`
  text-align: center;
  line-height: 20px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
`;

const ListHeader = ({ children }: PropsWithChildrenOnly) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

const HeaderRow = ({ children, style }: PropsWithChildren<HeaderRowProps>) => {
  return <Row css={style}>{children}</Row>;
};

export const Header = Object.assign(ListHeader, { Row: HeaderRow });
