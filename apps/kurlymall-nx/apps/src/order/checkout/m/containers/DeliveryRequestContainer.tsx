import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import useCheckoutAddress from '../../shared/hooks/useCheckoutAddress';

import { useWebview } from '../../../../shared/hooks';
import appService from '../../../../shared/services/app.service';
import { CHECKOUT_PATH } from '../../../../shared/constant';

import ShippingDetails from '../components/ShippingDetails';
import { Divider } from '../../../../shared/components/Divider/Divider';
import LoadingDeliveryRequest from '../components/Loading/LoadingDeliveryRequest';

const Wrapper = styled.div`
  padding: 20px 20px 0;
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;
export default function DeliveryRequestContainer() {
  const { receiverForm, orderType } = useAppSelector(({ checkout }) => ({
    receiverForm: checkout.receiverForm,
    orderType: checkout.orderType,
  }));
  const webview = useWebview();

  const { openShippingDetailForm } = useCheckoutAddress();

  const handleClick = () => {
    if (webview) {
      appService.openWebview({
        url: `${window.location.origin}${CHECKOUT_PATH.address.uri}?orderType=${orderType}`,
        title: '배송 정보',
        is_modal: true,
      });
      return;
    }

    openShippingDetailForm();
  };

  if (!receiverForm || receiverForm?.addressNo === -1) {
    return (
      <>
        <LoadingDeliveryRequest />
        <Divider />
      </>
    );
  }

  return (
    <>
      <div id="shipping-container">
        <Wrapper>
          <Title>배송 요청사항</Title>
          <ShippingDetails receiverForm={receiverForm} onClick={handleClick} />
        </Wrapper>
      </div>
      <Divider />
    </>
  );
}
