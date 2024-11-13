import { useQuery } from '@tanstack/react-query';

import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../../../shared/store';
import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { getPreviousVendor } from '../../../../shared/shared/services';

export default function usePreviousVendorQuery() {
  const { vendors, hasKurlypayError } = useAppSelector(({ checkoutPayment }) => ({
    vendors: checkoutPayment.vendors,
    hasKurlypayError: checkoutPayment.hasKurlypayError,
  }));
  const { products, isGiftCardOrder } = useAppSelector(({ checkout }) => ({
    products: checkout.products,
    isGiftCardOrder: checkout.isGiftCardOrder,
  }));

  const queryResult = useQuery(orderCheckoutKeys.previousVendor(), getPreviousVendor, {
    cacheTime: 0,
    retry: false,
    enabled: !isUndefined(products) && vendors.length !== 0,
  });

  return { ...queryResult, isLoading: isGiftCardOrder && hasKurlypayError ? false : queryResult.isLoading };
}
