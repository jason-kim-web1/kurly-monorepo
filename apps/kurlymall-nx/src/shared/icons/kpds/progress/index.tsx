import Lottie from 'react-lottie-player';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import * as typeWhiteData from './typeWhite.json';
import * as typeBlackData from './typeBlack.json';

const Wrapper = styled.div<{ isOverlay: boolean }>`
  width: 30px;
  height: 32px;

  ${({ isOverlay }) =>
    isOverlay &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: ${vars.color.background.$background1};

      > div {
        width: 32px;
        height: 32px;
      }
    `}
`;

interface ProgressProps {
  type?: 'white' | 'normal' | 'overlay';
}

const PROGRESS_TYPE_LIST = {
  white: typeWhiteData,
  normal: typeBlackData,
  overlay: typeBlackData,
};

/**
 * @param type 아이콘 타입
 * @description 버튼 검정색 로딩 아이콘: normal (기본타입)
 * @description 버튼 흰색 로딩 아이콘: white
 * @description 페이지 로딩 아이콘: overlay
 */
export default function Progress({ type = 'normal' }: ProgressProps) {
  const animationData = PROGRESS_TYPE_LIST[type];

  return (
    <Wrapper isOverlay={type === 'overlay'}>
      <Lottie loop={true} play={true} animationData={animationData} />
    </Wrapper>
  );
}
