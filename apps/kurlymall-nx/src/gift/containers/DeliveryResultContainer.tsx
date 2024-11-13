import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../shared/store';

import { GIFT_DYNAMIC_LINK } from '../../shared/configs/config';

import ButtonGroup from '../../shared/components/Button/ButtonGroup';
import Alert from '../../shared/components/Alert/Alert';
import { redirectTo } from '../../shared/reducers/page';

export default function DeliveryResultContainer() {
  const [isDeliveryCall, setDeliveryCall] = useState(false);
  const {
    receiver: { status },
    invoice,
    deliveryStatus,
  } = useAppSelector(({ gift }) => gift);

  const dispatch = useDispatch();

  const handleDeliveryDetail = () => {
    setDeliveryCall(true);

    if (!invoice || !deliveryStatus) {
      Alert({ text: '상품 준비중입니다. 배송이 시작되면 배송상태를 확인할 수 있습니다.' });
      return;
    }

    setDeliveryCall(false);

    dispatch(
      redirectTo({
        url: invoice.trackingUrl,
        isExternal: true,
      }),
    );
  };

  const handleShopping = () => {
    dispatch(
      redirectTo({
        url: GIFT_DYNAMIC_LINK,
        isExternal: true,
      }),
    );
  };

  if (status === 'ACCEPTED' || status === 'DELIVERED') {
    return (
      <ButtonGroup
        isFixed
        contents={[
          {
            theme: 'tertiary',
            text: '배송조회 하기',
            disabled: isDeliveryCall,
            onClick: handleDeliveryDetail,
          },
          {
            theme: 'primary',
            text: '선물하기',
            disabled: false,
            onClick: handleShopping,
          },
        ]}
      />
    );
  }

  return (
    <ButtonGroup
      isFixed
      contents={[
        {
          theme: 'primary',
          text: '선물하기',
          disabled: false,
          onClick: handleShopping,
        },
      ]}
    />
  );
}
