import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import type { DeliveryInfoName } from '../../../types';

const DeliveryType = styled.span`
  display: block;
  padding-bottom: 2px;
`;

const DeliveryName = styled.span`
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
  line-height: 19px;
  letter-spacing: -0.5px;
  :before {
    content: '/';
    display: inline-block;
    padding: 0 4px;
    vertical-align: top;
  }
  :first-of-type:before {
    display: none;
  }
`;

interface Props {
  deliveryTypeNames: DeliveryInfoName[];
}

export default function ProductCardDeliveryType({ deliveryTypeNames }: Props) {
  return (
    <DeliveryType>
      {deliveryTypeNames.map((it) => (
        <DeliveryName key={it}>{it}</DeliveryName>
      ))}
    </DeliveryType>
  );
}
