import styled from '@emotion/styled';

import PersonalBox from '../components/PersonalBox';
import { PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import KurlyPurpleBox from '../components/KurlyPurpleBox';
import { MAIN_IMAGE_TEXT } from '../../shared/constants/alternativeText';
import Guideline from '../components/Guideline';
import GuideSlide from '../components/GuideSlide';
import HistorySlide from '../components/HistorySlide';
import DesignStorySlide from '../components/DesignStorySlide';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1050px;
  @media (min-width: 1050px) {
    overflow: hidden;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  min-width: 1900px;
  text-align: center;
`;

const MainImage = styled.div`
  background: #3c214c;
  font-size: 0;
`;

export default function KurlyPurpleBoxContainer() {
  return (
    <Wrapper>
      <InnerWrapper>
        <MainImage>
          {[
            { number: 13, height: 872 },
            { number: 14, height: 582 },
          ].map(({ number, height }) => (
            <NextImage
              key={number}
              src={`${PC_PURPLE_BOX_URL}img_purplebox_${number}.jpg`}
              alt={MAIN_IMAGE_TEXT}
              width={1900}
              height={height}
            />
          ))}
        </MainImage>
        <GuideSlide />
        <KurlyPurpleBox />
        <HistorySlide />
        <DesignStorySlide />
        <PersonalBox />
        <Guideline />
      </InnerWrapper>
    </Wrapper>
  );
}
