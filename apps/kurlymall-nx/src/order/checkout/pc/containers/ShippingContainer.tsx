import { useAppSelector } from '../../../../shared/store';
import useCheckoutAddress from '../../shared/hooks/useCheckoutAddress';

import { Title } from '../components/Title';
import Address from '../components/Address';
import ShippingDetails from '../components/ShippingDetails';
import LoadingAddress from '../components/Loading/LoadingAddress';
import { useCheckoutAddressQuery } from '../../shared/hooks/queries';
import GuideTooltip from '../../shared/components/GuideTooltip';

export default function ShippingContainer() {
  const receiverForm = useAppSelector(({ checkout }) => checkout.receiverForm);

  useCheckoutAddressQuery();
  const { openShippingDetailForm, notifyAndRedirectToCart } = useCheckoutAddress();

  if (!receiverForm || receiverForm?.addressNo === -1) {
    return (
      <>
        <Title title="배송 정보" />
        <LoadingAddress />
      </>
    );
  }

  return (
    <div id="shipping-container">
      <Title title="배송 정보">
        <GuideTooltip title="배송지 변경 안내" content="장바구니, 마이컬리에서 배송지를 변경할 수 있어요." />
      </Title>
      <Address receiverForm={receiverForm} onClick={notifyAndRedirectToCart} />
      <ShippingDetails receiverForm={receiverForm} onClick={openShippingDetailForm} />
    </div>
  );
}
