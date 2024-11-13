import styled from '@emotion/styled';

import { arrowBannerRight } from '../../../../shared/images';

const SlideButton = styled.button<{ direction: 'left' | 'right'; isVisible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ direction }) =>
    direction === 'left'
      ? `
    right: 50%;
    margin: auto 590px auto 0;
  `
      : `
    left: 50%;
    margin: auto 0 auto 590px;
  `}
  vertical-align: center;
  z-index: 10;
  width: 52px;
  height: 52px;
  transition: all 0.5s ease 0s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  background: url(${arrowBannerRight}) 50% 50% no-repeat;
  transform: rotate(${({ direction }) => (direction === 'left' ? 180 : 0)}deg);
`;

interface Props {
  isVisible: boolean;
  onClickPrev(): void;
  onClickNext(): void;
}

export default function MainBannerSwiperButtons({ onClickPrev, onClickNext, isVisible }: Props) {
  return (
    <>
      <SlideButton type="button" onClick={onClickPrev} direction="left" isVisible={isVisible} />
      <SlideButton type="button" onClick={onClickNext} direction="right" isVisible={isVisible} />
    </>
  );
}
