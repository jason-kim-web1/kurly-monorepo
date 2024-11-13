import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';

const CertifyMarkInfo = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${COLOR.kurlyGray250};
  border-top: 0 none;

  &:first-of-type {
    border-top: 1px solid ${COLOR.kurlyGray250};
  }
`;

const MarkImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 106px;
  min-height: 88px;
  border-right: 1px solid ${COLOR.kurlyGray250};
  text-align: center;
`;

const InfoText = styled.div`
  padding: 10px 20px;
  font-weight: 300;
  line-height: 22px;
`;

const Title = styled.strong`
  display: block;
  font-weight: 500;
`;

interface Props {
  imgUrl: string;
  imgWidth?: number;
  imgHeight?: number;
  title: string;
  text: string;
}

export default function CertifyContent({ imgUrl, imgWidth = 64, imgHeight = 60, title, text }: Props) {
  return (
    <CertifyMarkInfo>
      <MarkImage>
        <NextImage src={imgUrl} width={imgWidth} height={imgHeight} alt="" />
      </MarkImage>
      <InfoText>
        <Title>{title}</Title>
        {text}
      </InfoText>
    </CertifyMarkInfo>
  );
}
