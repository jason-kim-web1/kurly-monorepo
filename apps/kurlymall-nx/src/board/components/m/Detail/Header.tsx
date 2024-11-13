import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { SerializedStyles } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

interface HeaderMainProps {
  children?: ReactNode;
}

interface HeaderTitleProps {
  children?: ReactNode;
  styles?: SerializedStyles;
}

interface HeaderTextProps {
  children?: ReactNode;
  styles?: SerializedStyles;
}

const LineBreak = styled.div<{ styles?: SerializedStyles }>`
  display: flex;
  flex-direction: row;
  ${({ styles }) => styles && { ...styles }}
`;

const Text = styled.div<{ styles?: SerializedStyles }>`
  ${({ styles }) => styles && { ...styles }}
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const HeaderLineBreak = ({ children, styles }: HeaderTitleProps) => {
  return <LineBreak styles={styles}>{children}</LineBreak>;
};

const HeaderText = ({ children, styles }: HeaderTextProps) => {
  return <Text styles={styles}>{children}</Text>;
};

const HeaderMain = ({ children }: HeaderMainProps) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export const Header = Object.assign(HeaderMain, { HeaderText, HeaderLineBreak });
