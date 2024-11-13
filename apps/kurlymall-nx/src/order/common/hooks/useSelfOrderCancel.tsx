import { useCallback, useState } from 'react';

import { Alert } from '@thefarmersfront/kpds-react';

import { useRouter } from 'next/router';

import { amplitudeService } from '../../../shared/amplitude';
import { SelcetOrderCancelButton } from '../../../shared/amplitude/events/mypage/SelectOrderCancelButton';
import { MYPAGE_PATH } from '../../../shared/constant';
import { getCancelOrderQueryString } from '../utils/getCancelOrderQueryString';
import { ignoreError } from '../../../shared/utils/general';

const CHECK_CANCEL_ORDER_ALERT = {
  contents: '정말 주문을 취소하시겠습니까?\n주문을 취소하시면 상품이 품절되어 다시 구매가 불가능 할 수도 있습니다.',
  showCancelButton: true,
};

interface Props {
  groupOrderNo: number;
  orderNos?: number[];
}

export function useSelfOrderCancel({ groupOrderNo, orderNos }: Props) {
  const { push } = useRouter();
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const goToRequestCancelPage = useCallback(() => {
    setIsCancelLoading(true);

    const queryString = getCancelOrderQueryString({ groupOrderNo, orderNos });
    push(`${MYPAGE_PATH.cancel.uri}${queryString}`);
  }, [groupOrderNo, orderNos, push]);

  const cancelOrderBySelf = useCallback(async () => {
    ignoreError(() => amplitudeService.logEvent(new SelcetOrderCancelButton()));
    const { isConfirmed } = await Alert(CHECK_CANCEL_ORDER_ALERT);

    if (!isConfirmed) {
      return;
    }

    goToRequestCancelPage();
  }, [goToRequestCancelPage]);

  return {
    isCancelLoading,
    cancelOrderBySelf,
  };
}
