import Link from 'next/link';

import styled from '@emotion/styled';

import {
  INTRODUCE_IMAGE_URL,
  SUSTAINABLE_DISTRIBUTION_SUBTEXT,
  SUSTAINABLE_DISTRIBUTION_TEXT,
  SUSTAINABLE_DISTRIBUTION_THUMB,
  SUSTAINABLE_DISTRIBUTION_TITLE,
} from '../../constants';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import COLOR from '../../../shared/constant/colorset';

import NextImage from '../../../shared/components/NextImage';

const IntroText = styled.div`
  padding: 40px 24px;
  line-height: 22px;
`;

const CycleImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 222px;
  margin: 40px auto;
`;

const Title = styled.h3`
  font-size: 19px;
  padding: 40px 0 32px 24px;
  background-color: ${COLOR.bg};
`;

const ThumbnailList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
  padding: 0 18px 80px;
  background-color: ${COLOR.bg};
`;

const Item = styled.li`
  min-width: 50%;
  padding: 6px;
`;

const InnerLink = styled.a`
  font-size: 16px;
  line-height: 30px;
`;

const ThumbImage = styled.div`
  overflow: hidden;
  position: relative;
  height: 44vw;
  border-radius: 4px;
`;

export default function SustainableDistributionContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.sustainableMainMo}
        text={'컬리의 지속 가능한 유통은'}
        subText={'건강한 선순환 구조를 만드는 일입니다'}
      />
      <IntroText>
        {SUSTAINABLE_DISTRIBUTION_TEXT}
        <CycleImage>
          <NextImage
            src={INTRODUCE_IMAGE_URL.cycleImageMo}
            objectFit="cover"
            layout="fill"
            alt="환경, 사람, 상품 균혈을 통한 장기적 선순환"
          />
        </CycleImage>
        {SUSTAINABLE_DISTRIBUTION_SUBTEXT}
      </IntroText>
      <Title>{SUSTAINABLE_DISTRIBUTION_TITLE}</Title>
      <ThumbnailList>
        {SUSTAINABLE_DISTRIBUTION_THUMB.map(({ id, text, subText, url, imgUrlMo }) => (
          <Item key={id}>
            <Link href={url} passHref>
              <InnerLink href={url}>
                <ThumbImage>
                  <NextImage src={imgUrlMo} objectFit="cover" layout="fill" alt={`${text}${subText}`} />
                </ThumbImage>
              </InnerLink>
            </Link>
          </Item>
        ))}
      </ThumbnailList>
    </>
  );
}
