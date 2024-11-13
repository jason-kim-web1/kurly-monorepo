import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import ShareButton from './ShareButton';

const Container = styled.div`
  margin-bottom: 12px;
  overflow-wrap: break-word;
`;

const DeliveryTypeName = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray450};
  margin-bottom: 6px;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const Title = styled.h2`
  width: calc(100% - 58px);
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: ${COLOR.kurlyGray800};
`;

const ShortDescription = styled.p`
  width: calc(100% - 58px);
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${COLOR.kurlyGray400};
`;

interface Props {
  contentsProductNo: number;
  deliveryName: string;
  name: string;
  shortDescription: string;
}

export default function Name({ contentsProductNo, deliveryName, name, shortDescription }: Props) {
  return (
    <Container>
      <DeliveryTypeName>{deliveryName}</DeliveryTypeName>
      <TitleWrapper>
        <Title>{name}</Title>
        <ShareButton contentsProductNo={contentsProductNo} />
      </TitleWrapper>
      <ShortDescription>{shortDescription}</ShortDescription>
    </Container>
  );
}
