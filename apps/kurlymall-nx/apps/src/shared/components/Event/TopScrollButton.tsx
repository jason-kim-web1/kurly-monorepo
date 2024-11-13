import styled from '@emotion/styled';
import { Link } from 'react-scroll';

import { css } from '@emotion/react';

import { speed, zIndex } from '../../../../src/shared/styles';
import { pageTop116x116C333, pageTop46x46C333, pageTopHover116x116C333 } from '../../../../src/shared/images';
import { isPC } from '../../../../util/window/getDevice';

const Container = styled.div<{ isDisplay: boolean }>`
  position: fixed;
  z-index: ${zIndex.topScrollButton};
  right: 31px;
  bottom: -46px;
  width: 58px;
  height: 58px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.5s, bottom 0.5s;
  ${({ isDisplay }) =>
    isDisplay &&
    css`
      opacity: 1;
      bottom: 15px;
    `}
  ${!isPC &&
  css`
    position: absolute;
    right: 15px;
    width: 46px;
    height: 46px;
  `}
  ${({ isDisplay }) =>
    !isPC &&
    isDisplay &&
    css`
      bottom: 65px;
      @supports (bottom: constant(safe-area-inset-bottom)) {
        bottom: calc(65px + constant(safe-area-inset-bottom));
      }
      @supports (bottom: env(safe-area-inset-bottom)) {
        bottom: calc(65px + env(safe-area-inset-bottom));
      }
    `}
`;

const Img = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  background: url(${pageTop46x46C333}) no-repeat 50% 50%;
  ${isPC &&
  css`
    background: url(${pageTop116x116C333}) no-repeat 50% 50% / 58px 58px;
    :hover {
      background: url(${pageTopHover116x116C333}) no-repeat 50% 50% / 58px 58px;
    }
  `}
`;

interface Props {
  isShow: boolean;
  onClick(): void;
}

export default function TopScrollButton({ isShow, onClick }: Props) {
  return (
    <Container isDisplay={isShow}>
      <Link to="__next" smooth duration={speed.scroll} onClick={onClick}>
        <Img />
      </Link>
    </Container>
  );
}
