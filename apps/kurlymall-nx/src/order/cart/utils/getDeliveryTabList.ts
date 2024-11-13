import { compact } from 'lodash';

import CartDetailResponse from '../interface/Cart';
import { TabList } from '../../../shared/components/KPDS/Tab';
import { CART_DELIVERY_GROUP } from '../constants/CartDeliveryGroup';

export const getDeliveryTypeTabList = ({
  cartDetail,
  activeTab,
}: {
  cartDetail: CartDetailResponse;
  activeTab: number | null;
}): TabList[] => {
  const { kurlyDelivery, partnerDomesticDelivery, partnerInternationalDelivery, unavailableOrders } = cartDetail;

  return compact([
    kurlyDelivery && { type: CART_DELIVERY_GROUP.KURLY, ...kurlyDelivery },
    partnerDomesticDelivery && { type: CART_DELIVERY_GROUP.PARTNER_DOMESTIC, ...partnerDomesticDelivery },
    partnerInternationalDelivery && {
      type: CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL,
      ...partnerInternationalDelivery,
    },
    unavailableOrders && { type: CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS, ...unavailableOrders },
  ]).map((delivery, index) => ({
    value: delivery.type,
    tabName: `${delivery.displayName} ${delivery.productCount}`,
    isActive: activeTab === index,
  }));
};
