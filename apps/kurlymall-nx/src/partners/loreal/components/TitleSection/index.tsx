import styled from '@emotion/styled';

import { RESOURCE_URL } from '../../../../shared/configs/config';

import ColorSet from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { BASE_BREAK_POINT } from '../../constants';
import { useMatchMedia } from '../../../../shared/hooks/useMatchMedia';

const Section = styled.section`
  padding-top: 30px;
  margin-bottom: 24px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding-top: 60px;
    margin-bottom: 36px;
  }
`;

const KeyVisualWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const KeyVisualImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 67.2%;
  padding-bottom: 37%;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    width: 56.25%;
    padding-bottom: 30.805%;
  }
`;

const TitleContentWrap = styled.div`
  padding: 0 30px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  line-height: 36px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    line-height: 40px;
    text-align: center;
  }
`;

const TitleText = styled.span`
  font-weight: 700;
  font-size: 32px;
  color: ${ColorSet.kurlyGray800};
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    font-weight: 500;
  }
`;

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${ColorSet.kurlyGray450};
  text-align: left;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    font-weight: 400;
    text-align: center;
    letter-spacing: -0.5px;
  }
`;

const PointText = styled.span`
  color: ${ColorSet.partnersPurple};
`;

const ActionSection = () => {
  const isBreakPoint = useMatchMedia(`screen and (max-width: ${BASE_BREAK_POINT}px)`);
  return (
    <Section>
      <KeyVisualWrap>
        <KeyVisualImageWrap>
          <NextImage
            src={`${RESOURCE_URL}/images/thirdparty-logo/logo_mybeautybox.png`}
            layout="fill"
            objectFit="contain"
            disableImageDrag
          />
        </KeyVisualImageWrap>
      </KeyVisualWrap>
      <TitleContentWrap>
        <Title>
          <TitleText>마이뷰티박스 멤버십{isBreakPoint ? <br /> : null} 회원 연동</TitleText>
        </Title>
        <SubTitle>
          <PointText>컬리에서 로레알 브랜드 상품</PointText>을{isBreakPoint ? <br /> : null} 구매하시면
          {!isBreakPoint ? <br /> : ' '}
          마이뷰티박스 멤버십 포인트를{isBreakPoint ? <br /> : null} 적립해드립니다.
        </SubTitle>
      </TitleContentWrap>
    </Section>
  );
};

export default ActionSection;
