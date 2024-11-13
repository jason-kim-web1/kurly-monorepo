import Link from 'next/link';

import styled from '@emotion/styled';

import { ABOUT_KURLY, ABOUT_KURLY_LIST } from '../../constants';

import COLOR from '../../../shared/constant/colorset';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/m/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import RecruitIcon from '../../components/shared/RecruitIcon';
import ArrowIcon from '../../components/shared/ArrowIcon';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div`
  padding-bottom: 20px;
`;

const InfoItem = styled.div`
  margin: 0 18px 15px;
  font-size: 12px;
  line-height: 18px;
  box-shadow: 0 0 20px 0 ${COLOR.kurlyGray250};
`;

const ThumbnailImage = styled.div`
  position: relative;
  height: 21.2vw;
  border-top: 1px solid ${COLOR.kurlyPurple};
  background-color: ${COLOR.bg};
`;

const AboutInfo = styled.div`
  padding: 0 15px 20px;
`;

const Title = styled.strong`
  display: block;
  padding-top: 13px;
  font-weight: 700;
  font-size: 14px;
`;

const Text = styled.p`
  padding: 10px 0;
  font-weight: 300;
`;

const InnerLink = styled.a`
  display: flex;
  font-weight: 700;
  color: ${COLOR.kurlyPurple};
`;

export default function AboutKurlyContainer() {
  return (
    <Container>
      {ABOUT_KURLY.map(({ id, imgUrlMo, title, text }) => (
        <div key={id}>
          <IntroduceImageBox imageUrl={imgUrlMo} height={124} />
          <IntroduceContentWrap>
            <IntroduceTitle align={'center'} fontSize={20} marginBottom={20}>
              {title}
            </IntroduceTitle>
            <IntroduceText>
              <RawHTML html={text} />
            </IntroduceText>
          </IntroduceContentWrap>
        </div>
      ))}
      {ABOUT_KURLY_LIST.map(({ id, title, text, urlText, url, imgUrlMo, isExternalLink }) => (
        <div key={id}>
          {imgUrlMo && url && (
            <InfoItem>
              <ThumbnailImage>
                <NextImage src={imgUrlMo} layout="fill" objectFit="cover" alt="" />
              </ThumbnailImage>
              <AboutInfo>
                <Title>{title}</Title>
                <Text>{text}</Text>
                <Link href={url} passHref>
                  <InnerLink href={url} target={isExternalLink ? '_blank' : '_self'}>
                    {urlText}
                    {isExternalLink ? <RecruitIcon /> : <ArrowIcon />}
                  </InnerLink>
                </Link>
              </AboutInfo>
            </InfoItem>
          )}
        </div>
      ))}
    </Container>
  );
}
