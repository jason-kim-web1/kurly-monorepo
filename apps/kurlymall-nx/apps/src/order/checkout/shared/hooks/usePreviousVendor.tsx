import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isEmpty, isUndefined } from 'lodash';

import { usePreviousVendorQuery } from './queries';
import { useAppSelector } from '../../../../shared/store';
import { selectPreviousVendor } from '../reducers/checkout-payment.slice';
import { VendorCodes } from '../../../shared/shared/interfaces';

const usePreviousVendor = () => {
  const [queryIsLoading, setQueryIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { disableVendorCodes, hasKurlypayError } = useAppSelector(({ checkoutPayment }) => ({
    disableVendorCodes: checkoutPayment.disableVendorCodes,
    hasKurlypayError: checkoutPayment.hasKurlypayError,
  }));

  const {
    data: previousVendor,
    isError: isErrorPreviousVendor,
    isLoading: isLoadingPreviousVendor,
  } = usePreviousVendorQuery();

  const selectPaymentVendor = useCallback(() => {
    // 이전 결제수단 조회 API 호출 실패 + 컬리페이 장애 : 네이버페이 선택
    if (isErrorPreviousVendor && hasKurlypayError) {
      // TODO 환금성 상품 케이스 추가
      dispatch(selectPreviousVendor({ paymentGatewayId: VendorCodes.NAVER_PAY }));
      return;
    }

    // 이전 결제수단 조회 API 호출 실패 : 컬리페이의 첫번째 결제수단 선택 (컬리페이 장애시, 컬리페이 크레딧 선택)
    if (isErrorPreviousVendor || isUndefined(previousVendor)) {
      dispatch(
        selectPreviousVendor({
          paymentGatewayId: hasKurlypayError ? VendorCodes.KURLYPAY_CREDIT : VendorCodes.KURLYPAY,
        }),
      );
      return;
    }

    // 이전 결제수단이 사용불가 결제수단이거나, 첫 구매 고객 : 컬리페이의 최근 결제수단 선택 (컬리페이 장애시, 컬리페이 크레딧 선택)
    if (disableVendorCodes.includes(previousVendor.paymentGatewayId) || isEmpty(previousVendor.paymentGatewayId)) {
      dispatch(
        selectPreviousVendor({
          paymentGatewayId: hasKurlypayError ? VendorCodes.KURLYPAY_CREDIT : VendorCodes.KURLYPAY,
          companyId: previousVendor.companyId,
        }),
      );
      return;
    }

    // 이전 결제수단 선택
    dispatch(selectPreviousVendor(previousVendor));
  }, [disableVendorCodes, dispatch, hasKurlypayError, isErrorPreviousVendor, previousVendor]);

  useEffect(() => {
    if (isLoadingPreviousVendor) {
      setQueryIsLoading(true);
      return;
    }

    if (!queryIsLoading) {
      return;
    }

    setQueryIsLoading(false);
    selectPaymentVendor();
  }, [isLoadingPreviousVendor, queryIsLoading, selectPaymentVendor]);
};

export default usePreviousVendor;
