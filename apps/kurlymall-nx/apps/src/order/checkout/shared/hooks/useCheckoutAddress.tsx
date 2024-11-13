import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { useWebview } from '../../../../shared/hooks';
import { useAppSelector } from '../../../../shared/store';

import { submitReceiverForm, setValue } from '../reducers/checkout.slice';

import appService from '../../../../shared/services/app.service';
import { removeHyphen } from '../../../../shared/services';

import { isPC } from '../../../../../util/window/getDevice';
import { getPlaceDetailText, getMethodDetailText } from '../utils';
import { orderCheckoutKeys } from '../../../../mypage/order/shared/util/queryKeys';

import openNewWindow from '../../../../shared/utils/open-new-window';
import { isProduction, KURLY_PRODUCTION_URL_LIST } from '../../../../shared/configs/config';
import { CART_PATH, CHECKOUT_PATH, getPageUrl } from '../../../../shared/constant';

import { ReceiverInfo } from '../interfaces';

import Alert from '../../../../shared/components/Alert/Alert';
import Confirm, { closeConfirm } from '../../../../shared/components/Alert/Confirm';
import { notifyAndFinishRefreshWebview, notifyAndRedirectTo, redirectTo } from '../../../../shared/reducers/page';
import useCheckoutOrderer from './useCheckoutOrderer';
import { isDefaultPhoneNumber } from '../../../../shared/utils';

declare global {
  interface Window {
    updateReceiverAddress?: (error: { type: string; message: string }) => void;
  }
}

