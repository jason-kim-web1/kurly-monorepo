import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { Alert } from '@thefarmersfront/kpds-react';

import { ORDER_PATH } from '../../../shared/constant';
import { BUTTON_TITLE } from '../constants/DeliveryNoticeButton';
import DeliveryNoticeContents from '../components/m/DeliveryNoticeContents';
import { DeliveryNotice } from '../interface/DeliveryNotice';

export function useCounterDeliveryNotice() {
  const { replace } = useRouter();

  const handleDeliveryNotice = useCallback(
    async ({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) => {
      await Alert({
        contents: <DeliveryNoticeContents deliveryNotice={deliveryNotice} />,
        confirmButtonTitle: BUTTON_TITLE,
        allowOutsideClick: false,
      });

      await replace(ORDER_PATH.order.uri);
    },
    [replace],
  );

  return { handleDeliveryNotice };
}
