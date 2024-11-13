import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';

const CertifyMarkInfo = styled.div`
  display: table;
  width: 100%;
  border: 1px solid ${COLOR.kurlyGray250};
  border-top: 0 none;

  &:first-of-type {
    border-top: 1px solid ${COLOR.kurlyGray250};
  }
  > div {
    display: table-cell;
    vertical-align: middle;
  }
`;

const MarkImage = styled.div`
  width: 75px;
  padding: 10px 0;
  text-align: center;

  > span {
    vertical-align: middle;
  }
`;

const InfoText = styled.div`
  padding: 10px;
  border-left: 1px solid ${COLOR.kurlyGray250};
  font-weight: 300;
  font-size: 12px;
  line-height: 17px;
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

export default function CertifyContent({ imgUrl, imgWidth = 51, imgHeight = 48, title, text }: Props) {
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
