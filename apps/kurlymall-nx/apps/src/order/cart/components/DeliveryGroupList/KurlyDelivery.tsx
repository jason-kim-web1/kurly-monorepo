import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { KurlyDeliveryListType } from '../../interface/Cart';

import CartItems from '../CartItems/CartItems';
import StorageTitle from '../m/StorageTitle';
import DeliveryGroupTitle from './DeliveryGroupTitle';
import DeliveryGroupWrapper from './DeliveryGroupWrapper';
import { AvailableCartDeliveryGroup, CART_DELIVERY_GROUP } from '../../constants/CartDeliveryGroup';

import DeliveryTitle from '../DeliveryTitle/DeliveryTitle';
import SelectedItemsTotalPrice from '../SelectedItemsTotalPrice/SelectedItemsTotalPrice';
import useCartDetail from '../../hooks/useCartDetail';

const ItemGroupContents = styled.div`
  > div ~ div {
    position: relative;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: -16px;
      right: -16px;
      height: 1px;
      background-color: ${vars.color.background.$background3};
    }
  }
`;

interface Props {
  type: AvailableCartDeliveryGroup;
  kurlyDeliveryList?: KurlyDeliveryListType;
}

export default function KurlyDelivery({ type, kurlyDeliveryList }: Props) {
  const { getAllProducts } = useCartDetail();

  if (!kurlyDeliveryList) {
    return null;
  }

  return (
    <DeliveryGroupWrapper type={type}>
      <DeliveryGroupTitle>
        <DeliveryTitle type={type} />
      </DeliveryGroupTitle>
      <ItemGroupContents>
        {kurlyDeliveryList.storageTypes.map(({ displayName, products, groupType }) => (
          <div key={displayName}>
            <StorageTitle groupType={groupType} displayName={displayName} />
            <CartItems type={type} products={products} />
          </div>
        ))}
      </ItemGroupContents>
      <SelectedItemsTotalPrice
        type={type}
        partnerId={CART_DELIVERY_GROUP.KURLY}
        products={getAllProducts(CART_DELIVERY_GROUP.KURLY)}
        deliveryPricePolicy={kurlyDeliveryList.deliveryPricePolicy}
      />
    </DeliveryGroupWrapper>
  );
}
