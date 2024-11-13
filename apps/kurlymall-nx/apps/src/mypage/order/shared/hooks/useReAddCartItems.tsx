import { isEmpty } from 'lodash';

import { useState } from 'react';

import { useAppSelector } from '../../../../shared/store';
import useCartItems from '../../../../shared/components/Cart/hook/useCartItems';

import appService from '../../../../shared/services/app.service';
import { isWebview } from '../../../../../util/window/getDevice';
import { logEventAddToCartSuccess } from '../../../../shared/amplitude/events/mypage/AddToCartSuccess';
import Alert from '../../../../shared/components/Alert/Alert';
import { ADD_CART_ERROR_MESSAGE, AVAILABLE_ITEMS_ERROR_MESSAGE, makeSuccessMessage } from '../util/reAddItemsText';
import { AvailableProduct } from '../../../../shared/interfaces';
import { CartItem } from '../../../../order/cart/interface/CartProduct';
import { postCheckReAddAvailable } from '../../../../order/cart/api/postCheckReAddAvailable';

export default function useReAddCartItems() {
  const [isLoading, setIsLoading] = useState(false);
  const currentAddress = useAppSelector(({ shippingAddress }) => shippingAddress.currentAddress);

  const { addToBasket } = useCartItems();

  const reAddItemsAlert = async ({ message, isSuccess = false }: { message: string; isSuccess?: boolean }) => {
    if (isWebview()) {
      appService.postToast({
        type: isSuccess ? 'success' : 'failure',
        title: message,
      });
      if (isSuccess) {
        appService.postAppMessage({ code: 'WV1001' });
      }
    } else {
      await Alert({
        text: message,
      });
    }
    setIsLoading(false);
  };

  const getAvailableItems = (availableProducts: AvailableProduct[]) => {
    return availableProducts.map(({ dealProductNo, quantity }) => ({
      dealProductNo,
      quantity,
    }));
  };

  const addCart = async (cartItems: CartItem[]) => {
    setIsLoading(true);

    if (isEmpty(cartItems)) {
      reAddItemsAlert({ message: ADD_CART_ERROR_MESSAGE });
      return;
    }

    try {
      const { checkoutType, availableProducts, unavailableProducts } = await postCheckReAddAvailable({
        address: currentAddress?.roadAddress ?? '',
        addressDetail: currentAddress?.addressDetail ?? '',
        dealProducts: cartItems,
      });

      const availableLength = availableProducts.length;
      if (!checkoutType || availableLength === 0) {
        throw Error(AVAILABLE_ITEMS_ERROR_MESSAGE);
      }

      await addToBasket({
        cartItems: getAvailableItems(availableProducts),
      });

      const message = makeSuccessMessage({ unavailableProducts, availableLength });
      reAddItemsAlert({ message, isSuccess: true });

      logEventAddToCartSuccess(availableLength);
    } catch (e) {
      reAddItemsAlert({ message: (e as Error).message });
    }
  };

  return {
    addCart,
    isLoading,
  };
}
