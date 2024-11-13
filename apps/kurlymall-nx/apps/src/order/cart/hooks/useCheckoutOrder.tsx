import { useRouter } from 'next/router';

import useProceedToCheckoutMutation from '../queries/useProceedToCheckoutMutation';
import { ORDER_PATH } from '../../../shared/constant';
import { CartItem } from '../interface/CartProduct';
import { getDeliveryNotice } from '../utils/getDeliveryNotice';
import { ignoreError } from '../../../shared/utils/general';
import { logEventSelectOrderCreation } from '../utils/amplitude/SelectOrderCreation';
import { useAppSelector } from '../../../shared/store';
import { totalPriceSelector } from '../store/cart';
import useRecommendProductListQuery from '../queries/useRecommendProductListQuery';
import { DeliveryNotice } from '../interface/DeliveryNotice';
import { logEventPixelCheckout } from '../utils/pixel/logEventPixelCheckout';

interface checkoutOrderProps {
  openDeliveryBottomSheet: ({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) => void;
  openRecommendBottomSheet: () => void;
}
export default function useCheckoutOrder({ openDeliveryBottomSheet, openRecommendBottomSheet }: checkoutOrderProps) {
  const { push } = useRouter();
  const { mutateAsync: proceedToCheckout } = useProceedToCheckoutMutation();
  const { deliveryPrice, paymentPrice } = useAppSelector(totalPriceSelector);
  const { data: recommendProductList } = useRecommendProductListQuery();

  const onProceedToCheckout = async (dealProducts: CartItem[]) => {
    ignoreError(() => logEventSelectOrderCreation(deliveryPrice));

    const proceedToCheckoutResult = await proceedToCheckout(dealProducts);
    const { hasDeliveryMessage, deliveryNotice } = getDeliveryNotice(proceedToCheckoutResult);

    if (hasDeliveryMessage) {
      openDeliveryBottomSheet({ deliveryNotice });
      return;
    }

    if (recommendProductList?.productList) {
      openRecommendBottomSheet();
      return;
    }

    logEventPixelCheckout(paymentPrice, dealProducts);
    await push(ORDER_PATH.order.uri);
  };

  return { onProceedToCheckout };
}
