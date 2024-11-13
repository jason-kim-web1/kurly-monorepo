import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { PC_DESIGN_STORY_IMAGE_LIST, PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { DESIGN_STORY_SLIDE_TEXT } from '../../shared/constants/alternativeText';
import SwiperComponent from './SwiperComponent';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  padding-bottom: 100px;
`;

const styles = css`
  width: 950px;

  .navigation button {
    top: 45%;
  }
  .previousButton {
    left: -70px;
  }
  .nextButton {
    right: -80px;
  }
  .swiper-slide img {
    height: 395px;
  }
`;

export default function DesignStorySlide() {
  const slideImages = PC_DESIGN_STORY_IMAGE_LIST.map(({ url, alternativeText }, index) => (
    <NextImage src={url} alt={alternativeText} key={`design-story-${index}`} width={363} height={395} />
  ));
  return (
    <Wrapper>
      <NextImage
        src={`${PC_PURPLE_BOX_URL}img_purplebox_18.jpg`}
        alt={DESIGN_STORY_SLIDE_TEXT}
        width={1900}
        height={353}
      />
      <SwiperComponent items={slideImages} slidesPerView={2.5} slidesPerGroup={1} isNavigation css={styles} />
    </Wrapper>
  );
}
