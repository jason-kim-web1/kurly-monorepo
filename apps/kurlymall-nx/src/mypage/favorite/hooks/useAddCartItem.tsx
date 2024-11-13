import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import useCartItems from '../../../shared/components/Cart/hook/useCartItems';

import appService from '../../../shared/services/app.service';
import { notify } from '../../../shared/reducers/page';
import { isPC, isWebview } from '../../../../util/window/getDevice';
import { FavoriteProductExtend } from '../../../shared/interfaces';
import { amplitudeService } from '../../../shared/amplitude';
import { AddToCartProduct, AddToCartSuccess } from '../../../shared/amplitude/events/favorite';
import useCartRefreshQuery from '../../../order/cart/queries/useCartRefreshQuery';
import { CartItem } from '../../../order/cart/interface/CartProduct';
import { ignoreError } from '../../../shared/utils/general';
import { logEventPixelAddToCart } from '../../../order/cart/utils/pixel/logEventPixelAddToCart';

export default function useAddCartItem(productExtend: FavoriteProductExtend) {
  const dispatch = useDispatch();

  const { data: cartItems } = useCartRefreshQuery();
  const { addToBasket } = useCartItems();

  const addCartFavoriteItem = async (selectedProducts: CartItem[], imageUrl: string, name: string) => {
    if (isEmpty(selectedProducts)) {
      return;
    }

    try {
      await addToBasket({
        cartItems: selectedProducts,
        panelOption: {
          representativeItem: {
            imageUrl,
            name,
          },
          isOpenPanel: isPC,
        },
      });

      ignoreError(() => {
        amplitudeService.logEvent(new AddToCartProduct({ productExtend }));
        logEventPixelAddToCart([productExtend]);
      });

      const selectedProductsNo = selectedProducts.map(({ dealProductNo }) => dealProductNo);
      const isAlreadyAdded = cartItems.some(({ dealProductNo }) => selectedProductsNo.includes(dealProductNo));

      const message = isAlreadyAdded
        ? '장바구니에 상품을 담았습니다.\n이미 담은 상품의 수량을 추가했습니다.'
        : '장바구니에 상품을 담았습니다.';

      if (isWebview()) {
        appService.postToast({
          type: 'success',
          title: message,
        });
        appService.postAppMessage({ code: 'WV1001' });
        amplitudeService.logEvent(new AddToCartSuccess({ productExtend }));
        return;
      }

      if (!isPC) {
        dispatch(notify(message));
      }

      amplitudeService.logEvent(new AddToCartSuccess({ productExtend }));
    } catch (e) {
      if (isWebview()) {
        appService.postToast({
          type: 'failure',
          title: (e as Error).message,
        });
        return;
      }
      dispatch(notify((e as Error).message));
    }
  };

  return {
    addCartFavoriteItem,
  };
}
