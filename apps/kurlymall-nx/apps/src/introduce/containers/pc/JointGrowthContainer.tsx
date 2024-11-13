import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { JOINT_GROWTH, JOINT_GROWTH_THUMB } from '../../constants/SubPageContent';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import IntroduceMoreLink from '../../components/pc/IntroduceMoreLink';
import NextImage from '../../../shared/components/NextImage';

const ContentTopInfo = styled.div`
  padding: 80px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray350};
`;

const ContentItem = styled.div`
  padding: 60px 20px;
  border-bottom: 1px solid ${COLOR.bg};
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  color: ${COLOR.kurlyGray700};

  ul {
    padding-left: 10px;
  }
  li {
    position: relative;
    margin-bottom: 20px;
    padding-left: 12px;

    &::before {
      position: absolute;
      top: -1px;
      left: -6px;
      font-size: 35px;
      content: '·';
    }
  }
`;

const ContentTitle = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ContentBottomInfo = styled.div`
  padding-top: 50px;
  background-color: ${COLOR.bg};

  > div {
    width: 1000px;
  }
`;

const ProducerList = styled.ul`
  padding-top: 60px;
`;

const ThumbItem = styled.li`
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid ${COLOR.lightGray};

  &:last-of-type {
    border-bottom: 0;
  }
`;

const ThumbImage = styled.div`
  min-width: 364px;
  height: 200px;
`;

const InfoText = styled.div`
  padding-left: 55px;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
`;

const ThumbTitle = styled.strong`
  display: block;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 20px;
`;

export default function JointGrowthContainer() {
  return (
    <>
      <IntroduceContentWrap paddingTop={0}>
        <IntroduceImageBox imageUrl={INTRODUCE_IMAGE_URL.jointGrowthMain} height={280} />
        <ContentTopInfo>
          <IntroduceTitle marginBottom={28} fontWeight={500} fontSize={28}>
            상품이 최선의 방식으로 유통될 수 있도록
            <br />
            다양한 영역에서 생산자를 지원합니다
          </IntroduceTitle>
          <IntroduceText fontSize={20}>
            컬리는 생산자, 판매자, 소비자 간의 상생이 불러일으키는 선순환의 힘을 믿습니다.
            <br />
            그래서 생산자와 건강한 협력 관계를 맺고 장기적으로 함께 성장할 수 있도록 최선을 다하고 있습니다.
          </IntroduceText>
        </ContentTopInfo>
        {JOINT_GROWTH.map(({ id, title, text, urlText, url }) => (
          <ContentItem key={id}>
            <ContentTitle>{title}</ContentTitle>
            <RawHTML html={text} />
            {url && <IntroduceMoreLink url={url} urlText={urlText} marginLeft={20} />}
          </ContentItem>
        ))}
        <NextImage src={INTRODUCE_IMAGE_URL.jointGrowthSub} width={1050} height={320} alt="" />
      </IntroduceContentWrap>
      <ContentBottomInfo>
        <IntroduceContentWrap>
          <IntroduceTitle marginBottom={22} fontWeight={500} fontSize={22}>
            컬리와 함께 성장 중인 생산자를 소개합니다
          </IntroduceTitle>
          <IntroduceText fontSize={20}>
            컬리의 기준과 지향점에 공감하며 함께 성장 중인 생산자분들의 이야기를 확인해보세요. 컬리는 생산자의 입장에서
            생각하고,
            <br />
            긴밀하게 소통하며 함께 더 좋은 상품을 개발하기 위해 노력합니다.
          </IntroduceText>
          <ProducerList>
            {JOINT_GROWTH_THUMB.map(({ id, title, text, imgUrl }) => (
              <ThumbItem key={id}>
                <ThumbImage>{imgUrl && <NextImage src={imgUrl} width={364} height={200} alt="" />}</ThumbImage>
                <InfoText>
                  <ThumbTitle>{title}</ThumbTitle>
                  {text}
                </InfoText>
              </ThumbItem>
            ))}
          </ProducerList>
        </IntroduceContentWrap>
      </ContentBottomInfo>
    </>
  );
}
