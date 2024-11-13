import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { M_GUIDE_IMAGE_LIST, M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { GUIDE_SLIDE_TEXT } from '../../shared/constants/alternativeText';
import SwiperComponent from './SwiperComponent';
import GuideSlideAlternativeText from '../../shared/components/GuideSlideAlternativeText';
import NextImage from '../../../../shared/components/NextImage';

const ImageWrapper = styled.div<{ height: number }>`
  position: relative;
  ${({ height }) => height && `height: ${height}vw`};
`;

const styles = css`
  .navigation button {
    background-size: 12px auto;
    background-position-y: center;
    top: 101vw;
  }
  .previousButton {
    left: 30%;
  }
  .nextButton {
    right: 30%;
  }
`;

export default function GuideSlide() {
  const slideImages = M_GUIDE_IMAGE_LIST.map((url, index) => (
    <ImageWrapper height={136} key={`guide-${index}`}>
      <NextImage src={url} alt={`guide ${index}`} layout="fill" objectFit="cover" />
    </ImageWrapper>
  ));
  return (
    <>
      <ImageWrapper height={57}>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_15.jpg`}
          alt={GUIDE_SLIDE_TEXT}
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <SwiperComponent items={slideImages} slidesPerView={1} isLoop isNavigation isIndicator autoplay css={styles} />
      <GuideSlideAlternativeText />
    </>
  );
}
