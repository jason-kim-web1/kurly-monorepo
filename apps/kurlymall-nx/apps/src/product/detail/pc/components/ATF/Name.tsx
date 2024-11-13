import styled from '@emotion/styled';

import ShareButton from './share/ShareButton';

import COLOR from '../../../../../shared/constant/colorset';
import { isNotEmpty } from '../../../../../shared/utils/lodash-extends';

const DeliveryTypeName = styled.div`
  font-weight: 500;
  line-height: 19px;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray450};
  margin-bottom: 6px;
  width: 500px;
`;

const ProductNameWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
`;

const Title = styled.h1`
  width: 500px;
  font-weight: 500;
  font-size: 24px;
  color: ${COLOR.kurlyGray800};
  line-height: 34px;
  letter-spacing: -0.5px;
  margin: 0 20px 0 0;
`;

const ShortDescription = styled.h2`
  width: 500px;
  font-size: 14px;
  font-weight: 400;
  color: ${COLOR.kurlyGray400};
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

interface Props {
  deliveryTypeName: string;
  name: string;
  shortDescription: string;
}

export default function Name({ deliveryTypeName, name, shortDescription }: Props) {
  const shouldRenderShortDescription = isNotEmpty(shortDescription);
  return (
    <>
      <DeliveryTypeName>{deliveryTypeName}</DeliveryTypeName>
      <ProductNameWrapper>
        <Title>{name}</Title>
        {shouldRenderShortDescription ? <ShortDescription>{shortDescription}</ShortDescription> : null}
        <ShareButton />
      </ProductNameWrapper>
    </>
  );
}
