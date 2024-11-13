import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { CART_PATH, MYPAGE_PATH, PRODUCT_PATH, USER_MENU_PATH } from '../../../../shared/constant';

import { ParsedUrlQuery } from 'querystring';
import appService from '../../../../shared/services/app.service';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { redirectTo } from '../../../../shared/reducers/page';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCart } from '../../../../shared/amplitude/events';
import { isWebview } from '../../../../../util/window/getDevice';

export default function useCheckoutResult() {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const { orderNo } = query as ParsedUrlQuery & {
    orderNo: string;
  };

  const moveOrderListPage = () => {
    const url = `${MYPAGE_PATH.orderList.uri}/${orderNo}`;

    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${url}`,
        title: '주문내역상세',
        is_modal: true,
      });
      return;
    }

    dispatch(
      redirectTo({
        url,
      }),
    );
  };

  const moveCartPage = () => {
    amplitudeService.logEvent(new SelectCart());

    if (isWebview()) {
      appService.finishAndRefresh();
      return;
    }

    dispatch(
      redirectTo({
        url: CART_PATH.cart.uri,
      }),
    );
  };

  const moveHomePage = () => {
    dispatch(
      redirectTo({
        url: USER_MENU_PATH.home.uri,
      }),
    );
  };

  const moveGiftListPage = () => {
    dispatch(
      redirectTo({
        url: `${deepLinkUrl.GIFT_DETAIL}${orderNo}`,
      }),
    );
  };

  const moveGiftProductPage = () => {
    dispatch(
      redirectTo({
        url: `${deepLinkUrl.GIFT_CATEGORY}`,
      }),
    );
  };

  const moveDetailPage = (productNo?: number) => {
    const targetUrl = isWebview() ? `${deepLinkUrl.PRODUCT}` : `${PRODUCT_PATH.detail.uri}/`;

    dispatch(
      redirectTo({
        url: `${targetUrl}${productNo}`,
      }),
    );
  };

  return {
    moveHomePage,
    moveCartPage,
    moveOrderListPage,
    moveGiftListPage,
    moveGiftProductPage,
    moveDetailPage,
    orderNo,
  };
}
