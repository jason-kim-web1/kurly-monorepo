import { useRouter } from 'next/router';

import useProceedToCheckoutMutation from '../queries/useProceedToCheckoutMutation';
import useDealProducts from './useDealProducts';
import { logEventSelectOrderCreation } from '../utils/amplitude/SelectOrderCreation';
import { useAppSelector } from '../../../shared/store';
import { totalPriceSelector } from '../store/cart';
import { ignoreError } from '../../../shared/utils/general';
import useRecommendProductListQuery from '../queries/useRecommendProductListQuery';
import { ORDER_PATH } from '../../../shared/constant';
import { logEventPixelCheckout } from '../utils/pixel/logEventPixelCheckout';

export default function useBottomSheetCheckoutButton(addedRecommendDealNumberList?: number[]) {
  const { push } = useRouter();
  const { deliveryPrice, paymentPrice } = useAppSelector(totalPriceSelector);
  const { mutateAsync: proceedToCheckout } = useProceedToCheckoutMutation();
  const { dealProducts } = useDealProducts();
  const { data: recommendProductList } = useRecommendProductListQuery();

  const goToCheckoutOrder = async () => {
    ignoreError(() => logEventSelectOrderCreation(deliveryPrice, addedRecommendDealNumberList, recommendProductList));
    logEventPixelCheckout(paymentPrice, dealProducts);

    await proceedToCheckout(dealProducts);
    await push(ORDER_PATH.order.uri);
  };

  return { goToCheckoutOrder };
}
