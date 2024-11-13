import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

import { useWebview } from '../../../../shared/hooks';
import { USER_MENU_HEIGHT } from '../constants/favorite.constant';

const Container = styled.div<{ webview: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${isPC
    ? css`
        height: 700px;
      `
    : css`
        position: absolute;
        left: 0;
      `}

  top: ${({ webview }) => (webview ? 0 : USER_MENU_HEIGHT)}px;
  bottom: ${({ webview }) => (webview ? 0 : USER_MENU_HEIGHT)}px;
  width: 100%;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
`;

export const ProductEmpty = () => {
  return <Container webview={useWebview()}>상품 구매 정보가 없습니다.</Container>;
};
