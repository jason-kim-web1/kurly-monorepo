import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import useSelectedItemsTotalPrice from '../../hooks/useSelectedItemsTotalPrice';
import { addComma } from '../../../../shared/services';
import { AvailableCartDeliveryGroup } from '../../constants/CartDeliveryGroup';
import { CartProduct } from '../../interface/CartProduct';
import { DeliveryPricePolicyType } from '../../interface/Cart';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${vars.spacing.$8};
  padding: ${vars.spacing.$12};
  border-radius: ${vars.radius.$10};
  background-color: ${vars.color.background.$background2};
  color: ${vars.color.main.$secondary};
`;

const TotalPriceAndDeliveryFee = styled(Typography)`
  color: ${vars.color.text.$tertiary};
`;

interface Props {
  type: AvailableCartDeliveryGroup;
  partnerId: string;
  products: CartProduct[];
  deliveryPricePolicy: DeliveryPricePolicyType;
}

export default function SelectedItemsTotalPrice(props: Props) {
  const { price, deliveryFee } = useSelectedItemsTotalPrice(props);

  return (
    <Wrapper>
      <TotalPriceAndDeliveryFee variant="$largeSemibold">
        {`상품 ${addComma(price)}원 + 배송비 ${deliveryFee === 0 ? '무료' : `${addComma(deliveryFee)}원`}`}
      </TotalPriceAndDeliveryFee>
      <Typography variant="$xxlargeBold">{`${addComma(price + deliveryFee)}원`}</Typography>
    </Wrapper>
  );
}
