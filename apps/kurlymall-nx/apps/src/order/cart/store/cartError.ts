import router from 'next/router';

import { OnlyMembersProductAlert } from '../../../shared/components/Alert/OnlyMembersProductAlert';
import { CART_PATH, MEMBERSHIP_PATH, PRODUCT_PATH, USER_MENU_PATH, getPageUrl } from '../../../shared/constant';
import { OnlyMembersProductsError, ProceedToCheckoutError } from '../../../shared/errors';
import { notify, redirectTo, reload } from '../../../shared/reducers/page';
import { AppThunk } from '../../../shared/store';

const cartPageErrorHandler =
  (err: Error): AppThunk =>
  async (dispatch) => {
    // 멤버십 상품 포함되어 있을 때 컬리멤버십 가입 alert 노출
    if (err instanceof OnlyMembersProductsError) {
      OnlyMembersProductAlert({
        onDismissed: () => router.reload(),
        onConfirm: () => dispatch(redirectTo({ url: getPageUrl(MEMBERSHIP_PATH.membership) })),
      });

      return;
    }

    if (err instanceof ProceedToCheckoutError) {
      dispatch(reload(err.message));

      return;
    }

    dispatch(notify(err.message));
  };

export const cartError =
  (err: Error): AppThunk =>
  async (dispatch, getState) => {
    const {
      productDetail: { no },
    } = getState();

    // 비회원의 바로구매 시도 시 거치는 cart/counter 페이지에서 에러가 났을 떄
    if (router.pathname.includes(CART_PATH.counter.uri)) {
      const productDetailUrl = no === 0 ? getPageUrl(USER_MENU_PATH.home) : `${getPageUrl(PRODUCT_PATH.detail)}/${no}`;
      dispatch(redirectTo({ url: productDetailUrl, replace: true }));

      return;
    }

    dispatch(cartPageErrorHandler(err));
  };
