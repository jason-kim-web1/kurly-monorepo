import { css } from '@emotion/react';

import COLOR from '../constant/colorset';

// 말줄임 처리 CSS
export const productCardImageWrapper = (paddingTop?: string) => css`
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  ${paddingTop && `padding-top: ${paddingTop}`};
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const productCardImage = css`
  position: absolute;
  top: -100%;
  right: -100%;
  bottom: -100%;
  left: -100%;
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
  background-color: ${COLOR.kurlyGray200};
`;
