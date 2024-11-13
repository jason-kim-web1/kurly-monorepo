import styled from '@emotion/styled';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import {
  CLASSROOM_FOREST_LIST,
  CLASSROOM_FOREST_TEXT,
  CLASSROOM_FOREST_THUMB,
  STAR_FOREST_LIST,
  STAR_FOREST_TEXT,
  STAR_FOREST_THUMB,
} from '../../constants/SubPageContent';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import SocialSwiper from '../../components/m/SocialSwiper';
import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div`
  padding-bottom: 35px;
`;

const ContentInfoWrap = styled.div`
  padding: 40px 24px 32px;

  .box {
    margin: 20px 0 40px;
    padding: 17px 16px 18px;
    border: 1px solid ${COLOR.kurlyGray350};
  }
  .box strong {
    font-size: 13px;
    color: ${COLOR.kurlyPurple};
  }
  ul {
    padding-top: 10px;
  }
  li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 8px;
    line-height: 22px;

    &::before {
      position: absolute;
      top: -1px;
      left: -2px;
      font-size: 30px;
      content: '·';
    }
  }
  p {
    padding-top: 6px;
    font-size: 12px;
    color: ${COLOR.kurlyGray600};
  }
`;

const ThumbImage = styled.div`
  position: relative;
  margin: 38px 0;
  height: 53.6vw;
`;

const HistoryItem = styled.div`
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 22px;

  &:last-of-type {
    margin-bottom: 10px;
  }
  .bar {
    margin: 0 5px;
  }
`;

const SwiperWrap = styled.div`
  position: relative;

  .swiper-slide {
    width: 80%;
  }
`;

const Line = styled.div`
  height: 1px;
  margin-top: 40px;
  background-color: ${COLOR.bg};
`;

export default function SocialContributionContainer() {
  return (
    <Container>
      <ContentInfoWrap>
        <IntroduceTitle marginBottom={24} fontSize={19}>
          우리 모두의 삶의 질을 높이기 위해
          <br />
          사회적 책임을 다합니다
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          컬리는 법령과 윤리를 준수하고, 컬리가 속한 사회에 긍정적으로 기여하기 위해 지속적으로 노력할 것입니다.
        </IntroduceText>
      </ContentInfoWrap>
      <IntroduceImageBox height={220} imageUrl={INTRODUCE_IMAGE_URL.socialMainMo} />
      <ContentInfoWrap>
        <IntroduceTitle marginBottom={14} fontSize={16}>
          교실 숲 조성 프로젝트
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          <RawHTML html={CLASSROOM_FOREST_TEXT} />
        </IntroduceText>
        <ThumbImage>
          <NextImage src={INTRODUCE_IMAGE_URL.socialSubMo1} layout="fill" objectFit="cover" alt="" />
        </ThumbImage>

        <IntroduceTitle marginBottom={14} fontSize={16}>
          교실 숲 조성 현황
        </IntroduceTitle>
        {CLASSROOM_FOREST_LIST.map(({ id, text }) => (
          <HistoryItem key={id}>
            <RawHTML html={text} />
          </HistoryItem>
        ))}
      </ContentInfoWrap>
      <SwiperWrap>
        <SocialSwiper thumbList={CLASSROOM_FOREST_THUMB} />
      </SwiperWrap>
      <Line />
      <ContentInfoWrap>
        <IntroduceTitle marginBottom={14} fontSize={16}>
          샛별숲 키우기 프로젝트
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          <RawHTML html={STAR_FOREST_TEXT} />
        </IntroduceText>
        <IntroduceTitle marginBottom={14} fontSize={16}>
          샛별숲 조성 현황
        </IntroduceTitle>
        {STAR_FOREST_LIST.map(({ id, text }) => (
          <HistoryItem key={id}>
            <RawHTML html={text} />
          </HistoryItem>
        ))}
      </ContentInfoWrap>
      <SwiperWrap>
        <SocialSwiper thumbList={STAR_FOREST_THUMB} />
      </SwiperWrap>
    </Container>
  );
}
