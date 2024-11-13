import styled from '@emotion/styled';

import { css } from '@emotion/react';

import ScrollTop from '../../../shared/icons/kpds/ScrollTop';
import { zIndex } from '../../../shared/styles';
import { useScroll } from '../../../shared/hooks';
import { isPC } from '../../../../util/window/getDevice';

const ButtonWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  z-index: ${zIndex.topScrollButton};
  right: 8px;
  bottom: 8px;
  @supports (bottom: constant(safe-area-inset-bottom)) {
    bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    bottom: calc(8px + env(safe-area-inset-bottom));
  }
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.5s;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `}
`;
export function ScrollTopButton() {
  const { scrollDirection } = useScroll();
  const isVisible = scrollDirection === 'up' && window.scrollY > 0;

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isPC) {
    return null;
  }

  return (
    <ButtonWrapper isVisible={isVisible} onClick={handleScrollTop}>
      <ScrollTop />
    </ButtonWrapper>
  );
}
