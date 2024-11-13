import { useCallback } from 'react';
import { eq } from 'lodash';
import { useRouter } from 'next/router';

import { REVIEW_ORDER_TYPE } from '../constants';
import { KURLY_NOW_URL } from '../../../shared/configs/config';

const useReviewProductLink = (orderType: string, contentsProductNo: number) => {
  const { push } = useRouter();
  const isKurlyNowOrder = eq(orderType, REVIEW_ORDER_TYPE.KURLY_NOW);

  const onClickReviewProduct = useCallback(() => {
    if (isKurlyNowOrder) {
      push(KURLY_NOW_URL);
      return;
    }
    push(`/goods/${contentsProductNo}`);
  }, [isKurlyNowOrder, push, contentsProductNo]);

  return {
    onClickReviewProduct,
  };
};

export { useReviewProductLink };
