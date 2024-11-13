import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../constant/colorset';

const Footer = styled.footer<{ transparent: boolean; hasUserMenu: boolean; columnGap: boolean }>`
  padding: 8px 12px;
  position: fixed;
  left: 0;
  bottom: ${({ hasUserMenu }) => (hasUserMenu ? '45px' : 0)};
  width: 100%;
  display: flex;
  z-index: 10;

  ${({ columnGap }) =>
    columnGap &&
    css`
      column-gap: 7px;
    `}

  ${({ transparent }) =>
    transparent
      ? `
    background: linear-gradient(rgba(255, 255, 255, 0) 14%, ${COLOR.kurlyWhite} 50%);
  `
      : `
    background: ${COLOR.kurlyWhite};
  `};

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
`;

const Gutter = styled.div<{ height: number }>`
  ${({ height }) => `
    @supports (height: constant(safe-area-inset-bottom)) {
      height: calc(16px + ${height}px + constant(safe-area-inset-bottom));
    }
    @supports (height: env(safe-area-inset-bottom)) {
      height: calc(16px + ${height}px + env(safe-area-inset-bottom));
    }
  `}
`;

interface Props {
  className?: string;
  height?: number;
  children: ReactNode;
  transparent?: boolean;
  hasUserMenu?: boolean;
  columnGap?: boolean;
}

export default function MobileFooter({
  className,
  children,
  height = 68,
  transparent = false,
  hasUserMenu = false,
  columnGap = false,
}: Props) {
  return (
    <>
      <Footer className={className} transparent={transparent} hasUserMenu={hasUserMenu} columnGap={columnGap}>
        {children}
      </Footer>
      <Gutter height={height} />
    </>
  );
}
