import type { Property } from 'csstype';
import { css } from '@emotion/react';

interface OverflowDirection {
  x?: Property.OverflowX;
  y?: Property.OverflowY;
}

export const hiddenScrollBar = ({ x = 'hidden', y = 'scroll' }: OverflowDirection = {}) => css`
  overflow-x: ${x};
  overflow-y: ${y};
  scrollbar-width: none; // firefox
  -ms-overflow-style: none; // Edge

  // chrome, safari, opera
  &::-webkit-scrollbar {
    display: none;
  }
`;
