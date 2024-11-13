import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useToggle from '../../checkout/shared/hooks/useToggle';
import { DEFAULT_DELIVERY_NOTICE } from '../constants/DeliveryNoticeButton';
import { ORDER_PATH } from '../../../shared/constant';
import { DeliveryNotice } from '../interface/DeliveryNotice';

export default function useDeliveryNotice() {
  const { replace } = useRouter();
  const { isOpen, close, open } = useToggle();
  const [noticeContents, setNoticeContents] = useState<DeliveryNotice>(DEFAULT_DELIVERY_NOTICE);

  const openDeliveryBottomSheet = useCallback(
    ({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) => {
      setNoticeContents(deliveryNotice);
      open();
    },
    [open],
  );

  const closeCounterDeliveryNotice = async () => {
    close();
    await replace(ORDER_PATH.order.uri);
  };

  return {
    isDeliveryNoticeOpen: isOpen,
    closeDeliveryBottomSheet: close,
    openDeliveryBottomSheet,
    noticeContents,
    closeCounterDeliveryNotice,
  };
}
