import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import {
  INTRODUCE_IMAGE_URL,
  SUSTAINABLE_DISTRIBUTION_TITLE,
  SUSTAINABLE_DISTRIBUTION_TEXT,
  SUSTAINABLE_DISTRIBUTION_SUBTEXT,
  SUSTAINABLE_DISTRIBUTION_THUMB,
} from '../../constants';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div`
  padding-bottom: 60px;
`;

const ContentBox = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const IntroText = styled.div`
  margin-bottom: 80px;
  padding: 60px 121px 100px;
  border-bottom: 1px solid ${COLOR.bg};
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  text-align: justify;
`;

const CycleImage = styled.div`
  width: 250px;
  margin: 90px auto 60px;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 40px;
`;

const ThumbnailList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li`
  min-width: 248px;
  height: 254px;
  box-shadow: 0 8px 16px 1px ${COLOR.bg};
`;

const InnerLink = styled.a`
  font-size: 16px;
  line-height: 30px;
`;

const ThumbImage = styled.div`
  position: relative;
  height: 168px;
`;

const Text = styled.div`
  padding: 10px 20px 0;
`;

const EmphText = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 20px;
`;

export default function SustainableDistributionContainer() {
  return (
    <Container>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.sustainableMain}
        height={240}
        fontSize={32}
        text={'컬리의 지속 가능한 유통은'}
        subText={'건강한 선순환 구조를 만드는 일입니다'}
      />
      <ContentBox>
        <IntroText>
          {SUSTAINABLE_DISTRIBUTION_TEXT}
          <CycleImage>
            <NextImage
              src={INTRODUCE_IMAGE_URL.cycleImage}
              width={250}
              height={262}
              alt="환경, 사람, 상품 균혈을 통한 장기적 선순환"
            />
          </CycleImage>
          {SUSTAINABLE_DISTRIBUTION_SUBTEXT}
        </IntroText>
        <Title>{SUSTAINABLE_DISTRIBUTION_TITLE}</Title>
        <ThumbnailList>
          {SUSTAINABLE_DISTRIBUTION_THUMB.map(({ id, text, subText, url, imgUrl }) => (
            <Item key={id}>
              <Link href={url} passHref>
                <InnerLink href={url}>
                  <ThumbImage>
                    <NextImage src={imgUrl} layout="fill" alt="" />
                  </ThumbImage>
                  <Text>
                    {text}
                    <EmphText>{subText}</EmphText>
                  </Text>
                </InnerLink>
              </Link>
            </Item>
          ))}
        </ThumbnailList>
      </ContentBox>
    </Container>
  );
}
