import { css } from '@emotion/react';

export const imageRatioWrapper = (paddingTop?: string) => css`
  overflow: hidden;
  position: relative;
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

export const imageRatio = () => css`
  position: absolute;
  top: -100%;
  right: -100%;
  bottom: -100%;
  left: -100%;
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
`;
