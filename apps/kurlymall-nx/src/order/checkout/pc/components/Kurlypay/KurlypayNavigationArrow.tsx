import { useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Swiper as SwiperClass } from 'swiper/types';

import NavigationArrowKurlypay from '../../../../../shared/components/icons/order/checkout/NavigationArrowKurlypay';

const PaginationButton = styled.button<{ position: string }>`
  position: absolute;
  z-index: 1;
  left: -25px;
  top: 56px;
  width: 50px;
  height: 73px;
  ${({ position }) =>
    position === 'right' &&
    css`
      left: auto;
      right: -25px;
      transform: rotate(180deg);
    `}
`;

interface Props {
  swiper?: SwiperClass;
}

export default function KurlypayNaviationArrow({ swiper }: Props) {
  const handleClickPrev = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slidePrev();
  }, [swiper]);

  const handleClickNext = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slideNext();
  }, [swiper]);

  return (
    <>
      {!swiper?.isBeginning && (
        <PaginationButton position="left" type="button" data-testid="prev-arrow" value="prev" onClick={handleClickPrev}>
          <NavigationArrowKurlypay />
        </PaginationButton>
      )}
      {!swiper?.isEnd && (
        <PaginationButton
          position="right"
          type="button"
          data-testid="next-arrow"
          value="next"
          onClick={handleClickNext}
        >
          <NavigationArrowKurlypay />
        </PaginationButton>
      )}
    </>
  );
}
