import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { css } from '@emotion/react';

import { Close } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { ACTIVE_INDEX_INCREMENT } from '../../../../shared/constant/swiper';
import DragOverlayWrapper from '../../../../shared/components/motion/DragOverlayWrapper';

const overlayStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: ${COLOR.kurlyBlack};
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 44px;
  padding-inline: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
`;

const NumberOfSlides = styled.span`
  color: ${COLOR.kurlyWhite};
  font-weight: 600;
  font-size: 16px;
`;

const Content = styled.div`
  position: fixed;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  > img {
    @supports (bottom: constant(safe-area-inset-bottom)) {
      bottom: calc(constant(safe-area-inset-bottom) + 45px);
    }
    @supports (bottom: env(safe-area-inset-bottom)) {
      bottom: calc(env(safe-area-inset-bottom) + 45px);
    }
  }
`;

interface Props {
  reviewImages: {
    id: number;
    url: string;
  }[];
  activeIndex: number;
  handleSlideChange(event: { activeIndex: number }): void;
  reviewImageLength: number;
  onDismiss(): void;
}

export default function EnlargedImageFrame({
  reviewImages,
  activeIndex,
  handleSlideChange,
  reviewImageLength,
  onDismiss,
}: Props) {
  return (
    <DragOverlayWrapper onDrag={onDismiss} overlayStyle={overlayStyle}>
      <Header>
        <CloseButton onClick={onDismiss}>
          <Close width={16} height={16} stroke={COLOR.kurlyWhite} strokeWidth={3} />
        </CloseButton>
        <NumberOfSlides>
          {activeIndex + ACTIVE_INDEX_INCREMENT}/{reviewImageLength}
        </NumberOfSlides>
      </Header>
      <Content>
        <Swiper initialSlide={activeIndex} loop={false} onSlideChange={handleSlideChange}>
          {reviewImages.map((item, index) => (
            <SwiperSlide key={`review-image-${index}`}>
              <ImageWrapper>
                <NextImage src={item.url} alt="review-image" layout="fill" objectFit="contain" />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Content>
    </DragOverlayWrapper>
  );
}