export default function useCheckoutAddress() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const webview = useWebview();
  const { data } = useCheckoutOrderer();
  const orderType = useAppSelector(({ checkout }) => checkout.orderType);

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const { receiverForm, changedReceiverForm, changedReceiverFormError } = useAppSelector(({ checkout }) => ({
    receiverForm: checkout.receiverForm,
    changedReceiverForm: checkout.changedReceiverForm,
    changedReceiverFormError: checkout.changedReceiverFormError,
  }));
  const receiverInfo = queryClient.getQueryData<ReceiverInfo>(orderCheckoutKeys.orderer());

  const changeAddressDetail = (params: { name: string; value: string }) => {
    // 출입방법 변경 시 상세 정보 리셋 처리
    const pickupDetail = getPlaceDetailText({
      name: params.name,
      value: params.value,
      pickupDetail: receiverForm.pickupDetail,
    });
    const frontDoorDetail = getMethodDetailText({
      name: params.name,
      value: params.value,
      frontDoorDetail: receiverForm.frontDoorDetail,
    });

    dispatch(
      setValue({
        receiverForm: {
          ...receiverForm,
          [params.name]: params.value,
          pickupDetail,
          frontDoorDetail,
        },
      }),
    );
  };

  const validatePhoneNumber = (phoneNumber?: string) => {
    const removeHyphenPhoneNumber = removeHyphen(phoneNumber ?? '');
    return isDefaultPhoneNumber(removeHyphenPhoneNumber) ? '' : removeHyphenPhoneNumber;
  };

  const setSameWithOrderer = (isSameOrderer: boolean) => {
    dispatch(
      setValue({
        receiverForm: {
          ...receiverForm,
          name: isSameOrderer ? receiverInfo?.name : '',
          phone: isSameOrderer ? validatePhoneNumber(receiverInfo?.phone) : '',
        },
      }),
    );
  };

  const isSameOrderer = data?.name === receiverForm?.name && validatePhoneNumber(data?.phone) === receiverForm?.phone;

  const submitAddress = () => {
    dispatch(submitReceiverForm());
  };

  const openShippingDetailForm = () => {
    if (isPC) {
      openNewWindow({
        url: `${CHECKOUT_PATH.address.uri}?orderType=${orderType}`,
        name: 'kurly-checkout-address',
        option: {
          width: 600,
          height: 700,
        },
      });

      return;
    }

    dispatch(
      redirectTo({
        url: `${CHECKOUT_PATH.address.uri}?orderType=${orderType}`,
      }),
    );
  };

  const redirectToCart = () => {
    if (webview) {
      appService.finishAndRefresh();
      return;
    }

    dispatch(
      redirectTo({
        url: getPageUrl(CART_PATH.cart),
      }),
    );
  };

  const notifyAndRedirectToCart = () => {
    const text = '장바구니로 이동하여\n 다른 배송지로 변경하시겠습니까?';

    if (isPC) {
      Alert({
        text,
        showCancelButton: true,
        showConfirmButton: true,
        handleClickConfirmButton: () => redirectToCart(),
      });
    } else {
      Confirm({
        text,
        leftButtonText: '취소',
        rightButtonText: '확인',
        showRightButton: true,
        onClickLeftButton: () => closeConfirm(),
        onClickRightButton: () => redirectToCart(),
      });
    }
  };

  // 배송 요청 사항 '저장' 버튼 누를 때 처리 (APP, 부모 창)
  const checkUpdateReceiverAddress = useCallback(
    ({ type, message }) => {
      if (type === 'ReturnCartError') {
        dispatch(notifyAndFinishRefreshWebview(message));

        return;
      }

      if (type === 'Error') {
        Alert({ text: message });
      }

      queryClient.invalidateQueries({ queryKey: orderCheckoutKeys.checkoutAddress() });
    },
    [dispatch, queryClient],
  );

  // 배송 요청 사항 '저장' 버튼 누를 때 처리 (PC, 부모 창)
  const handleWindowMessage = useCallback(
    (e: MessageEvent) => {
      if (isProduction() && !KURLY_PRODUCTION_URL_LIST.includes(e.origin)) {
        return;
      }

      if (e.data.source === 'checkoutAddressChanged') {
        const { type, message } = e.data.payload.error;

        if (type === 'ReturnCartError') {
          dispatch(
            notifyAndRedirectTo({
              message: message,
              redirectUrl: getPageUrl(CART_PATH.cart),
            }),
          );

          return;
        }

        if (type === 'Error') {
          Alert({ text: message });
        }

        queryClient.invalidateQueries({ queryKey: orderCheckoutKeys.checkoutAddress() });
      }
    },
    [dispatch, queryClient],
  );

  const getChangedReceiverForm = useCallback(() => {
    if (!changedReceiverForm) {
      return;
    }

    const error = changedReceiverFormError;

    dispatch(
      setValue({
        changedReceiverForm: false,
        changedReceiverFormError: {
          type: '',
          message: '',
        },
      }),
    );

    // 배송 요청 사항 '저장' 버튼 누를 때 처리 (APP, 자식 창)
    if (webview) {
      appService.closeWebview({
        callback_function: `updateReceiverAddress({type:'${error.type}', message:'${error.message}'})`,
      });
      return;
    }

    if (isPC) {
      // 배송 요청 사항 '저장' 버튼 누를 때 처리 (PC, 자식 창)
      window.opener?.postMessage(
        {
          source: 'checkoutAddressChanged',
          payload: {
            error,
          },
        },
        window.location.href,
      );
      window.close();
    } else {
      // 배송 요청 사항 '저장' 버튼 누를 때 처리 (MW)
      if (error.type === 'ReturnCartError') {
        Alert({ text: error.message }).then(() => {
          router.replace(getPageUrl(CART_PATH.cart));
        });

        return;
      }

      if (error.type === 'Error') {
        Alert({ text: error.message }).then(() => {
          router.back();
        });

        return;
      }

      router.back();
    }
  }, [changedReceiverForm, changedReceiverFormError, dispatch, router, webview]);

  useEffect(() => {
    window.updateReceiverAddress = checkUpdateReceiverAddress;
    return () => {
      delete window.updateReceiverAddress;
    };
  }, [checkUpdateReceiverAddress]);

  useEffect(() => {
    if (!hasSession || !router.isReady) {
      return;
    }

    getChangedReceiverForm();

    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [hasSession, router.isReady, dispatch, handleWindowMessage, getChangedReceiverForm]);

  return {
    openShippingDetailForm,
    setSameWithOrderer,
    changeAddressDetail,
    submitAddress,
    notifyAndRedirectToCart,
    isSameOrderer,
  };
}
