// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { JOINT_GROWTH, JOINT_GROWTH_THUMB } from '../../constants/SubPageContent';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import IntroduceMoreLink from '../../components/m/IntroduceMoreLink';
import ScreenOut from '../../../shared/components/Pagination/ScreenOut';
import NextImage from '../../../shared/components/NextImage';

const ContentInfoWrap = styled.div`
  padding: 40px 24px 32px;
`;

const ContentList = styled.div`
  padding-top: 48px;
`;

const ContentItem = styled.div`
  padding: 0 24px 40px;
  font-size: 13px;
  line-height: 22px;
  color: ${COLOR.kurlyGray700};

  ul {
    padding-left: 5px;
  }
  li {
    position: relative;
    margin-bottom: 24px;
    padding-left: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
    &::before {
      position: absolute;
      top: -1px;
      left: -2px;
      font-size: 30px;
      content: '·';
    }
  }
`;

const LinkWrap = styled.div`
  margin-top: 20px;
`;

const ContentTitle = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
`;

const SubImage = styled.div`
  position: relative;
  height: 53.4vw;
`;

const ContentBottomInfo = styled.div`
  margin-bottom: -8px;
  padding-bottom: 50px;
  background-color: ${COLOR.bg};

  .swiper {
    padding-bottom: 15px;
  }
  .swiper-slide {
    width: 94%;
    margin-right: -38px;

    &:last-of-type {
      margin-right: 0;
    }
  }
  .swiper-pagination-bullets {
    bottom: 0;
  }
  .swiper-pagination-bullet-active {
    background-color: ${COLOR.kurlyPurple};
  }
`;

const SwiperImage = styled.div`
  position: relative;
  height: 112vw;
`;

export default function JointGrowthContainer() {
  return (
    <>
      <ContentInfoWrap>
        <IntroduceTitle marginBottom={24} fontSize={19}>
          상품이 최선의 방식으로
          <br />
          유통될 수 있도록 다양한 영역에서
          <br />
          생산자를 지원합니다
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          컬리는 생산자, 판매자, 소비자 간의 상생이 불러일으키는 선순환의 힘을 믿습니다. 그래서 생산자와 건강한 협력
          관계를 맺고 장기적으로 함께 성장할 수 있도록 최선을 다하고 있습니다.
        </IntroduceText>
      </ContentInfoWrap>
      <IntroduceImageBox height={220} imageUrl={INTRODUCE_IMAGE_URL.jointGrowthMainMo} />
      <ContentList>
        {JOINT_GROWTH.map(({ id, title, text, urlText, url }) => (
          <ContentItem key={id}>
            <ContentTitle>{title}</ContentTitle>
            <RawHTML html={text} />
            {url && (
              <LinkWrap>
                <IntroduceMoreLink url={url} urlText={urlText} marginLeft={18} />
              </LinkWrap>
            )}
          </ContentItem>
        ))}
      </ContentList>
      <SubImage>
        <NextImage src={INTRODUCE_IMAGE_URL.jointGrowthSubMo} layout="fill" objectFit="cover" alt="" />
      </SubImage>
      <ContentBottomInfo>
        <ContentInfoWrap>
          <IntroduceTitle marginBottom={18} fontSize={16}>
            컬리와 함께 성장 중인 생산자를 소개합니다
          </IntroduceTitle>
          <IntroduceText fontWeight={400}>
            컬리의 기준과 지향점에 공감하며 함께 성장 중인 생산자 분들의 이야기를 확인해보세요. 컬리는 생산자의 입장에서
            생각하고, 긴밀하게 소통하며 함께 더 좋은 상품을 개발하기 위해 노력합니다.
          </IntroduceText>
        </ContentInfoWrap>
        <Swiper slidesPerView={'auto'} pagination={{ clickable: true }} modules={[Pagination]} loop={false}>
          {JOINT_GROWTH_THUMB.map(({ id, title, text, imgUrlMo }) => (
            <SwiperSlide key={id}>
              {imgUrlMo && (
                <SwiperImage>
                  <NextImage src={imgUrlMo} layout="fill" objectFit="cover" alt={title} />
                </SwiperImage>
              )}
              <ScreenOut>{text}</ScreenOut>
            </SwiperSlide>
          ))}
        </Swiper>
      </ContentBottomInfo>
    </>
  );
}
