import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { PC_GUIDE_IMAGE_LIST, PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { GUIDE_SLIDE_TEXT } from '../../shared/constants/alternativeText';
import SwiperComponent from './SwiperComponent';
import GuideSlideAlternativeText from '../../shared/components/GuideSlideAlternativeText';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  background: #f4f1fb;
  padding-bottom: 100px;
`;

const styles = css`
  .navigation button {
    background-size: 14px auto;
    background-position-y: center;
    top: 91%;
  }
  .previousButton {
    left: 77%;
  }
  .nextButton {
    right: 10%;
  }
`;

export default function GuideSlide() {
  const slideImages = PC_GUIDE_IMAGE_LIST.map((url, index) => (
    <NextImage src={url} alt={`guide ${index}`} key={`guide-${index}`} width={960} height={660} />
  ));
  return (
    <Wrapper>
      <NextImage src={`${PC_PURPLE_BOX_URL}img_purplebox_15.jpg`} alt={GUIDE_SLIDE_TEXT} width={1900} height={404} />
      <SwiperComponent items={slideImages} slidesPerView={1} isLoop isNavigation isIndicator autoplay css={styles} />
      <GuideSlideAlternativeText />
    </Wrapper>
  );
}
