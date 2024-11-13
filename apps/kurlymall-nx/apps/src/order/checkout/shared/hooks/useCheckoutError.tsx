import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useAppSelector } from '../../../../shared/store';
import {
  CART_PATH,
  CHECKOUT_PATH,
  getPageUrl,
  ORDER_PATH,
  PAYMENT_GIFT_PATH,
  PRODUCT_PATH,
  USER_MENU_PATH,
} from '../../../../shared/constant';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import {
  ReturnCancelError,
  ReturnCartError,
  ReturnMainError,
  TAMError,
  UnauthenticatedError,
} from '../../../../shared/errors';
import { useWebview } from '../../../../shared/hooks';
import { notify, notifyAndRedirectTo, notifyAndScroll, redirectTo } from '../../../../shared/reducers/page';

import Alert from '../../../../shared/components/Alert/Alert';
import { ValidationError } from '../../../../shared/errors/ValidationError';
import appService from '../../../../shared/services/app.service';

interface Response {
  onError: (error: Error) => void;
}

export default function useCheckoutError(): Response {
  const dispatch = useDispatch();
  const webview = useWebview();
  const { pathname, query } = useRouter();
  const { isGiftOrder, products } = useAppSelector(({ checkout }) => ({
    isGiftOrder: checkout.isGiftOrder,
    products: checkout.products,
  }));

  const getRedirectUrl = () => {
    /**
     * 바로구매 또는 선물하기 상품이면 '상품상세'로, 일반 상품이면 '장바구니'로 이동합니다.
     *
     * 바로구매의 경우 첫 진입 시 API 오류가 발생하면
     * isDirectCheckout 데이터가 없어서 URL로 확인합니다.
     */
    if (!pathname.includes(CHECKOUT_PATH.pickup.uri) && !isGiftOrder) {
      return getPageUrl(CART_PATH.cart);
    }

    if (products) {
      return `${getPageUrl(PRODUCT_PATH.detail)}/${products[0].contentProductNo}`;
    }

    /**
     * 바로구매의 경우 첫 진입 시 API 오류가 발생하면
     * products 데이터가 없어서 query에서 데이터를 가져와 상품상세로 이동합니다.
     */
    if (query.contentProductNo) {
      return `${getPageUrl(PRODUCT_PATH.detail)}/${query.contentProductNo}`;
    }

    return getPageUrl(USER_MENU_PATH.home);
  };

  const handleWebviewError = (err: Error) => {
    if (err instanceof ReturnCartError || err instanceof TAMError || err instanceof UnauthenticatedError) {
      if (pathname.includes(CHECKOUT_PATH.pickup.uri)) {
        /**
         * 픽업매장선택 페이지는 별도의 웹뷰로 되어있어 처리방법이 다릅니다.
         * finishAndRefreshFromPickup은 픽업매장선택 웹뷰와 주문서 웹뷰를 닫습니다.
         */
        appService.closeWebview({
          callback_function: `finishAndRefreshFromPickup()`,
        });
      } else {
        appService.finishAndRefresh();
      }
    } else if (err instanceof ReturnMainError) {
      dispatch(
        redirectTo({
          url: deepLinkUrl.HOME,
        }),
      );
    } else if (err instanceof ReturnCancelError) {
      const url = getPageUrl(isGiftOrder ? PAYMENT_GIFT_PATH.fail : ORDER_PATH.fail);

      dispatch(
        redirectTo({
          url,
        }),
      );
    }
  };

  const handleWebError = (err: Error) => {
    if (err instanceof ReturnCartError || err instanceof TAMError || err instanceof UnauthenticatedError) {
      dispatch(
        notifyAndRedirectTo({
          message: (err as Error).message,
          redirectUrl: getRedirectUrl(),
        }),
      );
    } else if (err instanceof ReturnMainError) {
      dispatch(
        redirectTo({
          url: getPageUrl(USER_MENU_PATH.home),
        }),
      );
    } else if (err instanceof ReturnCancelError) {
      const url = getPageUrl(isGiftOrder ? PAYMENT_GIFT_PATH.fail : ORDER_PATH.fail);

      dispatch(
        redirectTo({
          url,
        }),
      );
    } else if (err instanceof ValidationError) {
      dispatch(
        notifyAndScroll({
          message: err.message,
          scrollId: err.name,
        }),
      );
    } else {
      dispatch(notify(err.message));
    }
  };

  const onError = (err: Error) => {
    if (webview) {
      Alert({
        text: err.message,
        handleClickConfirmButton: () => handleWebviewError(err),
      });
      return;
    }

    handleWebError(err);
  };

  return {
    onError,
  };
}
