import styled from '@emotion/styled';

import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { HISTORY_SLIDE_TEXT } from '../../shared/constants/alternativeText';

import NextImage from '../../../../shared/components/NextImage';

const SlideWrapper = styled.div`
  overflow-x: scroll;
  padding: 0 0 18vw 8vw;
  background-color: #f5f1fc;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 78vw;
`;

const Slide = styled.div`
  width: 380vw;
`;

export default function HistorySlide() {
  return (
    <>
      <ImageWrapper>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_17.jpg`}
          alt={HISTORY_SLIDE_TEXT}
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <SlideWrapper>
        <Slide>
          <img src={`${M_PURPLE_BOX_URL}history_scroll_v4.jpg`} alt="history" />
        </Slide>
      </SlideWrapper>
    </>
  );
}
