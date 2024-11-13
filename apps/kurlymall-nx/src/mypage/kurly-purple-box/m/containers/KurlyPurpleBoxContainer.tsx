import styled from '@emotion/styled';

import PersonalBox from '../components/PersonalBox';

import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { MAIN_IMAGE_TEXT } from '../../shared/constants/alternativeText';
import KurlyPurpleBox from '../components/KurlyPurpleBox';
import Guideline from '../components/Guideline';
import DesignStorySlide from '../components/DesignStorySlide';
import HistorySlide from '../components/HistorySlide';
import GuideSlide from '../components/GuideSlide';
import NextImage from '../../../../shared/components/NextImage';

const ImageWrapper = styled.div<{ height: number }>`
  position: relative;
  height: ${({ height }) => height}vw;
`;

export default function KurlyPurpleBoxContainer() {
  return (
    <>
      <ImageWrapper height={144}>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_13.jpg`}
          alt={MAIN_IMAGE_TEXT}
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </ImageWrapper>
      <ImageWrapper height={131}>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_14.jpg`}
          alt=""
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </ImageWrapper>
      <GuideSlide />
      <KurlyPurpleBox />
      <HistorySlide />
      <DesignStorySlide />
      <PersonalBox />
      <Guideline />
    </>
  );
}
