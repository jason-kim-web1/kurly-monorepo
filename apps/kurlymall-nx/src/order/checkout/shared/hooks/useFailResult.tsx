import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { head } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

import { ignoreError } from '../../../../shared/utils/general';
import useCheckoutResult from '../../../shared/shared/hooks/useCheckoutResult';
import { getFailedOrder } from '../../../../shared/api/checkout/payments';
import { FailedOrderResponse } from '../../../../shared/interfaces';

interface FailButtonStateProps {
  text: string;
  handler: () => void;
}

export default function useFailResult() {
  const { query } = useRouter();
  const { moveCartPage, moveDetailPage, moveGiftProductPage } = useCheckoutResult();

  const [isButtonLoading, setIsButtonLoading] = useState(true);
  const [failButtonState, setFailButtonState] = useState<FailButtonStateProps>({
    text: '장바구니로 이동',
    handler: moveCartPage,
  });

  const { orderNo, gift } = query as ParsedUrlQuery & {
    orderNo: string;
    gift?: boolean;
  };

  const getFailButtonState = ({ isDirectOrder, dealProducts }: FailedOrderResponse) => {
    if (gift) {
      setFailButtonState({
        text: '선물하기로 이동',
        handler: moveGiftProductPage,
      });
      return;
    }

    if (isDirectOrder) {
      const productNo = head(dealProducts)?.contentsProductNo;

      setFailButtonState({
        text: '상품상세로 이동',
        handler: () => moveDetailPage(productNo),
      });
    }
  };

  useEffect(() => {
    if (!orderNo) {
      setIsButtonLoading(false);
      return;
    }

    ignoreError(async () => {
      const failOrderResult = await getFailedOrder(orderNo);
      getFailButtonState(failOrderResult);
    });

    setIsButtonLoading(false);
  }, [orderNo]);

  return {
    failButtonState,
    isButtonLoading,
  };
}
