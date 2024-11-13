import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

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
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import SocialSwiper from '../../components/pc/SocialSwiper';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div`
  padding-bottom: 60px;
`;

const ContentTopInfo = styled.div`
  padding: 80px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray350};
`;

const ForestProject = styled.div`
  padding: 46px 20px 0;
`;

const ForestInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const ForestInfo = styled.div`
  width: 545px;

  .box {
    margin-top: 43px;
    padding-top: 35px;
    border-top: 1px solid ${COLOR.kurlyGray350};
  }
  strong {
    font-weight: 500;
    font-size: 20px;
    color: ${COLOR.kurlyPurple};
  }
  ul {
    padding-top: 27px;
  }
  li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 14px;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;

    &::before {
      position: absolute;
      top: -1px;
      left: -6px;
      font-size: 35px;
      content: '·';
    }
  }
  p {
    padding-top: 10px;
    font-size: 16px;
    color: ${COLOR.kurlyGray600};
  }
`;

const ForestThumb = styled.div`
  height: 270px;
`;

const HistoryItem = styled.div`
  margin-bottom: 11px;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;

  > div {
    display: flex;
  }
  strong {
    min-width: 286px;
    font-weight: 500;
  }
  .bar {
    margin: 0 8px;
  }
  .text {
    padding-right: 16px;
  }
`;

const SwiperWrap = styled.div`
  margin-bottom: 50px;

  .swiper-slide {
    width: 500px;
  }
`;

export default function SocialContributionContainer() {
  return (
    <Container>
      <IntroduceContentWrap paddingTop={0} paddingBottom={90}>
        <IntroduceImageBox imageUrl={INTRODUCE_IMAGE_URL.socialMain} height={280} />
        <ContentTopInfo>
          <IntroduceTitle marginBottom={28} fontWeight={500} fontSize={28}>
            우리 모두의 삶의 질을 높이기 위해
            <br />
            사회적 책임을 다합니다
          </IntroduceTitle>
          <IntroduceText fontSize={20}>
            컬리는 법령과 윤리를 준수하고, 컬리가 속한 사회에 긍정적으로 기여하기 위해 지속적으로 노력할 것입니다.
          </IntroduceText>
        </ContentTopInfo>
        <ForestProject>
          <IntroduceTitle marginBottom={16} fontWeight={500} fontSize={23}>
            교실 숲 조성 프로젝트
          </IntroduceTitle>
          <ForestInfoBox>
            <ForestInfo>
              <IntroduceText fontSize={18}>
                <RawHTML html={CLASSROOM_FOREST_TEXT} />
              </IntroduceText>
            </ForestInfo>
            <ForestThumb>
              <NextImage src={INTRODUCE_IMAGE_URL.socialSub1} width={395} height={270} alt="" />
            </ForestThumb>
          </ForestInfoBox>
          <IntroduceTitle marginBottom={25} fontWeight={500} fontSize={24}>
            교실 숲 조성 현황
          </IntroduceTitle>
          {CLASSROOM_FOREST_LIST.map(({ id, text }) => (
            <HistoryItem key={id}>
              <RawHTML html={text} />
            </HistoryItem>
          ))}
        </ForestProject>
      </IntroduceContentWrap>
      <SwiperWrap>
        <SocialSwiper thumbList={CLASSROOM_FOREST_THUMB} />
      </SwiperWrap>
      <IntroduceContentWrap paddingTop={0}>
        <ForestProject>
          <IntroduceTitle marginBottom={16} fontWeight={500} fontSize={23}>
            샛별숲 키우기 프로젝트
          </IntroduceTitle>
          <ForestInfoBox>
            <ForestInfo>
              <IntroduceText fontSize={18}>
                <RawHTML html={STAR_FOREST_TEXT} />
              </IntroduceText>
            </ForestInfo>
            <ForestThumb>
              <NextImage src={INTRODUCE_IMAGE_URL.socialSub2} width={395} height={270} alt="" />
            </ForestThumb>
          </ForestInfoBox>
          <IntroduceTitle marginBottom={25} fontWeight={500} fontSize={24}>
            샛별숲 조성 현황
          </IntroduceTitle>
          {STAR_FOREST_LIST.map(({ id, text }) => (
            <HistoryItem key={id}>
              <RawHTML html={text} />
            </HistoryItem>
          ))}
        </ForestProject>
      </IntroduceContentWrap>
      <SwiperWrap>
        <SocialSwiper thumbList={STAR_FOREST_THUMB} />
      </SwiperWrap>
    </Container>
  );
}
