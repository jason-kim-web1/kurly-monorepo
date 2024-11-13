import KurlyDelivery from './KurlyDelivery';
import PartnerDelivery from './PartnerDelivery';
import UnavailableList from './UnavailableList';
import { CART_DELIVERY_GROUP } from '../../constants/CartDeliveryGroup';
import CartDetailResponse from '../../interface/Cart';

export default function DeliveryGroupContents({ cartDetail }: { cartDetail: CartDetailResponse }) {
  const { kurlyDelivery, partnerDomesticDelivery, partnerInternationalDelivery, unavailableOrders } = cartDetail;

  return (
    <>
      {/*샛별배송*/}
      <KurlyDelivery type={CART_DELIVERY_GROUP.KURLY} kurlyDeliveryList={kurlyDelivery} />
      {/*판매자배송*/}
      <PartnerDelivery type={CART_DELIVERY_GROUP.PARTNER_DOMESTIC} partnerDelivery={partnerDomesticDelivery} />
      {/*해외직배송*/}
      <PartnerDelivery
        type={CART_DELIVERY_GROUP.PARTNER_INTERNATIONAL}
        partnerDelivery={partnerInternationalDelivery}
      />
      {/*품절구매불가*/}
      <UnavailableList type={CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS} unavailableOrders={unavailableOrders} />
    </>
  );
}
