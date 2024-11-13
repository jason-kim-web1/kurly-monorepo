import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { IntroduceContent } from '../../interfaces';
import IntroduceMoreLink from './IntroduceMoreLink';
import NextImage from '../../../shared/components/NextImage';

const CertifyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 48px;
  border-bottom: 1px solid ${COLOR.kurlyGray350};
`;

const CertifyItem = styled.li`
  flex: 1;
  min-width: 50%;
  padding: 0 40px 40px 20px;
  border-bottom: 1px solid ${COLOR.bg};

  &:nth-of-type(even) {
    padding-left: 40px;
    border-left: 1px solid ${COLOR.bg};
  }
  &:nth-of-type(2) ~ li {
    padding-top: 50px;
    border-bottom: 0;

    > div {
      height: 64px;
      margin-top: 20px;
    }
  }
`;

const Title = styled.strong`
  font-weight: 500;
  font-size: 20px;
`;

const Text = styled.p`
  padding: 18px 0;
`;

const CertifyImage = styled.div`
  position: relative;
  margin-top: 40px;
  width: 460px;
  height: 150px;
`;

interface Props {
  info: IntroduceContent[];
}

export default function ProductSelectionCertify({ info }: Props) {
  return (
    <CertifyList>
      {info.map(({ id, title, text, url, urlText, imgUrl }) => (
        <CertifyItem key={id}>
          <Title>{title}</Title>
          <Text>{text}</Text>
          {url && <IntroduceMoreLink url={url} urlText={urlText} />}
          {imgUrl && (
            <CertifyImage>
              <NextImage src={imgUrl} layout="fill" objectFit="contain" alt="" />
            </CertifyImage>
          )}
        </CertifyItem>
      ))}
    </CertifyList>
  );
}
