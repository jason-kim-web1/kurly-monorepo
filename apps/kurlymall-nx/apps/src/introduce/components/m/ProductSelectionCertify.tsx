import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { IntroduceContent } from '../../interfaces';
import IntroduceMoreLink from './IntroduceMoreLink';
import NextImage from '../../../shared/components/NextImage';

const CertifyList = styled.ul`
  font-size: 13px;
`;

const CertifyItem = styled.li`
  padding: 32px 40px;
  border-bottom: 4px solid ${COLOR.bg};

  > div {
    margin-bottom: 18px;
  }
  &:first-of-type {
    padding-top: 20px;
  }
  &:last-of-type {
    border-bottom: 0;
  }
  &:nth-of-type(1) ~ li > div {
    height: 50px;
  }
  &:nth-of-type(2) ~ li > div {
    margin-bottom: 0;
  }
`;

const Text = styled.p`
  padding-bottom: 24px;
`;

const CertifyImage = styled.div`
  position: relative;
  margin: 0 -40px;
  max-width: 375px;
  height: 120px;
`;

interface Props {
  info: IntroduceContent[];
}

export default function ProductSelectionCertify({ info }: Props) {
  return (
    <CertifyList>
      {info.map(({ id, title, text, url, urlText, imgUrlMo }) => (
        <CertifyItem key={id}>
          <strong>{title}</strong>
          <Text>{text}</Text>
          {imgUrlMo && (
            <CertifyImage>
              <NextImage src={imgUrlMo} layout="fill" objectFit="contain" alt="" />
            </CertifyImage>
          )}
          {url && <IntroduceMoreLink url={url} urlText={urlText} />}
        </CertifyItem>
      ))}
    </CertifyList>
  );
}
