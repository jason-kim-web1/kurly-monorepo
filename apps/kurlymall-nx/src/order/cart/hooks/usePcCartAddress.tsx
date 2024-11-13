import { useCallback, useEffect } from 'react';

import { Alert } from '@thefarmersfront/kpds-react';

import { ADDRESS_PATH, CHANGE_ADDRESS_TEXT } from '../../../shared/constant';
import useCartDetail from './useCartDetail';
import openNewWindow from '../../../shared/utils/open-new-window';
import useCurrentAddress from '../../common/hooks/useCurrentAddress';

import { isProduction, KURLY_PRODUCTION_URL_LIST } from '../../../shared/configs/config';

const NEW_WINDOW_ADDRESS_LIST = {
  url: ADDRESS_PATH.list.uri,
  name: 'kurly-shipping-address',
  option: {
    width: 530,
    height: 570,
  },
};

export default function usePcCartAddress() {
  const { isCartEmpty, deliveryNoticeText } = useCartDetail();
  const { refetch: refetchCurrentAddress } = useCurrentAddress();

  /**
   * 장바구니 주소 클릭 핸들러
   * - 주소 목록을 새 창으로 엽니다.
   */
  const handleClickCartAddress = useCallback(() => {
    openNewWindow(NEW_WINDOW_ADDRESS_LIST);
  }, []);

  const isInvalidOrigin = useCallback((origin: string) => {
    return isProduction() && !KURLY_PRODUCTION_URL_LIST.includes(origin);
  }, []);

  /**
   * 새 창 주소 변경 이벤트 핸들러
   * - 현 주소 조회 API를 refetch 합니다.
   * - 장바구니에 상품이 있으면 CHANGE_ADDRESS_TEXT 메세지를 띄웁니다
   */
  const handleChangeAddress = useCallback(
    async ({ data, origin }: MessageEvent) => {
      if (data.source !== 'addressChanged' || isInvalidOrigin(origin)) {
        return;
      }

      await refetchCurrentAddress();

      if (!isCartEmpty) {
        await Alert({ contents: CHANGE_ADDRESS_TEXT });
      }
    },
    [isCartEmpty, isInvalidOrigin, refetchCurrentAddress],
  );

  useEffect(() => {
    window.addEventListener('message', handleChangeAddress);

    return () => {
      window.removeEventListener('message', handleChangeAddress);
    };
  }, [handleChangeAddress]);

  return {
    deliveryNoticeText,
    handleClickCartAddress,
  };
}
