import router from 'next/router';

import { isWebview } from '../../../../../util/window/getDevice';
import {
  CART_PATH,
  getPageUrl,
  MEMBERSHIP_PATH,
  ORDER_PATH,
  PAYMENT_GIFT_PATH,
  PRODUCT_PATH,
  USER_MENU_PATH,
} from '../../../../shared/constant';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import {
  ReturnCartError,
  JoinOrderError,
  ReturnMainError,
  TAMError,
  UnauthenticatedError,
  OnlyMembersProductsError,
  ReturnCancelError,
} from '../../../../shared/errors';
import {
  notify,
  notifyAndFinishRefreshWebview,
  notifyAndRedirectTo,
  redirectTo,
} from '../../../../shared/reducers/page';
import { AppThunk } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import appService from '../../../../shared/services/app.service';
import { INFORMATION_CODE } from '../../../../shared/services';
import { CALLBACK_FUNCTION_NAMES } from '../../../../shared/constant/callbackFunction';
import { OnlyMembersProductAlert } from '../../../../shared/components/Alert/OnlyMembersProductAlert';

export const checkoutError =
  (err: Error): AppThunk =>
  async (dispatch) => {
    if (err instanceof ReturnMainError) {
      const url = USER_MENU_PATH.home.uri;

      Alert({
        text: (err as Error).message,
        allowOutsideClick: false,
      }).then(() =>
        dispatch(
          redirectTo({
            url,
          }),
        ),
      );

      return;
    }

    if (err instanceof ReturnCartError) {
      if (isWebview()) {
        dispatch(notifyAndFinishRefreshWebview((err as Error).message));
      } else {
        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(CART_PATH.cart),
          }),
        );
      }
    }

    if (isWebview()) {
      dispatch(notifyAndFinishRefreshWebview((err as Error).message));
    } else {
      dispatch(
        notifyAndRedirectTo({
          message: (err as Error).message,
          redirectUrl: getPageUrl(CART_PATH.cart),
        }),
      );
    }
  };

export const handleContinuityError =
  (err: Error): AppThunk =>
  async (dispatch) => {
    if (err instanceof ReturnCartError || err instanceof TAMError) {
      if (isWebview()) {
        dispatch(notifyAndFinishRefreshWebview((err as Error).message));
      } else {
        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: getPageUrl(CART_PATH.cart),
          }),
        );
      }

      return;
    }

    throw err;
  };

export const handlePlaceOrderError =
  ({ err }: { err: Error }): AppThunk =>
  async (dispatch, getState) => {
    const {
      checkout: { products, isGiftOrder, isDirectCheckout },
    } = getState();

    const failPathUrl = getPageUrl(isGiftOrder ? PAYMENT_GIFT_PATH.fail : ORDER_PATH.fail);
    // 바로 구매 또는 선물하기 상품이면 '상품상세'로 가야 하고, 일반 상품이면 '장바구니'로 보낸다.
    const productUrl = products
      ? `${getPageUrl(PRODUCT_PATH.detail)}/${products[0].contentProductNo}`
      : getPageUrl(USER_MENU_PATH.home);
    const redirectUrl = isDirectCheckout || isGiftOrder ? productUrl : getPageUrl(CART_PATH.cart);

    switch (err.constructor) {
      case ReturnCartError:
      case JoinOrderError:
      case TAMError:
      case UnauthenticatedError:
        if (isWebview()) {
          dispatch(notifyAndFinishRefreshWebview((err as Error).message));
          return;
        }

        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl,
            dismissedRedirect: true,
          }),
        );
        return;

      case ReturnMainError:
        if (isWebview()) {
          dispatch(
            notifyAndRedirectTo({
              message: (err as Error).message,
              redirectUrl: deepLinkUrl.HOME,
            }),
          );
          return;
        }

        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: USER_MENU_PATH.home.uri,
            dismissedRedirect: true,
          }),
        );
        return;

      case ReturnCancelError:
        if (isWebview()) {
          dispatch(redirectTo({ url: failPathUrl }));
          return;
        }

        dispatch(
          notifyAndRedirectTo({
            message: (err as Error).message,
            redirectUrl: failPathUrl,
          }),
        );
        return;

      case OnlyMembersProductsError:
        OnlyMembersProductAlert({
          onDismissed: () => {
            if (isWebview()) {
              appService.finishAndRefresh();
              return;
            }

            dispatch(redirectTo({ url: getPageUrl(CART_PATH.cart) }));
            return;
          },
          onConfirm: () => {
            if (isWebview()) {
              appService.postWebViewController({
                code: INFORMATION_CODE.RETURN,
                callback_function: `${CALLBACK_FUNCTION_NAMES.checkoutMembershipRefresh}()`,
              });
              router.push(`kurly://open?url=${window.location.origin}${MEMBERSHIP_PATH.membership.uri}`);
              return;
            }

            dispatch(redirectTo({ url: getPageUrl(MEMBERSHIP_PATH.membership) }));
            return;
          },
        });

        return;

      default:
        dispatch(notify((err as Error).message));
        return;
    }
  };
