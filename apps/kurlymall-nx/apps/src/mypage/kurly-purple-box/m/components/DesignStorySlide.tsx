import styled from '@emotion/styled';

import { M_DESIGN_STORY_IMAGE_LIST, M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { DESIGN_STORY_SLIDE_TEXT } from '../../shared/constants/alternativeText';
import SwiperComponent from './SwiperComponent';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  padding-bottom: 15vw;
`;

const ImageWrapper = styled.div<{ height: number }>`
  position: relative;
  ${({ height }) => height && `height: ${height}vw`};
`;

export default function DesignStorySlide() {
  const slideImages = M_DESIGN_STORY_IMAGE_LIST.map(({ url, alternativeText }, index) => (
    <ImageWrapper height={62} key={`design-story-${index}`}>
      <NextImage src={url} alt={alternativeText} layout="fill" objectFit="cover" />
    </ImageWrapper>
  ));
  return (
    <Wrapper>
      <ImageWrapper height={63}>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_19.jpg`}
          alt={DESIGN_STORY_SLIDE_TEXT}
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <SwiperComponent
        items={slideImages}
        slidesPerView={1.4}
        slidesPerGroup={1}
        slidesOffsetAfter={50}
        slidesOffsetBefore={50}
        spaceBetween={15}
      />
    </Wrapper>
  );
}
