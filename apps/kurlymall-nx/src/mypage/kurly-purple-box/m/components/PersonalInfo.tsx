import styled from '@emotion/styled';

import NextImage from '../../../../shared/components/NextImage';
import COLOR from '../../../../shared/constant/colorset';
import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { PERSONAL_BOX_GUIDELINE } from '../../shared/constants/userGuideText';

const Contents = styled.div`
  padding: 20px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
`;

const Description = styled.p`
  margin: 12px 0 19px;
  color: ${COLOR.kurlyGray600};
`;

const SubTitle = styled.p`
  margin: 25px 0 16px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 500;
`;

const SubDescription = styled.p`
  font-size: 16px;
  line-height: 22px;
`;

const Emphasis = styled.span`
  color: ${COLOR.kurlyPurple};
`;

const GuidelineWrapper = styled.dl`
  line-height: 20px;
`;

const GuidelineTitle = styled.dt`
  position: relative;
  margin-bottom: 3px;
  font-size: 16px;
  padding-left: 12px;
  font-weight: 500;
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: 3px;
    height: 3px;
    background: ${COLOR.kurlyGray800};
  }
`;

const Guideline = styled.dd`
  color: ${COLOR.kurlyGray450};
  padding: 0 0 17px 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 51vw;
  overflow: hidden;
  border-radius: 5px;
`;

export default function PersonalInfo() {
  return (
    <Contents>
      <Title>
        개인 보냉 박스를
        <br />
        간편하게 이용해보세요.
      </Title>
      <Description>
        개인 보냉 박스를 가지고 계신 분은
        <br />
        이용 신청 후 상품 수령 시 사용 가능합니다.
      </Description>
      <ImageWrapper>
        <NextImage
          src={`${M_PURPLE_BOX_URL}personalbox.jpg`}
          alt="개인 보냉 박스 예시 이미지"
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <SubTitle>신청자격</SubTitle>
      <SubDescription>
        <Emphasis>샛별배송(수도권)</Emphasis> 지역 회원만 이용가능합니다.
      </SubDescription>
      <SubTitle>꼭 읽어주세요.</SubTitle>
      <GuidelineWrapper>
        {PERSONAL_BOX_GUIDELINE.map(({ title, description }, index) => (
          <GuidelineWrapper key={`Personal-Box-Guideline-${index}`}>
            <GuidelineTitle>{title}</GuidelineTitle>
            <Guideline>{description}</Guideline>
          </GuidelineWrapper>
        ))}
      </GuidelineWrapper>
    </Contents>
  );
}
