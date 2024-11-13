import styled from '@emotion/styled';

import Link from 'next/link';

import { ABOUT_KURLY, ABOUT_KURLY_LIST } from '../../constants';

import COLOR from '../../../shared/constant/colorset';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import ArrowIcon from '../../components/shared/ArrowIcon';
import RecruitIcon from '../../components/shared/RecruitIcon';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div`
  padding-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  width: 1050px;
  margin: 0 auto 40px;
`;

const ThumbnailImage = styled.div`
  position: relative;
  min-width: 364px;
  height: 200px;
  background-color: ${COLOR.bg};
  align-items: center;
`;

const AboutInfo = styled.div`
  padding-left: 50px;
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 15px;
  border-bottom: 1px solid ${COLOR.lightGray};
  font-weight: 500;
  font-size: 20px;
  color: ${COLOR.kurlyPurple};
`;

const Text = styled.p`
  padding: 15px 0 20px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
`;

const InnerLink = styled.a`
  display: flex;
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
`;

export default function AboutKurlyContainer() {
  return (
    <Container>
      {ABOUT_KURLY.map(({ id, imgUrl, title, text }) => (
        <div key={id}>
          <IntroduceImageBox imageUrl={imgUrl} height={400} fontSize={32} />
          <IntroduceContentWrap>
            <IntroduceTitle align={'center'} fontWeight={500} fontSize={34} marginBottom={40}>
              {title}
            </IntroduceTitle>
            <IntroduceText fontSize={18} align={'justify'}>
              <RawHTML html={text} />
            </IntroduceText>
          </IntroduceContentWrap>
        </div>
      ))}
      {ABOUT_KURLY_LIST.map(({ id, title, text, urlText, url, imgUrl, isExternalLink }) => (
        <div key={id}>
          {imgUrl && url && (
            <InfoItem>
              <ThumbnailImage>
                <NextImage src={imgUrl} width="364" height="200" alt="" />
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
