import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import UnavailableItemTitle from './UnavailableItemTitle';
import DeliveryGroupTitle from './DeliveryGroupTitle';
import { UnavailableOrdersType } from '../../interface/Cart';
import DeliveryGroupWrapper from './DeliveryGroupWrapper';
import UnavailableItem from './UnavailableItem';
import useCartItem from '../../hooks/useCartItem';
import { CartDeliveryGroup } from '../../constants/CartDeliveryGroup';

const ItemGroupContents = styled.div`
  margin-top: ${vars.spacing.$16};
`;

interface Props {
  type: CartDeliveryGroup;
  unavailableOrders?: UnavailableOrdersType;
}

export default function UnavailableList({ type, unavailableOrders }: Props) {
  const { onDelete } = useCartItem();

  if (!unavailableOrders) {
    return null;
  }

  return (
    <DeliveryGroupWrapper type={type}>
      <DeliveryGroupTitle>
        <UnavailableItemTitle />
      </DeliveryGroupTitle>
      <ItemGroupContents>
        {unavailableOrders.products.map((product) => (
          <UnavailableItem key={product.dealProductNo} product={product} onDelete={onDelete} />
        ))}
      </ItemGroupContents>
    </DeliveryGroupWrapper>
  );
}
