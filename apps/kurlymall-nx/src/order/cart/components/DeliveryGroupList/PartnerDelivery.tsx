import { Fragment } from 'react';

import { vars } from '@thefarmersfront/kpds-css';

import DeliveryGroupTitle from './DeliveryGroupTitle';
import PartnerTitle from './PartnerTitle';
import { PartnerDeliveryType } from '../../interface/Cart';
import DeliveryGroupWrapper from './DeliveryGroupWrapper';
import CartItems from '../CartItems/CartItems';
import { AvailableCartDeliveryGroup } from '../../constants/CartDeliveryGroup';
import DeliveryTitle from '../DeliveryTitle/DeliveryTitle';
import SelectedItemsTotalPrice from '../SelectedItemsTotalPrice/SelectedItemsTotalPrice';
import Divider from '../../../common/components/Divider';

interface Props {
  type: AvailableCartDeliveryGroup;
  partnerDelivery?: PartnerDeliveryType;
}

export default function PartnerDelivery({ type, partnerDelivery }: Props) {
  if (!partnerDelivery) {
    return null;
  }

  return (
    <DeliveryGroupWrapper type={type}>
      <DeliveryGroupTitle>
        <DeliveryTitle type={type} />
      </DeliveryGroupTitle>
      {partnerDelivery.partners.map(({ products, partnerId, displayName, deliveryPricePolicy }, index) => (
        <Fragment key={`${displayName}-${partnerId}`}>
          <div>
            <PartnerTitle partnerName={displayName} />
            <CartItems type={type} products={products} />
          </div>
          <SelectedItemsTotalPrice
            type={type}
            partnerId={partnerId}
            products={products}
            deliveryPricePolicy={deliveryPricePolicy}
          />
          {partnerDelivery.partners.length !== index + 1 && (
            <Divider width="100%" height={`${vars.spacing.$1}`} margin={`${vars.spacing.$20} -16px 0`} />
          )}
        </Fragment>
      ))}
    </DeliveryGroupWrapper>
  );
}
