import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { Alert } from '@thefarmersfront/kpds-react';

import useProceedToCheckoutMutation from '../queries/useProceedToCheckoutMutation';
import { ORDER_PATH } from '../../../shared/constant';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import DeliveryNoticeContents from '../components/m/DeliveryNoticeContents';
import { BUTTON_TITLE } from '../constants/DeliveryNoticeButton';
import { CartItem } from '../interface/CartProduct';
import { ignoreError } from '../../../shared/utils/general';
import { logEventSelectOrderCreation } from '../utils/amplitude/SelectOrderCreation';
import { useAppSelector } from '../../../shared/store';
import { totalPriceSelector } from '../store/cart';
import { DeliveryNotice } from '../interface/DeliveryNotice';
import { logEventPixelCheckout } from '../utils/pixel/logEventPixelCheckout';

export default function useProceedToCheckout() {
  const router = useRouter();
  const { deliveryPrice, paymentPrice } = useAppSelector(totalPriceSelector);
  const { mutateAsync: proceedToCheckout } = useProceedToCheckoutMutation();

  /**
   * 컨티뉴이티/얼리버드 메세지가 있을 경우 주문서 진입 전 Alert 을 보여주는 함수입니다.
   *
   * @param deliveryNotice
   */
  const showDeliveryMessage = async (deliveryNotice: DeliveryNotice) => {
    if (isNotEmpty(deliveryNotice.text)) {
      const { isDismissed } = await Alert({
        contents: <DeliveryNoticeContents deliveryNotice={deliveryNotice} />,
        confirmButtonTitle: BUTTON_TITLE,
        allowOutsideClick: true,
      });

      return isDismissed;
    }
    return false;
  };

  /**
   * 주문하기 버튼 클릭 시 주문서로 이동하는 함수입니다.
   */
  const onProceedToCheckout = useCallback(
    async (dealProducts: CartItem[]) => {
      ignoreError(() => logEventSelectOrderCreation(deliveryPrice));

      const result = await proceedToCheckout(dealProducts);

      const isDismissed = await showDeliveryMessage(result.displayMessage.deliveryNotice);
      if (isDismissed) return;

      logEventPixelCheckout(paymentPrice, dealProducts);
      await router.push(ORDER_PATH.order.uri);
    },
    [deliveryPrice, paymentPrice, proceedToCheckout, router],
  );

  return {
    onProceedToCheckout,
  };
}
