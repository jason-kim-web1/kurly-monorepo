import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { head } from 'lodash';

import { useAppSelector } from '../../../shared/store';
import { loadCartCounter, removeCartCounter } from '../../../cart/shared/services/cart-counter.storage.service';
import { ORDER_PATH, PRODUCT_PATH, USER_MENU_PATH } from '../../../shared/constant';
import useProceedToCheckoutMutation from '../queries/useProceedToCheckoutMutation';
import useCheckAddressQuery from '../queries/useCheckAddressQuery';
import { getDeliveryNotice } from '../utils/getDeliveryNotice';
import useRedirectToLogin from '../../common/hooks/useRedirectToLogin';
import { DeliveryNotice } from '../interface/DeliveryNotice';

const isDirectCheckout = true;

export function useCounter(
  handleDeliveryNotice: ({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) => Promise<void> | void,
) {
  const { replace } = useRouter();
  const { showAlertAndRedirectLogin } = useRedirectToLogin();

  const { hasSession, isGuest } = useAppSelector(({ auth }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
  }));
  const { isLoading: isLoadingCheckAddress } = useCheckAddressQuery();
  const { mutateAsync: proceedToCheckout } = useProceedToCheckoutMutation(isDirectCheckout);

  const handleCheckoutOrder = useCallback(async () => {
    const { dealProducts } = loadCartCounter();

    try {
      const proceedToCheckoutResult = await proceedToCheckout(dealProducts);
      const { hasDeliveryMessage, deliveryNotice } = getDeliveryNotice(proceedToCheckoutResult);

      if (hasDeliveryMessage) {
        await handleDeliveryNotice({ deliveryNotice });
        return;
      }

      await replace(ORDER_PATH.order.uri);
    } catch (err) {
      const dealProductNo = head(dealProducts)?.dealProductNo;
      const targetUrl = dealProductNo ? `${PRODUCT_PATH.detail.uri}/${dealProductNo}` : USER_MENU_PATH.home.uri;

      await replace(targetUrl);
    } finally {
      removeCartCounter();
    }
  }, [handleDeliveryNotice, proceedToCheckout, replace]);

  useEffect(() => {
    if (!hasSession) {
      return;
    }

    (async () => {
      if (isGuest) {
        await showAlertAndRedirectLogin();
        return;
      }

      if (isLoadingCheckAddress) {
        return;
      }

      await handleCheckoutOrder();
    })();
  }, [hasSession, isGuest, isLoadingCheckAddress, handleCheckoutOrder]);
}
